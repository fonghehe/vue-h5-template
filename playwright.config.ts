import { defineConfig, devices } from '@playwright/test';

const app = process.env.E2E_APP ?? 'vant';
const port = new Map([
  ['nutui', 15_777],
  ['vant', 15_778],
  ['varlet', 15_779],
]).get(app);
if (!port) throw new Error('E2E_APP must be vant, nutui or varlet');
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  expect: { timeout: 8000 },
  fullyParallel: true,
  outputDir: `test-results/${app}`,
  reporter: process.env.CI ? 'github' : 'list',
  retries: process.env.CI ? 2 : 0,
  testDir: './e2e',
  testMatch: [
    'mobile-template.spec.ts',
    'app-parity.spec.ts',
    ...(app === 'nutui' ? ['nutui-navigation.spec.ts'] : []),
  ],
  use: {
    ...devices['iPhone 13'],
    baseURL,
    defaultBrowserType: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  webServer: {
    command: `pnpm -F @vh5/h5-${app} exec vite --mode development --port ${port} --strictPort`,
    reuseExistingServer: false,
    timeout: 120_000,
    url: `${baseURL}/api/product/list`,
  },
});
