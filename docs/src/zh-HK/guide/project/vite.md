# Vite 設定

`internal/vite-config` 提供共享的 Vite 設定產生器。

## 使用

```ts
import { defineConfig } from "@vh5/vite-config";

export default defineConfig(async () => ({
  application: {
    uiLibrary: "nut", // 'nut' | 'vant' | 'varlet'
  },
  vite: {
    // 自訂 Vite 設定
  },
}));
```

## 內置外掛件

| 外掛件                     | 說明                       |
| -------------------------- | -------------------------- |
| `@vitejs/plugin-vue`       | Vue 3 SFC 支援             |
| `@vitejs/plugin-vue-jsx`   | JSX/TSX 支援               |
| `unplugin-auto-import`     | API 自動導入               |
| `unplugin-vue-components`  | 組件自動註冊               |
| `unplugin-vue-router`      | 類型安全的檔案路由         |
| `unocss`                   | 原子化 CSS 引擎            |
| `vite-plugin-eruda-pro`    | 流動端除錯控制台（開發時） |
| `vite-plugin-vue-devtools` | Vue DevTools               |
| `postcss-mobile-forever`   | 行動端 viewport 適配       |
| `vite-plugin-html`         | HTML 模板注入              |
| `vite-plugin-compression`  | Gzip/Brotli 壓縮           |
| `vite-plugin-pwa`          | PWA 支援                   |
| `nitro-mock`               | Nitro Mock 伺服器整合      |
