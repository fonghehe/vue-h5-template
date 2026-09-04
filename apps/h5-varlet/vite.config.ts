import { fileURLToPath } from 'node:url';

import { defineConfig } from '@vh5/vite-config';

// https://vite.dev/config/
export default defineConfig(async () => {
  return {
    application: {
      uiLibrary: 'varlet',
    },
    vite: {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('src', import.meta.url)),
          '#': fileURLToPath(new URL('types', import.meta.url)),
        },
      },
    },
  };
});
