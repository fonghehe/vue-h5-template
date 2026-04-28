import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => {
  return {
    vite: {
      publicDir: 'src/scss-bem',
    },
  };
});
