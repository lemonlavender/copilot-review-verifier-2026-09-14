# Copilot 审查结论复核

[English](README.md)

一个可移植的 Agent Skill：对照代码与测试证据核实 AI 代码审查意见，生成可交接的复核记录。覆盖待处理、已解决和已过时的评论，并记录证据实际对应的提交版本。

**支持在 [iPolloWork](https://github.com/Devin-AXIS/iPolloWork) 中使用。** 本独立项目附带 iPolloWork schema version 2 插件清单，不属于 GitHub 或 iPolloWork 官方产品，也不代表官方认证。

**主题标签：** `ai` · `agent-skills` · `github-copilot` · `code-review` · `verification` · `ipollowork`

## 热点背景

GitHub 在 2026 年 9 月 11 日更新 Copilot 代码审查，加入已处理评论的自动解决功能。本项目于 9 月 14 日选题，帮助审查者在评论状态变化后保留清晰的证据链。[热点来源与范围](docs/hot-topic.md)记录实际事件日期。

## 能做什么

- 给出五种技术结论：已验证修复、问题仍在、缺少证据、逻辑已移除、原评论误报。
- 单独记录界面中的评论状态和被审查的提交。
- 区分实际执行、用户提供和缺失的证据；仅在已知时填写准确测试命令。
- 输出便于阅读的摘要和可供下一位审查者使用的 JSON 记录。

## 在 iPolloWork 中安装

1. 下载或克隆本仓库到所选工作区，例如 `plugins/copilot-review-verifier`。
2. 确认该目录根部有 `ipollowork.plugin.json`。
3. 打开 **Settings → Extensions → Plugin packages → Developer: install a local package**（设置中的插件包本地开发安装入口）。
4. 输入 `plugins/copilot-review-verifier`，点击 **Validate**，查看包信息后安装。
5. 新建任务，指定使用 `copilot-review-verifier`，提供 PR、本地仓库或审查摘录。

安装流程依据 [iPolloWork 插件包文档](https://github.com/Devin-AXIS/iPolloWork/blob/main/docs/plugin-packages.md)。清单声明 iPolloWork `>=0.18.0`，宿主须支持 schema version 2。插件没有特定引擎绑定、内置 MCP 服务或 API 密钥要求。仅审查粘贴文本时，网络和工作区读取均可选。实际运行项目测试依赖宿主已有的终端能力和权限，Skill 本身不会授予权限。

其他支持 Agent Skills 的宿主可使用其安装方式导入完整的 `skills/copilot-review-verifier` 目录，包括 `references/`。

## 使用示例

```text
使用 copilot-review-verifier 对照当前 PR 提交复核这些 Copilot 审查意见，
包括已解决和已过时的评论。给我中文摘要和 JSON 证据记录。
不要发表评论或合并代码。
```

没有 GitHub 连接时，可以提供评论、提交版本、代码差异及已有测试结果。缺失证据会明确列出。可先尝试[模拟案例](examples/review-case.md)，对照[示例记录](examples/review-ledger.json)。

## 验证与限制

使用 Node.js 22 或更高版本执行无需第三方依赖的包检查：

```sh
node --test tests/package.test.mjs
```

[验证记录](docs/validation.md)说明了编写检查和行为测试。包检查与模拟审查不等于真实 GitHub 集成测试或桌面安装实测。本 Skill 仅复核指定意见，不为整个发布背书，也不会自动解决评论。

## 许可证

本项目原创内容使用 [MIT 许可证](LICENSE)。引用的产品和文档保留其自身许可证和条款。本包不包含 iPolloWork 的实现代码。
