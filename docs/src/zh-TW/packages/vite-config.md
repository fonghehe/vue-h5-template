# Vite 設定套件 (@vh5/vite-config)

共享 Vite 設定產生器。

## 功能

- 自動匯入元件和 API（unplugin-auto-import / unplugin-vue-components）
- 類型安全的檔案路由（unplugin-vue-router）
- UnoCSS 原子化 CSS 引擎
- `postcss-mobile-forever` 行動端適配
- Eruda 流動端除錯控制台（開發環境就開啟）
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

## 內置外掛件

| 外掛件                     | 說明                       |
| -------------------------- | -------------------------- |
| `@vitejs/plugin-vue`       | Vue 3 SFC 支援             |
| `@vitejs/plugin-vue-jsx`   | JSX/TSX 支援               |
| `unplugin-auto-import`     | API 自動匯入               |
| `unplugin-vue-components`  | 元件自動註冊               |
| `unplugin-vue-router`      | 類型安全的檔案路由         |
| `unocss`                   | 原子化 CSS 引擎            |
| `vite-plugin-eruda-pro`    | 行動端除錯控制台（開發時） |
| `vite-plugin-vue-devtools` | Vue DevTools               |
| `postcss-mobile-forever`   | 行動端 viewport 適配       |
| `vite-plugin-html`         | HTML 模板注入              |
| `vite-plugin-compression`  | Gzip/Brotli 壓縮           |
| `vite-plugin-pwa`          | PWA 支援                   |
| `nitro-mock`               | Nitro Mock 伺服器整合      |
