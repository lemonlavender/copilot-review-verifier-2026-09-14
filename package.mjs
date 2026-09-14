import { readFileSync, mkdirSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(readFileSync(path.join(root, 'ipollowork.plugin.json')));
const name = `${manifest.id}-${manifest.package.version}`;
const stage = mkdtempSync(path.join(tmpdir(), 'copilot-review-package-'));
const dist = path.join(root, 'dist');
mkdirSync(dist, { recursive: true });
try {
  cpSync(path.join(root, 'ipollowork.plugin.json'), path.join(stage, 'ipollowork.plugin.json'));
  cpSync(path.join(root, 'skills'), path.join(stage, 'skills'), { recursive: true });
  const install = path.join(dist, `${name}.ipollowork-plugin`);
  const skill = path.join(dist, `${name}-skill.zip`);
  rmSync(install, { force: true });
  rmSync(skill, { force: true });
  execFileSync('zip', ['-X', '-qr', install, 'ipollowork.plugin.json', 'skills'], { cwd: stage });
  execFileSync('zip', ['-X', '-qr', skill, manifest.id], { cwd: path.join(stage, 'skills') });
  console.log(install);
  console.log(skill);
} finally {
  rmSync(stage, { recursive: true, force: true });
}
