import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

import { defineConfig } from '../index';

describe('rule ownership across Oxlint and ESLint', () => {
  it('hands overlapping JavaScript rules to Oxlint only within its scope', async () => {
    const eslint = new ESLint({
      overrideConfig: await defineConfig(),
      overrideConfigFile: true,
    });

    const app = await eslint.calculateConfigForFile('apps/h5-vant/src/main.ts');
    const docs = await eslint.calculateConfigForFile('docs/example.js');
    const json = await eslint.calculateConfigForFile(
      'packages/api-client/package.json',
    );
    const yaml = await eslint.calculateConfigForFile('pnpm-workspace.yaml');

    expect(app.rules['no-debugger'][0]).toBe(0);
    expect(docs.rules['no-debugger'][0]).toBe(2);
    expect(json.rules['jsonc/no-dupe-keys'][0]).toBe(2);
    expect(yaml.rules['yaml/key-spacing'][0]).toBe(2);
    expect(await eslint.isPathIgnored('test-results/.last-run.json')).toBe(
      true,
    );
    expect(await eslint.isPathIgnored('playwright-report/trace.js')).toBe(true);
  });
});
