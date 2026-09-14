---
name: copilot-review-verifier
description: Use when auditing whether AI code-review findings are fixed after a new commit, especially when Copilot threads are resolved, outdated, or need a traceable reviewer handoff.
---

# Copilot Review Verifier

Tags: ai, agent-skills, github-copilot, code-review, verification, ipollowork.

Produce an evidence-backed audit of specified review findings. Work with GitHub access, a local checkout, or supplied excerpts. Keep thread state separate from the technical verdict. This skill supports [iPolloWork](https://github.com/Devin-AXIS/iPolloWork) as a portable skill.

## Establish scope

Record repository, PR, and reviewed head revision. Prefer a full commit SHA when available. Treat abbreviated fixture SHAs as examples. Keep the requested scope; do not infer release authority from a review request. If the current head cannot be checked, identify it as supplied or unknown.

Read the finding, relevant diff, current code, and applicable test evidence. Trace renamed or moved code before deciding that a finding is obsolete. Verify that the alleged behavior contradicts the intended contract: a reviewer claim alone does not establish a bug.

## Verify findings

Use the smallest relevant check. For behavioral changes, prefer a regression that demonstrates the reported failure before the fix and passes on the reviewed revision. A clear static proof can suffice for a purely structural issue; explain the proof and its limit. Do not invent commands, paths, test results, or tool access. Label supplied evidence separately from checks executed in this run.

| Verdict | Evidence required |
| --- | --- |
| `verified-fixed` | Current-revision code addresses the original issue, supported by relevant evidence. State whether that evidence was supplied or executed. |
| `still-present` | Current code retains the problematic behavior under its intended contract. |
| `needs-evidence` | Current source, contract, revision, or a relevant verification result is missing. |
| `obsolete` | Current code removed the affected behavior and no replacement retains it. A moved line is insufficient. |
| `false-positive` | The original finding conflicts with a verified contract or demonstrable behavior. |

Keep `resolved`, `open`, and `outdated` in a separate thread-state field. A test from a previous commit cannot establish current behavior. A green general suite proves only what it covers.

## Hand off

Read [the handoff contract](references/handoff.md). Return a concise human summary plus its JSON ledger unless the user requests a different format. Every entry needs a stable thread identifier, verdict, evidence origin, evidence revision, exact command or `null`, and a next action. Preserve unknown values as `null`; never turn inferred commands into executed ones.

Recheck the PR head before finalizing when tools permit. If it changed, retain results against the inspected revision and mark the handoff stale pending a focused recheck. With supplied excerpts only, record `headRecheck: "unavailable"`.

Report blocking findings within this audit's scope and the remaining evidence gap. Do not claim the whole release is safe. Follow the user's authorization for edits, comments, resolving threads, or merging; an audit request alone does not authorize these mutations.

## Common mistakes

- Clearing a finding because its thread closed: inspect the corresponding behavior.
- Treating an old passing test as current: record both revisions.
- Giving a verdict without a replayable trail: include origin, revision, command or `null`, and next action.
- Calling a synthetic exercise a live PR test: state the input and environment actually used.
