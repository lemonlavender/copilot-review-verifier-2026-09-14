import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, lstatSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (p) => readFileSync(path.join(root, p), 'utf8');

test('ordinary unsigned file import does not request privileged capabilities', () => {
  const m = JSON.parse(read('ipollowork.plugin.json'));
  assert.equal(m.source.trusted, false);
  assert.equal((m.permissions ?? []).length, 0);
  assert.equal((m.localServices ?? []).length, 0);
  assert.equal(m.engineBindings, undefined);
  assert.equal(m.authorization, undefined);
  assert.ok(m.resources.every(r => r.type === 'skill'));
});

test('portable package owns the complete skill and its handoff template', () => {
  const m = JSON.parse(read('ipollowork.plugin.json'));
  assert.equal(m.schemaVersion, 2);
  assert.equal(m.source.trusted, false);
  assert.equal(m.package.engines, undefined);
  for (const r of m.resources) {
    const absolute = path.resolve(root, r.path);
    assert.ok(absolute.startsWith(root));
    assert.ok(existsSync(absolute), r.path);
  }
  const skill = m.resources.find(r => r.type === 'skill');
  assert.ok(lstatSync(path.join(root, skill.path)).isDirectory());
  for (const file of ['SKILL.md', 'references/handoff.md']) {
    assert.ok(existsSync(path.join(root, skill.path, file)), file);
  }
});

test('both project descriptions carry installation, licensing and iPolloWork attribution', () => {
  for (const f of ['README.md', 'README.zh-CN.md']) {
    const content = read(f);
    assert.ok(content.includes('https://github.com/Devin-AXIS/iPolloWork'));
    assert.ok(content.includes('ipollowork.plugin.json'));
    assert.ok(content.includes('MIT'));
    assert.ok(content.includes('copilot-review-verifier'));
  }
  assert.ok(read('LICENSE').includes('Permission is hereby granted'));
  const topics = JSON.parse(read('topics.json'));
  assert.ok(topics.includes('ipollowork'));
  assert.ok(topics.includes('github-copilot'));
  assert.ok(topics.every(t => /^[a-z0-9-]{1,50}$/.test(t)));
});

test('handoff example distinguishes thread status, evidence origin and current revision', () => {
  const ledger = JSON.parse(read('examples/review-ledger.json'));
  assert.equal(ledger.reviewedHead, 'b222222');
  assert.deepEqual(ledger.items.map(i => i.verdict), ['still-present', 'verified-fixed', 'needs-evidence']);
  assert.equal(new Set(ledger.items.map(i => i.threadId)).size, 3);
  for (const item of ledger.items) {
    assert.ok(['supplied', 'executed', 'unavailable'].includes(item.evidence.origin));
    assert.ok(item.nextAction.length > 0);
  }
  assert.equal(ledger.items[1].evidence.origin, 'supplied');
  assert.equal(ledger.items[1].evidence.command, null);
  assert.equal(ledger.items[2].evidence.commit, 'a111111');
});

test('distribution contains no symlinks, credential files or access tokens', () => {
  function walk(dir) {
    for (const entry of readdirSync(dir, {withFileTypes: true})) {
      if (entry.name === '.git') continue;
      const p = path.join(dir, entry.name);
      assert.ok(!lstatSync(p).isSymbolicLink(), p);
      assert.ok(!['.env', 'hosts.yml', 'credentials.json', '.DS_Store'].includes(entry.name), p);
      if (entry.isDirectory()) walk(p);
      else assert.ok(!/(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|-----BEGIN (?:RSA |OPENSSH )?PRIVATE KEY-----)/.test(readFileSync(p, 'utf8')), p);
    }
  }
  walk(root);
});
