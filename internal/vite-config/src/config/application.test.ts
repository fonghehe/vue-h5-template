import type { ConfigEnv, UserConfig } from 'vite';

import { describe, expect, it, vi } from 'vitest';

import { defineApplicationConfig } from './application';

vi.mock('../plugins', () => ({
  loadApplicationPlugins: () => [],
}));

const env: ConfigEnv = { command: 'build', mode: 'test' };

describe('application CSS configuration', () => {
  it('applies shared PostCSS plugins and merges each app override once', async () => {
    const importer = { findFileUrl: () => null };
    const plugin = { postcssPlugin: 'app-postcss-plugin' };
    const vite: UserConfig = {
      css: {
        postcss: { plugins: [plugin] },
        preprocessorOptions: { scss: { importers: [importer] } },
      },
    };
    const config = await defineApplicationConfig(async () => ({ vite }))(env);

    expect(config.css?.postcss).toMatchObject({
      plugins: [
        { postcssPlugin: 'autoprefixer' },
        { postcssPlugin: 'postcss-mobile-forever' },
        plugin,
      ],
    });
    expect(config.css?.preprocessorOptions?.scss?.importers).toEqual([
      importer,
    ]);
  });

  it('lets an explicit external PostCSS config replace the inline pipeline', async () => {
    const config = await defineApplicationConfig(async () => ({
      vite: { css: { postcss: './custom-postcss' } },
    }))(env);

    expect(config.css?.postcss).toBe('./custom-postcss');
  });

  it('omits the shared PostCSS pipeline when viewport conversion is disabled', async () => {
    const plugin = { postcssPlugin: 'app-postcss-plugin' };
    const config = await defineApplicationConfig(async () => ({
      application: { pxToViewport: false },
      vite: { css: { postcss: { plugins: [plugin] } } },
    }))(env);

    expect(config.css?.postcss).toEqual({ plugins: [plugin] });
  });
});
