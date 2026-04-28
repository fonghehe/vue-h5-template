# Vite 設定套件 (@vh5/vite-config)

共享 Vite 設定產生器。

## 功能

- 自動匯入元件和 API（unplugin-auto-import / unplugin-vue-components）
- `postcss-px-to-viewport-8-plugin` 行動端適配
- PWA 支援（vite-plugin-pwa）
- Nitro Mock 代理設定
- 壓縮外掛（vite-plugin-compression）

## 使用

```ts
// vite.config.mts
import { defineConfig } from "@vh5/vite-config";

export default defineConfig(async () => ({
  application: {
    uiLibrary: "nut", // 'nut' | 'vant' | 'varlet'
  },
  vite: {
    server: { port: 3000 },
  },
}));
```
