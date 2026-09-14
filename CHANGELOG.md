# Changelog / 更新日志

## 1.1.0 — 2026-09-14

- Fix ordinary iPollo file import: remove optional workspace/network permissions rejected as privileged capabilities.
- Deliver a root-manifest `.ipollowork-plugin` and complete standalone Skill ZIP.
- Target the tested iPollo 0.50.12 host and document the real file-import workflow.

修复普通文件导入被权限声明拒绝的问题，交付标准安装包和完整 Skill ZIP，补充实际桌面安装教程。

## 1.0.0 — 2026-09-14

Initial Skill source and evidence-handoff contract. Its manifest passed the schema validator but the desktop file importer rejected the declared permissions. Use 1.1.0 for installation.

初始源码版本：清单格式正确，但权限声明不符合桌面普通导入边界。安装请使用 1.1.0。
