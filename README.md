# Copilot Review Verifier

[简体中文](README.zh-CN.md)

A portable Agent Skill for auditing AI review findings and producing a traceable Markdown + JSON evidence handoff. UI thread state, technical verdict, reviewed commit, and evidence origin stay separate.

**Supports use in [iPolloWork](https://github.com/Devin-AXIS/iPolloWork).** This independent MIT project is not an official GitHub or iPolloWork certification.

Topics: `ai` · `agent-skills` · `github-copilot` · `code-review` · `verification` · `ipollowork`.

## Why this exists

GitHub's [September 11, 2026 Copilot review update](https://github.blog/changelog/2026-09-11-auto-resolution-and-analysis-updates-in-copilot-code-review/) introduced automatic resolution of addressed comments. Selected on September 14, this Skill helps preserve evidence as threads change state. See [dated topic notes](docs/hot-topic.md).

## Install and use in iPollo

1. Open [Releases](https://github.com/lemonlavender/copilot-review-verifier-2026-09-14/releases/latest). Download **copilot-review-verifier-1.1.0.ipollowork-plugin**. Keep the extension; do not unpack it for this route.
2. In iPollo, open **扩展 / Extensions → 插件 / Plugins → 添加 / Add → 文件 / File** and choose the package.
3. The preview should show **Copilot Review Verifier v1.1.0**, **1 skill**, and a passed declarative safety check. Click **安装插件 / Install plugin**.
4. Confirm the package is enabled and **AI Review Evidence Audit** is on. Start a new task in your project; select a working model if none is available. Reload if the host requests it.
5. Add [examples/review-case.md](examples/review-case.md) to the project, then ask:

```text
Use the installed copilot-review-verifier skill and read its handoff reference.
Read review-case.md in this project. Save the Markdown audit to
skill-acceptance.md and the JSON ledger to skill-acceptance.json.
This is supplied evidence: do not claim tests were executed.
```

For a real audit, supply the PR/review excerpts, commit, current source or diff, and available test evidence. Unknown commands remain null. Review requests alone do not authorize posting comments or merging.

**Tested host:** iPollo **0.50.12**, macOS arm64, OpenCode engine with the app's existing GPT-5.5 model configuration. The manifest declares only this tested host version. See the [desktop acceptance record](docs/desktop-acceptance.md) for precise results and limits.

## Skill ZIP alternative

The release also includes `copilot-review-verifier-1.1.0-skill.zip`. Unpack it, then choose the folder that **directly contains SKILL.md**, retaining `references/`, in the host's local Skill importer. Do not install both alternatives into the same project. This alternative is structurally validated; the desktop acceptance uses the preferred file-package route above.

A GitHub source ZIP is source code, not an install package. Arbitrary GitHub repository links are not universally supported by iPollo's GitHub conversion importer.

## Workflow and output

Read the selected findings → inspect the relevant revision and code contract → evaluate available evidence → assign one of `verified-fixed`, `still-present`, `needs-evidence`, `obsolete`, or `false-positive` → recheck head when possible → emit a human summary and schemaVersion 1 JSON.

Evidence is labeled `executed`, `supplied`, or `unavailable`. See [example ledger](examples/review-ledger.json) and [handoff format](skills/copilot-review-verifier/references/handoff.md). The companion [Review Ledger Board](https://github.com/lemonlavender/review-ledger-board-2026-09-14) displays this JSON inside iPollo.

## Build and verify

Requirements for rebuilding: Node.js 22+ and the `zip` command (macOS/Linux). No npm dependencies.

```sh
node --test tests/package.test.mjs
node package.mjs
```

Installable archives appear in `dist/`. The package contains root `ipollowork.plugin.json` plus the **complete** `skills/copilot-review-verifier/` directory. It contains no MCP service, native code, remote script, custom authorization, or package permissions. The host provides the model and any project tools; the Skill grants no permissions.

Check downloaded archive bytes against the release's `SHA256SUMS`, for example with `shasum -a 256 -c SHA256SUMS` after downloading all listed assets. Raw ZIP SHA-256 is not a manifest checksum.

## Troubleshooting and scope

- A privileged-capabilities rejection indicates an old or different package. Version 1.1.0 removes the incompatible permissions in the initial manifest; use the release file above.
- If the Skill is unavailable, confirm it is enabled, start a new task, and refresh/reload as prompted.
- If the model is unavailable, configure a working provider in the host. Importing a Skill does not supply model access.
- This audit does not independently certify a release. No live PR integration or real regression suite was exercised in the synthetic acceptance.

See [validation](docs/validation.md), [changelog](CHANGELOG.md), and [MIT license](LICENSE).
