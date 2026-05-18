const projects = [
  {
    id: "todo-cli",
    title: "命令行待办事项工具",
    category: "自动化",
    difficulty: "入门",
    minutes: 45,
    outcome: "一个能添加、展示和整理任务的 Python 小工具",
    summary: "从任务清单开始理解列表、循环、函数和格式化输出。",
    accent: "#14746f",
    concepts: ["列表", "循环", "函数", "字符串格式化"],
    tasks: [
      {
        id: "todo-list",
        title: "创建任务列表",
        goal: "用列表保存多条待办事项，并打印出来。",
        concepts: ["列表", "print"],
        checks: ["tasks", "[", "]", "print"],
        outputIncludes: ["买牛奶", "写 Python"],
        starter: `tasks = ["买牛奶", "写 Python", "整理桌面"]\n\nprint("今天的任务：")\nprint(tasks)`,
      },
      {
        id: "todo-append",
        title: "添加新任务",
        goal: "用 append 把一条新任务加入列表。",
        concepts: ["列表", "append"],
        checks: [".append", "tasks"],
        outputIncludes: ["复习函数"],
        starter: `tasks = ["买牛奶", "写 Python"]\n\n# 在下一行添加一条新任务\n\nprint(tasks)`,
      },
      {
        id: "todo-loop",
        title: "逐条展示任务",
        goal: "用 for 循环把任务清单变成更容易阅读的列表。",
        concepts: ["for 循环", "enumerate"],
        checks: ["for", "enumerate", "print"],
        outputIncludes: ["1.", "2."],
        starter: `tasks = ["买牛奶", "写 Python", "整理桌面"]\n\nfor index, task in enumerate(tasks, start=1):\n    print(f"{index}. {task}")`,
      },
      {
        id: "todo-dict",
        title: "记录任务状态",
        goal: "用字典保存任务名称和完成状态。",
        concepts: ["字典", "布尔值", "条件判断"],
        checks: ["{", "}", "done", "if"],
        outputIncludes: ["未完成"],
        starter: `tasks = [\n    {"name": "买牛奶", "done": True},\n    {"name": "写 Python", "done": False},\n]\n\nfor task in tasks:\n    status = "已完成" if task["done"] else "未完成"\n    print(f"{task['name']} - {status}")`,
      },
      {
        id: "todo-function",
        title: "封装添加函数",
        goal: "把添加任务的逻辑封装成函数，让代码可以复用。",
        concepts: ["函数", "参数", "返回值"],
        checks: ["def", "return", ".append"],
        outputIncludes: ["复习列表"],
        starter: `def add_task(tasks, name):\n    tasks.append({"name": name, "done": False})\n    return tasks\n\nmy_tasks = []\nadd_task(my_tasks, "复习列表")\nadd_task(my_tasks, "练习函数")\n\nprint(my_tasks)`,
      },
    ],
  },
  {
    id: "folder-sorter",
    title: "下载文件夹整理器",
    category: "自动化",
    difficulty: "入门",
    minutes: 50,
    outcome: "根据文件后缀自动分类的整理逻辑",
    summary: "用真实文件名模拟 os 自动化前的核心判断。",
    accent: "#b45309",
    concepts: ["字符串", "条件判断", "字典"],
    tasks: [
      {
        id: "extensions",
        title: "识别文件类型",
        goal: "从文件名中取出后缀，并按类型分类。",
        concepts: ["字符串", "split", "字典"],
        checks: ["split", "for", "categories"],
        outputIncludes: ["图片", "文档"],
        starter: `files = ["photo.png", "report.pdf", "notes.txt", "avatar.jpg"]\ncategories = {"图片": [], "文档": []}\n\nfor file in files:\n    extension = file.split(".")[-1]\n    if extension in ["png", "jpg"]:\n        categories["图片"].append(file)\n    else:\n        categories["文档"].append(file)\n\nprint(categories)`,
      },
    ],
  },
  {
    id: "weather-tool",
    title: "天气查询工具",
    category: "API",
    difficulty: "初级",
    minutes: 60,
    outcome: "把 API 返回的数据整理成用户能读懂的天气摘要",
    summary: "先用模拟 JSON 学会字典读取，再接真实 API。",
    accent: "#2563eb",
    concepts: ["字典", "JSON", "格式化输出"],
    tasks: [
      {
        id: "weather-json",
        title: "读取天气数据",
        goal: "从模拟 API 数据里取出城市、温度和天气描述。",
        concepts: ["字典", "嵌套数据"],
        checks: ["weather", "[", "print"],
        outputIncludes: ["吉隆坡", "31"],
        starter: `weather = {\n    "city": "吉隆坡",\n    "temp": 31,\n    "condition": "多云",\n}\n\nprint(f"{weather['city']}：{weather['temp']}°C，{weather['condition']}")`,
      },
    ],
  },
  {
    id: "data-helper",
    title: "学习时长分析助手",
    category: "数据分析",
    difficulty: "初级",
    minutes: 70,
    outcome: "统计一周学习记录并找出最高效的一天",
    summary: "不用先学完整 pandas，也能先理解数据分析思路。",
    accent: "#7c3aed",
    concepts: ["列表", "字典", "sum", "max"],
    tasks: [
      {
        id: "study-stats",
        title: "统计学习时长",
        goal: "从一组学习记录里算出总时长和平均时长。",
        concepts: ["列表", "字典", "聚合计算"],
        checks: ["sum", "for", "minutes"],
        outputIncludes: ["总时长", "平均"],
        starter: `records = [\n    {"day": "周一", "minutes": 30},\n    {"day": "周二", "minutes": 45},\n    {"day": "周三", "minutes": 60},\n]\n\ntotal = sum(item["minutes"] for item in records)\naverage = total / len(records)\n\nprint(f"总时长：{total} 分钟")\nprint(f"平均：{average} 分钟")`,
      },
    ],
  },
  {
    id: "title-scraper",
    title: "网页标题提取器",
    category: "爬虫",
    difficulty: "初级",
    minutes: 55,
    outcome: "从 HTML 文本中提取页面标题",
    summary: "先用字符串拆解理解爬虫，再升级到 BeautifulSoup。",
    accent: "#dc2626",
    concepts: ["字符串", "查找", "切片"],
    tasks: [
      {
        id: "extract-title",
        title: "提取 title",
        goal: "从一段 HTML 中找到 title 标签里的文字。",
        concepts: ["find", "切片"],
        checks: ["find", "title", "print"],
        outputIncludes: ["Python 项目"],
        starter: `html = "<html><head><title>Python 项目学习</title></head><body></body></html>"\nstart = html.find("<title>") + len("<title>")\nend = html.find("</title>")\n\nprint(html[start:end])`,
      },
    ],
  },
  {
    id: "guess-game",
    title: "猜数字小游戏",
    category: "游戏",
    difficulty: "入门",
    minutes: 35,
    outcome: "一个能判断猜测结果的小游戏核心逻辑",
    summary: "用游戏场景学习条件判断和随机数。",
    accent: "#059669",
    concepts: ["random", "条件判断", "函数"],
    tasks: [
      {
        id: "guess-core",
        title: "判断猜测结果",
        goal: "比较用户猜测和答案，输出太大、太小或猜对。",
        concepts: ["条件判断", "函数"],
        checks: ["if", "elif", "else"],
        outputIncludes: ["猜对"],
        starter: `answer = 7\nguess = 7\n\nif guess > answer:\n    print("太大了")\nelif guess < answer:\n    print("太小了")\nelse:\n    print("猜对了")`,
      },
    ],
  },
];

