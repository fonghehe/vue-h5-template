import { fileURLToPath } from 'node:url';

import { defineConfig } from '@vh5/vite-config';

// https://vite.dev/config/
export default defineConfig(async () => {
  return {
    application: {
      uiLibrary: 'vant',
    },
    vite: {
      // Do not silently start a second instance while the browser still uses
      // the old server (and its cached workspace dependency resolution).
      server: { strictPort: true },
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('src', import.meta.url)),
          '#': fileURLToPath(new URL('types', import.meta.url)),
        },
      },
    },
  };
});
