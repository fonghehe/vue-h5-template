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
      exclude: [
        '**/*.d.ts',
        '**/generated/**',
        '**/dist/**',
        '**/__tests__/**',
      ],
      include: [
        'packages/api-client/src/**/*.ts',
        'packages/ai-chat/src/**/*.ts',
        'packages/@core/base/shared/src/{cache,utils}/**/*.ts',
        'packages/@core/composables/src/**/*.ts',
        'packages/utils/src/helpers/**/*.ts',
        'packages/mobile-ui/src/{cart,queries}.ts',
        'packages/mobile-ui/src/{AiChatInput,ChatPage,MarkdownContent,CartPage,PaymentPage,SvgIcon}.vue',
        'apps/h5-vant/src/stores/user.ts',
        'apps/h5-vant/src/components/{auth/LoginForm,common/AppErrorBoundary}.vue',
        'apps/h5-nutui/src/locales/nutui-ja.ts',
        'apps/backend-mock/utils/{jwt-utils,product-locales}.ts',
        'internal/vite-config/src/backend-proxy.ts',
      ],
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
