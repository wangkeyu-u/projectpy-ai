# Testing Checklist

本文件记录当前 MVP 发布前的功能检查。

## 已验证

- `python3 -m py_compile server.py` 通过。
- `node --check app.js` 通过。
- 仓库中没有 `OPENAI_API_KEY` / `OPENAI_MODEL` 这类默认读取开发者 API 的配置。
- `POST /api/run` 可以运行 Python 代码并返回输出。
- `POST /api/mentor` 不传 `apiKey` 时使用本地导师。
- `POST /api/mentor` 传入无效用户 `apiKey` 时不会使用开发者 Key，会返回错误说明和本地导师兜底提示。
- 浏览器打开 `http://127.0.0.1:8000/` 无控制台错误。
- 桌面布局和移动端布局均可展示核心学习流程。
- 顶部导航、项目选择、任务选择、运行代码、导师快捷问题、API 设置保存/清除均已绑定交互逻辑。

## 手动回归建议

1. 启动服务：

   ```bash
   python3 server.py
   ```

2. 打开：

   ```text
   http://127.0.0.1:8000
   ```

3. 点击“运行”，确认出现 Python 输出。
4. 点击“提示”，确认本地导师给出反馈。
5. 填入自己的 OpenAI API Key 并保存，再点击“总结”，确认返回 AI 反馈。
6. 点击“清除”，确认回到本地导师模式。
7. 切换不同项目和任务，确认代码、输出和进度正常更新。
