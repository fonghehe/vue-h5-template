// @vitest-environment node
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const root = fileURLToPath(new URL('../../', import.meta.url));

function checkPaths(paths: string[]) {
  // Disable user/global excludes so this test only verifies repository policy.
  const result = spawnSync(
    'git',
    [
      '-c',
      'core.excludesFile=/dev/null',
      'check-ignore',
      '--no-index',
      '--stdin',
    ],
    {
      cwd: root,
      encoding: 'utf8',
      input: paths.join('\n'),
    },
  );
  if (result.error) throw result.error;
  expect([0, 1]).toContain(result.status);
  return result.stdout.trim().split('\n').filter(Boolean);
}

describe('ai local file policy', () => {
  it('ignores local memory, chat history and credentials without deleting files', () => {
    const paths = [
      '.workbuddy/memory/2026-09-04.md',
      'apps/h5-vant/.workbuddy/memory/local.md',
      '.claude/settings.local.json',
      '.claude/projects/session.jsonl',
      'CLAUDE.local.md',
      '.codex/auth.json',
      '.codex/sessions/trace.jsonl',
      '.codex/state_5.sqlite-wal',
      '.cursor/chats/local.json',
      '.gemini/oauth_creds.json',
      '.aider.chat.history.md',
      '.aider.tags.cache.v4/data',
      '.continue/sessions/local.json',
    ];
    expect(checkPaths(paths)).toEqual(paths);
  });

  it('keeps team instructions, rules and skills trackable', () => {
    expect(
      checkPaths([
        'AGENTS.md',
        'CLAUDE.md',
        'GEMINI.md',
        '.workbuddy/rules/project.md',
        '.cursor/rules/project.mdc',
        '.claude/skills/review/SKILL.md',
        '.codex/skills/review/SKILL.md',
        '.claude/settings.json',
        '.github/copilot-instructions.md',
        '.windsurf/rules/project.md',
      ]),
    ).toEqual([]);
  });
});
