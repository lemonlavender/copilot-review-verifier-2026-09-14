# Review handoff contract

Return a short summary in the user's language, then a JSON object using this shape. JSON keys and verdict enums remain English for consistent downstream use. The ledger is this project's interchange format, not an official GitHub API response.

```json
{
  "schemaVersion": 1,
  "repository": null,
  "pullRequest": null,
  "reviewedHead": null,
  "headRecheck": "unavailable",
  "items": [
    {
      "threadId": "R17",
      "threadState": "resolved",
      "path": null,
      "line": null,
      "verdict": "needs-evidence",
      "reason": "Current-revision source was not supplied.",
      "evidence": {
        "origin": "unavailable",
        "commit": null,
        "command": null,
        "result": null
      },
      "nextAction": "Inspect the finding in the current revision."
    }
  ]
}
```

`headRecheck` is `unchanged`, `changed`, or `unavailable`. If changed, also add `latestHead` and state that verdicts apply to `reviewedHead` only. `evidence.origin` is `executed`, `supplied`, or `unavailable`. Use the commit actually covered by the evidence, even if it differs from `reviewedHead`. Record a supplied command only if it was supplied exactly. Keep the result concise; redact secrets in logs. A current-code proof without a shell command uses `command: null` and describes the proof in `result`.

Do not change these field meanings to make incomplete evidence look complete. Add fields when useful, including source URLs, test artifacts, or multiple evidence records; keep the core fields.
