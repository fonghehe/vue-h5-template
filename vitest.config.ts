import { fileURLToPath } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('apps/h5-vant/src', import.meta.url)),
    },
  },
  test: {
    coverage: {
      exclude: ['**/*.d.ts', '**/generated/**', '**/dist/**'],
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        branches: 60,
        functions: 60,
        lines: 60,
        statements: 60,
      },
    },
    environment: 'happy-dom',
    environmentOptions: {
      happyDOM: {
        settings: {
          disableJavaScriptFileLoading: true,
          handleDisabledFileLoadingAsSuccess: true,
        },
      },
    },
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
    setupFiles: ['./vitest.setup.ts'],
  },
});
