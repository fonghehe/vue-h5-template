import { defineConfig, devices } from '@playwright/test';

const app = process.env.E2E_APP ?? 'vant';
const preview = process.env.E2E_PREVIEW === '1';
const browser = process.env.E2E_BROWSER ?? 'chromium';
if (browser !== 'chromium' && browser !== 'webkit')
  throw new Error('E2E_BROWSER must be chromium or webkit');
const port = new Map([
  ['ionic', 15_781],
  ['nutui', 15_777],
  ['tdesign', 15_780],
  ['vant', 15_778],
  ['varlet', 15_779],
]).get(app);
if (!port)
  throw new Error('E2E_APP must be vant, nutui, varlet, tdesign or ionic');
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  expect: { timeout: 8000 },
  fullyParallel: true,
  outputDir: `test-results/${app}-${preview ? 'preview' : 'dev'}-${browser}`,
  reporter: process.env.CI ? 'github' : 'list',
  retries: process.env.CI ? 2 : 0,
  testDir: './e2e',
  testMatch: preview
    ? ['browser-behavior.spec.ts']
    : [
        'browser-behavior.spec.ts',
        'mobile-template.spec.ts',
        'app-parity.spec.ts',
        ...(app === 'nutui' ? ['nutui-navigation.spec.ts'] : []),
      ],
  use: {
    ...devices['iPhone 13'],
    baseURL,
    browserName: browser,
    ...(browser === 'chromium' && process.env.E2E_CHANNEL
      ? { channel: process.env.E2E_CHANNEL }
      : {}),
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  webServer: {
    command: preview
      ? `pnpm -F @vh5/h5-${app} exec vite preview --host 127.0.0.1 --port ${port} --strictPort`
      : `pnpm -F @vh5/h5-${app} exec vite --mode development --port ${port} --strictPort`,
    reuseExistingServer: false,
    timeout: 120_000,
    url: preview ? baseURL : `${baseURL}/api/product/list`,
  },
});
