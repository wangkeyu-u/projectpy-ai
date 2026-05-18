from __future__ import annotations

import contextlib
import io
import json
import os
import subprocess
import sys
import tempfile
import textwrap
import time
import traceback
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "8000"))
RUN_TIMEOUT_SECONDS = 4


SAFE_RUNNER = r"""
import contextlib
import importlib
import io
import json
import math
import random
import sys
import traceback

payload = json.loads(sys.stdin.read() or "{}")
code = payload.get("code", "")

ALLOWED_MODULES = {
    "json": json,
    "math": math,
    "random": random,
}


def safe_import(name, globals=None, locals=None, fromlist=(), level=0):
    root_name = name.split(".")[0]
    if root_name in ALLOWED_MODULES:
        return ALLOWED_MODULES[root_name]
    raise ImportError(f"这个练习环境暂时不允许导入模块: {name}")


safe_builtins = {
    "__import__": safe_import,
    "abs": abs,
    "all": all,
    "any": any,
    "bool": bool,
    "dict": dict,
    "enumerate": enumerate,
    "filter": filter,
    "float": float,
    "int": int,
    "isinstance": isinstance,
    "len": len,
    "list": list,
    "map": map,
    "max": max,
    "min": min,
    "print": print,
    "range": range,
    "round": round,
    "set": set,
    "sorted": sorted,
    "str": str,
    "sum": sum,
    "tuple": tuple,
    "zip": zip,
}

buffer = io.StringIO()
result = {"ok": True, "output": "", "error": ""}

try:
    compiled = compile(code, "student_code.py", "exec")
    with contextlib.redirect_stdout(buffer):
        exec(compiled, {"__builtins__": safe_builtins}, {})
    result["output"] = buffer.getvalue()
except Exception:
    result["ok"] = False
    result["output"] = buffer.getvalue()
    result["error"] = traceback.format_exc(limit=4)

print(json.dumps(result, ensure_ascii=False))
"""


SYSTEM_PROMPT = """
你是一个项目式 Python 学习导师。
目标是帮助用户通过完成真实项目学习 Python，而不是先背语法。
根据当前项目、当前任务、用户代码、运行输出和错误信息给出反馈。
默认不要直接给完整答案，优先给思路、定位、下一步小提示。
如果用户明确要求完整答案，可以给出短代码片段，并解释关键行。
回答要简洁、鼓励、具体，使用中文。
""".strip()


def send_json(handler: SimpleHTTPRequestHandler, data: dict, status: int = 200) -> None:
    body = json.dumps(data, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def read_json(handler: SimpleHTTPRequestHandler) -> dict:
    length = int(handler.headers.get("Content-Length", "0"))
    raw = handler.rfile.read(length).decode("utf-8")
    if not raw:
        return {}
    return json.loads(raw)


def run_student_code(code: str) -> dict:
    start = time.perf_counter()
    try:
        completed = subprocess.run(
            [sys.executable, "-I", "-c", SAFE_RUNNER],
            input=json.dumps({"code": code}, ensure_ascii=False),
            text=True,
            capture_output=True,
            timeout=RUN_TIMEOUT_SECONDS,
            cwd=tempfile.gettempdir(),
            env={"PYTHONIOENCODING": "utf-8"},
        )
    except subprocess.TimeoutExpired:
        return {
            "ok": False,
            "output": "",
            "error": f"代码运行超过 {RUN_TIMEOUT_SECONDS} 秒，可能出现了无限循环。",
            "duration_ms": int((time.perf_counter() - start) * 1000),
        }

    duration_ms = int((time.perf_counter() - start) * 1000)
    if completed.returncode != 0 and completed.stderr:
        return {
            "ok": False,
            "output": completed.stdout,
            "error": completed.stderr,
            "duration_ms": duration_ms,
        }

    try:
        data = json.loads(completed.stdout.strip() or "{}")
    except json.JSONDecodeError:
        data = {
            "ok": False,
            "output": completed.stdout,
            "error": "运行器返回了无法解析的结果。",
        }
    data["duration_ms"] = duration_ms
    return data


def call_openai_mentor(payload: dict) -> tuple[str | None, str | None]:
    api_key = (payload.get("apiKey") or "").strip()
    if not api_key:
        return None, None

    model = (payload.get("model") or "gpt-5.4-mini").strip()
    user_context = textwrap.dedent(
        f"""
        当前项目：{payload.get("projectTitle", "")}
        当前任务：{payload.get("taskTitle", "")}
        任务目标：{payload.get("taskGoal", "")}
        用户问题：{payload.get("message", "")}
        运行输出：{payload.get("output", "")}
        错误信息：{payload.get("error", "")}
        用户代码：
        ```python
        {payload.get("code", "")}
        ```
        """
    ).strip()

    request_body = {
        "model": model,
        "input": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_context},
        ],
        "max_output_tokens": 500,
    }

    request = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(request_body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="ignore")
        if error.code == 401:
            return None, "你的 API Key 没有通过验证。请检查 Key 是否完整，或者在 AI 设置里清除后重新填写。"
        if error.code == 429:
            return None, "你的 API 请求被限流或额度不足。可以稍后再试，或检查 OpenAI 账户额度。"
        return None, f"OpenAI 请求失败：HTTP {error.code}。{detail[:180]}"
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
        return None, "暂时无法连接 OpenAI。请检查网络、API Key 和模型名称。"

    if data.get("output_text"):
        return data["output_text"].strip(), None

    chunks: list[str] = []
    for item in data.get("output", []):
        for content in item.get("content", []):
            text = content.get("text")
            if text:
                chunks.append(text)
    return ("\n".join(chunks).strip() or None), None


