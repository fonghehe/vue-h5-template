import type { UserConfig } from 'vite';

async function getCommonConfig(): Promise<UserConfig> {
  return {
    resolve: {
      // pnpm peer variants must share Router injection keys with the host app.
      dedupe: ['vue-router'],
    },
    build: {
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      sourcemap: false,
    },
  };
}

export { getCommonConfig };
