# Vite Config

`internal/vite-config` provides a shared Vite configuration generator.

## Usage

```ts
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: {
    uiLibrary: 'nut', // 'nut' | 'vant' | 'varlet'
  },
  vite: { /* custom config */ },
}));
```

## Built-in Plugins

| Plugin                     | Description          |
| -------------------------- | -------------------- |
| `@vitejs/plugin-vue`       | Vue 3 SFC support    |
| `@vitejs/plugin-vue-jsx`   | JSX/TSX support      |
| `unplugin-auto-import`     | Auto import APIs     |
| `unplugin-vue-components`  | Auto register components |
| `vite-plugin-vue-devtools` | Vue DevTools         |
| `postcss-px-to-viewport`   | px to viewport       |
| `vite-plugin-html`         | HTML template inject |
| `vite-plugin-compression`  | Gzip/Brotli compress |
| `vite-plugin-pwa`          | PWA support          |