def local_mentor_reply(payload: dict) -> str:
    message = (payload.get("message") or "").lower()
    code = payload.get("code") or ""
    error = payload.get("error") or ""
    task_title = payload.get("taskTitle") or "当前任务"
    task_goal = payload.get("taskGoal") or ""
    concepts = payload.get("concepts") or []
    concept_text = "、".join(concepts[:4]) if concepts else "当前知识点"

    if error:
        if "SyntaxError" in error:
            return (
                f"先看 {task_title} 的语法结构。这个报错通常说明括号、引号、冒号或缩进附近有问题。"
                "建议从报错行往上一行检查：列表是不是用方括号包住，if/for/def 后面有没有冒号。"
            )
        if "NameError" in error:
            return (
                "这是变量名相关的错误：Python 找不到你正在使用的名字。"
                "检查一下变量是否已经创建，以及前后拼写是否完全一致。"
            )
        if "IndentationError" in error:
            return (
                "这是缩进错误。Python 用缩进表示代码块，for、if、def 下面的代码需要统一往右缩进。"
                "先把同一层级的代码对齐，再运行一次。"
            )
        if "TypeError" in error:
            return (
                "这是类型不匹配。可以先用 print(type(...)) 看看变量实际是什么类型，"
                "再决定要不要转成字符串、数字、列表或字典。"
            )
        return (
            "我看到代码运行失败了。先不要急着重写，优先定位第一条报错："
            "它通常已经告诉你错误类型和行号。把那一行和上一行一起检查，修复后再运行。"
        )

    if "答案" in message or "完整" in message or "solution" in message:
        return (
            "可以给完整答案，但建议你先只抄结构，不要机械复制。"
            f"这个任务的目标是：{task_goal}。先保证变量命名清楚，再用 print 输出你想验证的结果。"
        )

    if "为什么" in message or "解释" in message:
        return (
            f"这个任务不是为了单独学语法，而是为了完成“{task_goal}”。"
            f"这里用到的 {concept_text} 都是在服务项目结果：让数据能被保存、遍历、整理或展示。"
        )

    if "下一步" in message or "next" in message:
        return (
            "下一步先让代码输出一个你能肉眼确认的结果。"
            "如果输出正确，再把重复逻辑抽成变量或函数。项目式学习里，先跑通，再变漂亮。"
        )

    if "总结" in message:
        return (
            f"这一小步你练到的是 {concept_text}。重点不是记住定义，"
            "而是知道什么时候用它解决问题：有一组数据就想到列表，有键值关系就想到字典，有重复动作就想到循环或函数。"
        )

    if ".append" not in code and "列表" in concepts:
        return (
            "一个小提示：如果你要往列表里新增内容，可以试试 `列表名.append(新内容)`。"
            "先添加一条固定数据，再考虑让用户输入。"
        )

    return (
        f"你现在在做“{task_title}”。先围绕任务目标写最小可运行代码：{task_goal}。"
        "每写两三行就运行一次，看输出是不是接近预期。"
    )


class ProjectPyHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self) -> None:
        try:
            payload = read_json(self)
        except json.JSONDecodeError:
            send_json(self, {"ok": False, "error": "请求不是有效 JSON。"}, status=400)
            return

        if self.path == "/api/run":
            result = run_student_code(payload.get("code", ""))
            send_json(self, result)
            return

        if self.path == "/api/mentor":
            ai_reply, ai_error = call_openai_mentor(payload)
            if ai_error:
                fallback = local_mentor_reply(payload)
                send_json(
                    self,
                    {
                        "ok": False,
                        "reply": f"{ai_error}\n\n先用本地导师给你一个可继续推进的提示：{fallback}",
                        "source": "local",
                    },
                )
                return
            reply = ai_reply or local_mentor_reply(payload)
            send_json(self, {"ok": True, "reply": reply, "source": "openai" if ai_reply else "local"})
            return

        send_json(self, {"ok": False, "error": "未知接口。"}, status=404)


def main() -> None:
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), ProjectPyHandler)
    print(f"ProjectPy AI is running at http://127.0.0.1:{PORT}")
    with contextlib.suppress(KeyboardInterrupt):
        server.serve_forever()


if __name__ == "__main__":
    main()
