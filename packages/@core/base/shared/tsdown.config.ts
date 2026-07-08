import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    'cache/index': 'src/cache/index.ts',
    'constants/index': 'src/constants/index.ts',
    store: 'src/store.ts',
    'utils/index': 'src/utils/index.ts',
  },
  format: ['esm'],
  outExtensions: () => ({
    dts: '.d.ts',
  }),
});
