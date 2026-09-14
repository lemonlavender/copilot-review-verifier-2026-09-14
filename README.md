# Copilot Review Verifier

[简体中文](README.zh-CN.md)

A portable Agent Skill that checks AI code-review findings against code and test evidence and produces a reviewer handoff. It handles open, resolved, and outdated threads while tracking the exact revision covered by the evidence.

**Supports use in [iPolloWork](https://github.com/Devin-AXIS/iPolloWork).** This independent project includes an iPolloWork schema-version-2 plugin package. It is not an official GitHub or iPolloWork product or certification.

**Topics:** `ai` · `agent-skills` · `github-copilot` · `code-review` · `verification` · `ipollowork`

## Why this exists

GitHub's September 11, 2026 Copilot code-review update added automatic resolution of addressed comments. This project, selected on September 14, helps reviewers preserve a clear evidence trail as thread states change. See [the dated source and scope](docs/hot-topic.md).

## What you get

- Five technical verdicts: verified fixed, still present, needs evidence, obsolete, and false positive.
- A separate record of the UI thread state and reviewed commit.
- Evidence labeled as executed, supplied, or unavailable, with exact commands when known.
- A readable summary and JSON ledger for the next reviewer.

## Install in iPolloWork

1. Download or clone this repository into your selected workspace, for example `plugins/copilot-review-verifier`.
2. Check that `ipollowork.plugin.json` is at that folder's root.
3. Open **Settings → Extensions → Plugin packages → Developer: install a local package**.
4. Enter `plugins/copilot-review-verifier`, choose **Validate**, review the package, and install.
5. Start a task and ask it to use `copilot-review-verifier` with the PR, checkout, or review excerpts.

This follows [iPolloWork's package documentation](https://github.com/Devin-AXIS/iPolloWork/blob/main/docs/plugin-packages.md). The manifest targets iPolloWork `>=0.18.0` and requires schema version 2 support. It has no engine-specific binding, bundled MCP server, or API credential requirement. Network and workspace reading are optional for supplied-text audits. Running project tests uses the host's existing shell capability and permissions; the skill cannot grant them.

For another Agent Skills host, install the complete `skills/copilot-review-verifier` directory using that host's supported skill loader, including `references/`.

## Use

```text
Use copilot-review-verifier to audit these Copilot review findings against
the current PR head. Include resolved and outdated threads. Give me a
human summary and the JSON evidence ledger. Do not post comments or merge.
```

With no GitHub connection, paste the review text, revision, diff and available test results. Missing evidence stays explicit. Try the [synthetic exercise](examples/review-case.md) and compare the [example ledger](examples/review-ledger.json).

## Validation and limits

Run the dependency-free package checks with Node.js 22 or newer:

```sh
node --test tests/package.test.mjs
```

See [validation evidence](docs/validation.md) for the authoring checks and behavioral exercise. Package checks and a simulated review do not establish live GitHub integration or a desktop installation test. The skill audits the selected findings; it does not certify a release or automatically resolve comments.

## License

Original project content is [MIT licensed](LICENSE). Referenced products and documentation retain their own licenses and terms. No iPolloWork implementation code is bundled.
