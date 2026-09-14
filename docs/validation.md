# Validation record / 验证记录

Validated on **2026-09-14** during authoring.

| Check / 检查 | Observed result / 实际结果 |
| --- | --- |
| Package tests | `node --test tests/package.test.mjs`: 4 passed, 0 failed. |
| Skill frontmatter | Skill Creator `quick_validate.py`: `Skill is valid!` |
| iPolloWork manifest | Passed the upstream `validatePluginPackageManifest` function from commit `0aaa843a91cc4f67c1a673064b36305a2076ea6f`, executed with Zod 4.3.6. |
| Credential scan | Exact matching against the locally stored publishing credentials found no matches in the distribution. Values were not printed or included. |
| Behavioral exercise | Supplied-only synthetic review returned the three expected verdicts, labeled evidence `supplied`, preserved unknown commands as `null`, and reported unavailable head recheck. |
| Changed-head exercise | A later PR head made the previous audit stale; results remained bound to the inspected revision. |
| Contract/removal cases | Verified contract rejecting key 0 → `false-positive`; deleted behavior with no replacement → `obsolete`; unknown valid-key contract → `needs-evidence`. |

## Authoring method / 编写验证方法

Before authoring, a separate agent answered a synthetic review exercise without the skill. It already distinguished the three technical outcomes correctly. Its prose/table output did not supply the new project's consistent JSON handoff contract, explicit unknown command fields, or head-recheck status. The added workflow addresses that handoff gap; no improvement in defect-detection accuracy is claimed.

The baseline included: R17 with a renamed truthiness guard, R18 with a supplied current listener fix and regression report, and R19 with only an old test. With the skill, the agent returned `still-present`, `verified-fixed` based on supplied evidence, and `needs-evidence`, plus the structured ledger. Additional cases covered changed revisions, explicit contracts, missing contracts, and removed behavior.

The package checks were also run before package files existed: three checks failed for missing required files. After implementation, all four passed. These are packaging and example-consistency checks, not tests of a live code-review service.

编写前，无 Skill 的模型已能区分三个技术结论，但没有统一 JSON 交接结构、缺失命令标识和提交复查状态。加入 Skill 后验证了这些交接字段及补充场景；不据此声称提高了缺陷识别准确率。自动包检查先观察到必要文件缺失导致失败，完成实现后全部通过。

## Boundaries / 验证边界

No live PR was audited, no real project regression was executed, and the package was not installed into a running iPolloWork desktop instance during these checks. The compatibility claim is supported by the official manifest validator and documented portable-skill workflow. Actual engine behavior and local permissions remain host-dependent.

上述检查没有复核真实 PR、执行真实项目回归测试或在运行中的 iPolloWork 桌面实例中安装。兼容依据是官方清单校验器和公开的可移植 Skill 流程；实际引擎表现与权限依赖宿主。
