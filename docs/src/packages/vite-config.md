# Vite Config

`internal/vite-config` provides a shared Vite configuration generator.

## Usage

```ts
import { defineConfig } from "@vh5/vite-config";

export default defineConfig(async () => ({
  application: {
    uiLibrary: "nut", // 'nut' | 'vant' | 'varlet'
  },
  vite: {
    // Custom Vite config
  },
}));
```

## Built-in Plugins

| Plugin                     | Description                   |
| -------------------------- | ----------------------------- |
| `@vitejs/plugin-vue`       | Vue 3 SFC support             |
| `@vitejs/plugin-vue-jsx`   | JSX/TSX support               |
| `unplugin-auto-import`     | Auto-import APIs              |
| `unplugin-vue-components`  | Auto-register components      |
| `unplugin-vue-router`      | Type-safe file-based routing  |
| `unocss`                   | Atomic CSS engine             |
| `vite-plugin-eruda-pro`    | Mobile debug console (dev)    |
| `vite-plugin-vue-devtools` | Vue DevTools                  |
| `postcss-mobile-forever`   | Mobile viewport adaptation    |
| `vite-plugin-html`         | HTML template injection       |
| `vite-plugin-compression`  | Gzip/Brotli compression       |
| `vite-plugin-pwa`          | PWA support                   |
| `nitro-mock`               | Nitro mock server integration |

## Environment Variables

Configure via `.env.*` files:

| Variable                  | Description           |
| ------------------------- | --------------------- |
| `VITE_PORT`               | Dev server port       |
| `VITE_BASE`               | Base path             |
| `VITE_GLOB_API_URL`       | API request prefix    |
| `VITE_NITRO_MOCK`         | Enable mock server    |
| `VITE_DEVTOOLS`           | Enable DevTools       |
| `VITE_INJECT_APP_LOADING` | Inject global loading |