const app = document.querySelector("#app");
const STORAGE_KEY = "projectpy-ai-state";

const defaultState = {
  selectedProjectId: "todo-cli",
  selectedTaskId: "todo-list",
  codeByTask: {},
  completedTasks: {},
  output: "",
  error: "",
  apiKey: "",
  apiModel: "gpt-5.4-mini",
  mentorMessages: [
    {
      role: "assistant",
      text: "我是你的 AI 项目导师。先选一个项目，然后每次只完成一个小任务。卡住时，我会优先给提示，不会马上把答案砸给你。",
    },
  ],
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { ...defaultState, ...saved };
  } catch {
    return { ...defaultState };
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function projectById(id) {
  return projects.find((project) => project.id === id) || projects[0];
}

function taskById(project, id) {
  return project.tasks.find((task) => task.id === id) || project.tasks[0];
}

function taskKey(projectId, taskId) {
  return `${projectId}:${taskId}`;
}

function currentContext() {
  const project = projectById(state.selectedProjectId);
  const task = taskById(project, state.selectedTaskId);
  const key = taskKey(project.id, task.id);
  const code = state.codeByTask[key] ?? task.starter;
  return { project, task, key, code };
}

function icon(name) {
  const map = {
    play: "▶",
    spark: "✦",
    check: "✓",
    reset: "↻",
    send: "➤",
    save: "◆",
    book: "◇",
    code: "{}",
    target: "◎",
  };
  return `<span class="button-icon" aria-hidden="true">${map[name] || "•"}</span>`;
}

function render() {
  const { project, task, key, code } = currentContext();
  const completed = new Set(state.completedTasks[project.id] || []);
  const completedCount = completed.size;
  const progress = Math.round((completedCount / project.tasks.length) * 100);
  const lineCount = Math.max(code.split("\n").length, 8);
  const lines = Array.from({ length: lineCount }, (_, index) => `<span>${index + 1}</span>`).join("");
  const hasApiKey = Boolean((state.apiKey || "").trim());

  app.innerHTML = `
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark">Py</div>
        <div>
          <strong>ProjectPy AI</strong>
          <span>项目式 Python 学习平台</span>
        </div>
      </div>
      <nav class="nav-tabs" aria-label="主要导航">
        <button class="nav-tab is-active" data-scroll="workspace">${icon("target")}学习工作台</button>
        <button class="nav-tab" data-scroll="project-library">${icon("book")}项目库</button>
        <button class="nav-tab" data-scroll="progress-panel">${icon("check")}作品进度</button>
      </nav>
    </header>

    <main class="app-shell">
      <section class="overview-band">
        <div class="overview-copy">
          <p class="eyebrow">从项目开始，不从语法目录开始</p>
          <h1>${project.title}</h1>
          <p>${project.summary}</p>
        </div>
        <div class="metric-strip" aria-label="学习概览">
          <div><strong>${project.difficulty}</strong><span>难度</span></div>
          <div><strong>${project.minutes} 分钟</strong><span>预计</span></div>
          <div><strong>${progress}%</strong><span>进度</span></div>
        </div>
      </section>

      <section class="workspace-grid">
        <aside class="project-panel" id="project-library">
          <div class="panel-heading">
            <span>${icon("target")}项目库</span>
            <strong>${projects.length}</strong>
          </div>
          <div class="project-list">
            ${projects.map((item) => renderProjectCard(item)).join("")}
          </div>
        </aside>

        <section class="task-panel" id="progress-panel">
          <div class="panel-heading">
            <span>${icon("check")}任务拆解</span>
            <strong>${completedCount}/${project.tasks.length}</strong>
          </div>
          <div class="progress-track"><span style="width:${progress}%"></span></div>
          <div class="task-list">
            ${project.tasks.map((item, index) => renderTaskItem(project, item, index, completed)).join("")}
          </div>
        </section>

        <section class="editor-panel" id="workspace">
          <div class="editor-toolbar">
            <div>
              <p class="eyebrow">${project.category} · ${task.concepts.join(" / ")}</p>
              <h2>${task.title}</h2>
              <p>${task.goal}</p>
            </div>
            <div class="toolbar-actions">
              <button class="icon-button" data-action="reset-code" title="重置代码">${icon("reset")}重置</button>
              <button class="primary-button" data-action="run-code">${icon("play")}运行</button>
            </div>
          </div>
          <div class="code-frame">
            <pre class="line-numbers" aria-hidden="true">${lines}</pre>
            <textarea id="code-editor" spellcheck="false" aria-label="Python 代码编辑器">${escapeHtml(code)}</textarea>
          </div>
          <div class="result-grid">
            <div class="output-box">
              <div class="result-title">${icon("code")}运行输出</div>
              <pre>${escapeHtml(state.output || "点击运行后，这里会显示 print 的结果。")}</pre>
            </div>
            <div class="output-box ${state.error ? "has-error" : ""}">
              <div class="result-title">${icon(state.error ? "reset" : "check")}${state.error ? "错误信息" : "任务检查"}</div>
              <pre>${escapeHtml(state.error || getTaskCheckMessage(task, code, state.output))}</pre>
            </div>
          </div>
        </section>

        <aside class="mentor-panel">
          <div class="panel-heading">
            <span>${icon("spark")}AI 导师</span>
            <strong>${hasApiKey ? "用户 API" : "本地"}</strong>
          </div>
          <div class="api-settings">
            <div class="api-status ${hasApiKey ? "is-connected" : ""}">
              <span>${hasApiKey ? "已连接" : "未连接"}</span>
              <small>${hasApiKey ? "会使用你自己的 OpenAI API Key" : "不填 Key 时只使用本地导师"}</small>
            </div>
            <label>
              OpenAI API Key
              <input id="api-key-input" type="password" autocomplete="off" placeholder="sk-..." value="${escapeAttr(state.apiKey || "")}" />
            </label>
            <label>
              模型
              <input id="api-model-input" type="text" autocomplete="off" value="${escapeAttr(state.apiModel || "gpt-5.4-mini")}" />
            </label>
            <div class="api-actions">
              <button type="button" data-action="save-api">${icon("save")}保存</button>
              <button type="button" data-action="clear-api">${icon("reset")}清除</button>
            </div>
          </div>
          <div class="mentor-quick-actions">
            <button data-mentor="给我一个提示">${icon("spark")}提示</button>
            <button data-mentor="解释我的报错">${icon("reset")}报错</button>
            <button data-mentor="总结这个任务">${icon("book")}总结</button>
          </div>
          <div class="mentor-thread" id="mentor-thread">
            ${state.mentorMessages.map(renderMessage).join("")}
          </div>
          <form class="mentor-form" id="mentor-form">
            <input id="mentor-input" type="text" autocomplete="off" placeholder="问 AI：为什么这里要用列表？" />
            <button class="send-button" type="submit" title="发送">${icon("send")}发送</button>
          </form>
        </aside>
      </section>
    </main>
  `;

  const editor = document.querySelector("#code-editor");
  editor.addEventListener("input", (event) => {
    state.codeByTask[key] = event.target.value;
    persist();
    syncLineNumbers(event.target.value);
  });
  editor.addEventListener("keydown", handleEditorTab);
  attachEvents();
  scrollMentorToEnd();
}

function renderProjectCard(project) {
  const isActive = project.id === state.selectedProjectId;
  const completed = state.completedTasks[project.id]?.length || 0;
  const total = project.tasks.length;
  return `
    <button class="project-card ${isActive ? "is-active" : ""}" data-project="${project.id}" style="--accent:${project.accent}">
      <span class="project-accent"></span>
      <span class="project-title">${project.title}</span>
      <span class="project-meta">${project.category} · ${project.difficulty} · ${project.minutes} 分钟</span>
      <span class="project-outcome">${project.outcome}</span>
      <span class="mini-progress"><i style="width:${Math.round((completed / total) * 100)}%"></i></span>
    </button>
  `;
}

function renderTaskItem(project, task, index, completed) {
  const isActive = task.id === state.selectedTaskId;
  const isDone = completed.has(task.id);
  return `
    <button class="task-item ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}" data-task="${task.id}">
      <span class="task-index">${isDone ? "✓" : index + 1}</span>
      <span>
        <strong>${task.title}</strong>
        <small>${task.concepts.join(" · ")}</small>
      </span>
    </button>
  `;
}

function renderMessage(message) {
  return `
    <div class="message ${message.role}">
      <span>${message.role === "assistant" ? "AI" : "你"}</span>
      <p>${escapeHtml(message.text)}</p>
    </div>
  `;
}

function attachEvents() {
  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab").forEach((tab) => tab.classList.remove("is-active"));
      button.classList.add("is-active");
      document.getElementById(button.dataset.scroll)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = projectById(button.dataset.project);
      state.selectedProjectId = project.id;
      state.selectedTaskId = project.tasks[0].id;
      state.output = "";
      state.error = "";
      persist();
      render();
    });
  });

  document.querySelectorAll("[data-task]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTaskId = button.dataset.task;
      state.output = "";
      state.error = "";
      persist();
      render();
    });
  });

  document.querySelector("[data-action='run-code']").addEventListener("click", runCode);
  document.querySelector("[data-action='reset-code']").addEventListener("click", resetCode);
  document.querySelector("[data-action='save-api']").addEventListener("click", saveApiSettings);
  document.querySelector("[data-action='clear-api']").addEventListener("click", clearApiSettings);

  document.querySelectorAll("[data-mentor]").forEach((button) => {
    button.addEventListener("click", () => askMentor(button.dataset.mentor));
  });

  document.querySelector("#mentor-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#mentor-input");
    const value = input.value.trim();
    if (!value) return;
    input.value = "";
    askMentor(value);
  });
}

