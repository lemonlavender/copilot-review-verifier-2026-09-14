# Copilot Review Verifier

[English](README.md)

用于复核 AI 代码审查意见的独立 Skill，输出可追溯的 Markdown 摘要和 JSON 证据记录。分别记录评论界面状态、技术结论、被审查提交和证据来源。

**支持在 [iPolloWork](https://github.com/Devin-AXIS/iPolloWork) 中使用。** 本项目采用 MIT 许可证，为独立开发项目，不代表 GitHub 或 iPolloWork 官方认证。

主题标签：`ai`、`agent-skills`、`github-copilot`、`code-review`、`verification`、`ipollowork`。

## 热点背景

选题对应 GitHub [2026 年 9 月 11 日的 Copilot 审查更新](https://github.blog/changelog/2026-09-11-auto-resolution-and-analysis-updates-in-copilot-code-review/)，其中包括自动解决已处理的评论。本项目于 9 月 14 日选题，帮助审查人在评论状态变化时保留证据链。详见[来源与日期](docs/hot-topic.md)。

## 在 iPollo 中安装和使用

1. 打开 [Releases 下载页](https://github.com/lemonlavender/copilot-review-verifier-2026-09-14/releases/latest)，下载 **copilot-review-verifier-1.1.0.ipollowork-plugin**。保留扩展名，此方式无需解压。
2. 在 iPollo 点击 **扩展 → 插件 → 添加 → 文件**，选择该安装包。
3. 预览应显示 **Copilot Review Verifier v1.1.0**、**1 个技能**及“已通过声明式安全检查”，点击 **安装插件**。
4. 确认插件“启用”，且 **AI Review Evidence Audit** 开关打开。在项目中新建任务，选择可用模型；如果软件提示重新加载，按提示操作。
5. 把 [examples/review-case.md](examples/review-case.md) 放进该项目，发送：

```text
使用已安装的 copilot-review-verifier 技能，并读取它的交接格式参考。
读取本项目 review-case.md，将 Markdown 复核摘要保存到
skill-acceptance.md，JSON 记录保存到 skill-acceptance.json。
这是用户提供的模拟证据，不得声称本次执行了测试。
```

实际使用时提供 PR 或评论摘录、提交号、当前代码或 diff，以及已有测试证据。未知命令保留 null。复核请求本身不授权发评论或合并代码。

**实测环境：** iPollo **0.50.12**、macOS arm64、OpenCode 引擎，使用软件内已有的 GPT-5.5 模型配置。清单仅声明这个实测宿主版本，详细结果和边界见[桌面验收记录](docs/desktop-acceptance.md)。

## 独立 Skill ZIP 备选方式

Release 另提供 `copilot-review-verifier-1.1.0-skill.zip`。解压后，在宿主的本地 Skill 导入功能中选择**直接包含 SKILL.md 的文件夹**，保留整个 `references/`。不要在同一项目中同时使用两种安装方式。本备选包经过结构验证；桌面实测使用上面的文件安装包方式。

GitHub 的源码 ZIP 是源码，不是安装包。iPollo 的 GitHub 兼容转换入口并不支持任意仓库链接。

## 流程和产物

读取选定评论 → 确定提交及代码约定 → 核对证据 → 判为 `verified-fixed`（有修复证据）、`still-present`（仍存在）、`needs-evidence`（缺证据）、`obsolete`（逻辑已移除）或 `false-positive`（误报）→ 尽可能复查 head → 输出摘要及 schemaVersion 1 JSON。

证据来源明确区分 `executed`（本次执行）、`supplied`（提供的证据）、`unavailable`（不可得）。参见[示例记录](examples/review-ledger.json)和[交接格式](skills/copilot-review-verifier/references/handoff.md)。配套的[审查证据看板插件](https://github.com/lemonlavender/review-ledger-board-2026-09-14)可在 iPollo 中展示这些 JSON。

## 重新打包和验证

构建需要 Node.js 22+ 和 `zip` 命令（macOS/Linux），无 npm 依赖。

```sh
node --test tests/package.test.mjs
node package.mjs
```

安装包输出到 `dist/`，包含根目录 `ipollowork.plugin.json` 和完整 `skills/copilot-review-verifier/`。不包含 MCP 服务、原生程序、远程脚本、自定义授权或插件权限。模型、项目工具和权限由宿主提供，Skill 自身不能授予权限。

下载 Release 中列出的全部文件后，可运行 `shasum -a 256 -c SHA256SUMS` 核对文件完整性。原始 ZIP 的 SHA-256 不等于清单里的 checksum。

## 排错和限制

- 如果提示含特权能力，请确认下载的是 1.1.0 新包；此版本已删除初始清单中不兼容的权限声明。
- 找不到技能时，检查启用状态，新建任务，并按软件提示刷新或重新加载。
- 模型不可用时，需要在宿主中配置可用服务；导入 Skill 不会提供模型访问资格。
- 本工具不独立认证整个发布版本；模拟验收没有连接真实 PR，也没有运行真实项目回归测试。

另见[验证记录](docs/validation.md)、[更新日志](CHANGELOG.md)和 [MIT 许可证](LICENSE)。
