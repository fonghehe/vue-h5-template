# 介紹

Vue H5 Template 是一個基於 **Turborepo** 的 Vue 3 行動端 H5 開發範本 Monorepo 專案。

## 特性

- **Monorepo 管理** — 使用 Turborepo + pnpm workspace 統一管理多個應用和共享套件
- **三套 UI 框架** — 提供 NutUI、Vant、Varlet 三個版本，按需選用
- **TypeScript** — 全面 TypeScript 支援，配合 unplugin-vue-router 實現類型安全的檔案路由
- **Vite** — 基於 Vite 8 構建，支援自動導入、組件自動註冊
- **UnoCSS** — 原子化 CSS 引擎，全局使用 utility-first 風格寫樣式
- **Pinia** — 狀態管理 + 持久化（生產環境 AES 加密）
- **Mock 後端** — Nitro 基的 Mock 服务器，提供登入認證和商品 API
- **Eruda** — 內置流動端除錯控制台（非生產環境儲就開啟）
- **統一規範** — ESLint / Prettier / Stylelint / Commitlint 的設定共享
- **動態標題** — 路由切換時自動更新頁面標題
- **行動端適配** — postcss-mobile-forever 變换 viewport 尺寸（設計稿寬 375px，最大顯示寬 600px）
- **國際化** — 支援簡體中文、繁體中文、英文、日文四種語言

## 技術棧

| 技術                | 版本  | 說明             |
| ------------------- | ----- | ---------------- |
| Vue 3               | 3.5   | 前端框架         |
| TypeScript          | 6.0   | 型別安全         |
| Vite                | 8.0   | 建置工具         |
| UnoCSS              | 66.x  | 原子化 CSS 引擎  |
| Turborepo           | 2.9   | Monorepo 管理    |
| pnpm                | 10.27 | 套件管理器       |
| Pinia               | 3.0   | 狀態管理         |
| Vue Router          | 5.0   | 路由管理         |
| unplugin-vue-router | 0.19  | 類型安全檔案路由 |
| Vue I18n            | 11.3  | 國際化           |
| Nitro               | 2.x   | Mock 伺服端      |
| NutUI               | 4.3   | UI 元件庫        |
| Vant                | 4.9   | UI 元件庫        |
| Varlet              | 3.12  | UI 元件庫        |
| VueUse              | 14.x  | 組合式工具集     |
| Eruda               | 3.x   | 流動端除錯控制台 |