async function runCode() {
  const { project, task, code } = currentContext();
  state.output = "运行中...";
  state.error = "";
  render();

  try {
    const response = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    state.output = result.output || "";
    state.error = result.error || "";

    if (result.ok && isTaskPassing(task, code, result.output)) {
      const done = new Set(state.completedTasks[project.id] || []);
      done.add(task.id);
      state.completedTasks[project.id] = Array.from(done);
      state.mentorMessages.push({
        role: "assistant",
        text: `漂亮，${task.title} 已经跑通。你刚刚在项目里实际用到了：${task.concepts.join("、")}。`,
      });
    } else if (!result.ok) {
      state.mentorMessages.push({
        role: "assistant",
        text: "代码运行失败了。我已经看到报错。你可以点“报错”，我会帮你拆开看。",
      });
    }
  } catch (error) {
    state.output = "";
    state.error = "无法连接本地服务，请确认 python3 server.py 正在运行。";
  }

  persist();
  render();
}

function resetCode() {
  const { key, task } = currentContext();
  state.codeByTask[key] = task.starter;
  state.output = "";
  state.error = "";
  persist();
  render();
}

async function askMentor(message) {
  const { project, task, code } = currentContext();
  state.mentorMessages.push({ role: "user", text: message });
  state.mentorMessages.push({
    role: "assistant",
    text: state.apiKey ? "正在用你的 API 分析任务和代码..." : "正在用本地导师分析任务和代码...",
  });
  render();

  try {
    const response = await fetch("/api/mentor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        code,
        output: state.output,
        error: state.error,
        projectTitle: project.title,
        taskTitle: task.title,
        taskGoal: task.goal,
        concepts: task.concepts,
        apiKey: state.apiKey,
        model: state.apiModel,
      }),
    });
    const result = await response.json();
    state.mentorMessages[state.mentorMessages.length - 1] = {
      role: "assistant",
      text: result.reply || "我暂时没有生成反馈，再试着问得具体一点。",
    };
  } catch {
    state.mentorMessages[state.mentorMessages.length - 1] = {
      role: "assistant",
      text: "导师服务暂时不可用。先运行代码，看输出和报错，我等会继续帮你分析。",
    };
  }

  persist();
  render();
}

