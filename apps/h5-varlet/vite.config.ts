import { fileURLToPath } from 'node:url';

import { defineConfig } from '@vh5/vite-config';

// https://vite.dev/config/
export default defineConfig(async () => {
  return {
    application: {
      uiLibrary: 'varlet',
    },
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            target: 'http://localhost:5320',
            ws: true,
          },
        },
      },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('src', import.meta.url)),
          '#': fileURLToPath(new URL('types', import.meta.url)),
        },
      },
    },
  };
});
