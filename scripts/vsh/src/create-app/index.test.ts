// @vitest-environment node

import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { findMonorepoRoot } from '@vh5/node-utils';

import { select, text } from '@clack/prompts';
import { cac } from 'cac';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { defineCreateAppCommand } from './index';

vi.mock('@clack/prompts', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@clack/prompts')>()),
  select: vi.fn(),
  text: vi.fn(),
}));
vi.mock('@vh5/node-utils', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vh5/node-utils')>()),
  findMonorepoRoot: vi.fn(),
}));

const apps = fileURLToPath(new URL('../../../../apps', import.meta.url));
let root: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'vh5-create-app-'));
  await mkdir(join(root, 'apps'));
  vi.mocked(findMonorepoRoot).mockReturnValue(root);
  vi.mocked(text).mockResolvedValue('h5-review');
});

afterEach(async () => {
  await rm(root, { force: true, recursive: true });
});

function runCreateApp() {
  const cli = cac('vsh');
  defineCreateAppCommand(cli);
  cli.parse(['node', 'vsh', 'create-app'], { run: false });
  return cli.runMatchedCommand();
}

describe('create-app', () => {
  it.each([
    ['ionic', 5786],
    ['nutui', 5780],
    ['tdesign', 5785],
    ['vant', 5781],
    ['varlet', 5782],
  ])(
    'creates a runnable %s template with isolated settings',
    async (ui, port) => {
      const template = join(apps, `h5-${ui}`);
      await symlink(template, join(root, 'apps', `h5-${ui}`), 'dir');
      vi.mocked(select).mockResolvedValue(ui);
      await runCreateApp();

      const app = join(root, 'apps', 'h5-review');
      const manifest: unknown = JSON.parse(
        await readFile(join(app, 'package.json'), 'utf8'),
      );
      expect(manifest).toMatchObject({
        dependencies: {
          '@tanstack/vue-query': 'catalog:',
          '@vh5/mobile-ui': 'workspace:*',
        },
        name: '@vh5/h5-review',
        scripts: { 'dev:services': 'vite --mode services' },
      });
      expect(existsSync(join(app, '.env'))).toBe(false);
      for (const mode of ['analyze', 'development', 'production', 'services']) {
        const env = await readFile(join(app, `.env.${mode}`), 'utf8');
        expect(env).toContain('VITE_APP_TITLE=h5-review\n');
        expect(env).toContain('VITE_APP_NAMESPACE=vh5-web-h5-review\n');
      }
      for (const mode of ['development', 'services']) {
        const env = await readFile(join(app, `.env.${mode}`), 'utf8');
        expect(env).toContain(`VITE_PORT=${port}\n`);
      }
      expect(await readFile(join(app, 'src/router/index.ts'), 'utf8')).toBe(
        await readFile(join(template, 'src/router/index.ts'), 'utf8'),
      );
    },
  );

  it('removes an incomplete copy after a template read fails', async () => {
    vi.mocked(select).mockResolvedValue('ionic');
    await expect(runCreateApp()).rejects.toThrow('ENOENT');
    expect(existsSync(join(root, 'apps', 'h5-review'))).toBe(false);
  });
});
