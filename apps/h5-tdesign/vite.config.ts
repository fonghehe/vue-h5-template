import { fileURLToPath } from 'node:url';

import { defineConfig } from '@vh5/vite-config';

// https://vite.dev/config/
export default defineConfig(async () => {
  return {
    application: {
      pxToViewport: false,
      pwaOptions: { manifest: { theme_color: '#0052d9' } },
    },
    vite: {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('src', import.meta.url)),
        },
      },
    },
  };
});
