# 介紹

Vue H5 Template 是一個基於 **Turborepo** 的 Vue 3 行動端 H5 開發範本 Monorepo 專案。

## 特性

- **Monorepo 管理** — 使用 Turborepo + pnpm workspace 統一管理多個應用和共享套件
- **三套 UI 框架** — 提供 NutUI、Vant、Varlet 三個版本，按需選用
- **TypeScript** — 全面 TypeScript 支援
- **Vite** — 基於 Vite 8 建置，支援自動匯入、元件自動註冊
- **Pinia** — 狀態管理 + 持久化（生產環境 AES 加密）
- **Mock 後端** — 基於 Nitro 的 Mock 服務，提供登入認證、商品介面
- **統一規範** — 共享 ESLint / Prettier / Stylelint / Commitlint 設定
- **動態標題** — 路由切換自動更新頁面標題
- **px-to-viewport** — 行動端適配方案
- **國際化** — 支援簡體中文、繁體中文、英文、日文四種語言

## 技術棧

| 技術                  | 版本 | 說明          |
| --------------------- | ---- | ------------- |
| Vue 3                 | 3.5  | 前端框架      |
| TypeScript            | 6.0  | 型別安全      |
| Vite                  | 8.0  | 建置工具      |
| Turborepo             | 2.9  | Monorepo 管理 |
| pnpm                  | 10.27| 套件管理器    |
| Pinia                 | 3.0  | 狀態管理      |
| Vue Router            | 5.0  | 路由管理      |
| Vue I18n              | 11.3 | 國際化        |
| Nitro                 | 2.x  | Mock 伺服端   |
| NutUI                 | 4.3  | UI 元件庫     |
| Vant                  | 4.9  | UI 元件庫     |
| Varlet                | 3.12 | UI 元件庫     |
| VueUse                | 14.x | 組合式工具集  |