function saveApiSettings() {
  const keyInput = document.querySelector("#api-key-input");
  const modelInput = document.querySelector("#api-model-input");
  state.apiKey = keyInput.value.trim();
  state.apiModel = modelInput.value.trim() || "gpt-5.4-mini";
  state.mentorMessages.push({
    role: "assistant",
    text: state.apiKey
      ? "已保存你的 API 设置。后续 AI 导师会使用你自己的 Key；这个项目不会读取开发者的 API Key。"
      : "没有填写 API Key。AI 导师会继续使用本地规则反馈。",
  });
  persist();
  render();
}

function clearApiSettings() {
  state.apiKey = "";
  state.apiModel = "gpt-5.4-mini";
  state.mentorMessages.push({
    role: "assistant",
    text: "已清除 API Key。现在不会调用 OpenAI，只使用本地导师。",
  });
  persist();
  render();
}

function isTaskPassing(task, code, output) {
  const codeOk = task.checks.every((check) => code.includes(check));
  const outputOk = task.outputIncludes.every((needle) => output.includes(needle));
  return codeOk && outputOk;
}

function getTaskCheckMessage(task, code, output) {
  if (!output) {
    return `目标：${task.goal}`;
  }
  if (isTaskPassing(task, code, output)) {
    return "已达到本任务的基础验收标准。可以继续下一步，或让 AI 总结知识点。";
  }
  return "代码已经运行。再检查一下是否覆盖了任务要求的知识点和输出内容。";
}

function syncLineNumbers(code) {
  const target = document.querySelector(".line-numbers");
  if (!target) return;
  const lineCount = Math.max(code.split("\n").length, 8);
  target.innerHTML = Array.from({ length: lineCount }, (_, index) => `<span>${index + 1}</span>`).join("");
}

function handleEditorTab(event) {
  if (event.key !== "Tab") return;
  event.preventDefault();
  const textarea = event.target;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.value = `${textarea.value.slice(0, start)}    ${textarea.value.slice(end)}`;
  textarea.selectionStart = textarea.selectionEnd = start + 4;
  const { key } = currentContext();
  state.codeByTask[key] = textarea.value;
  persist();
  syncLineNumbers(textarea.value);
}

function scrollMentorToEnd() {
  const thread = document.querySelector("#mentor-thread");
  if (thread) thread.scrollTop = thread.scrollHeight;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

render();
