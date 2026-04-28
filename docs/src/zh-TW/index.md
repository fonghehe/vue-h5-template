---
layout: home
sidebar: false

hero:
  name: Vue H5 Template
  text: Vue 3 行動端 H5 開發範本
  tagline: 基於 Turborepo + Vue 3 + TypeScript 的行動端 Monorepo 範本，開箱即用，支援 NutUI / Vant / Varlet 三套 UI
  actions:
    - theme: brand
      text: 快速開始 ->
      link: /zh-TW/guide/introduction/quick-start
    - theme: alt
      text: 專案介紹
      link: /zh-TW/guide/introduction/about
    - theme: alt
      text: 在 GitHub 檢視
      link: https://github.com/fonghehe/vue-h5-template

features:
  - icon: 🏗️
    title: Monorepo 架構
    details: 基於 Turborepo + pnpm workspace，統一管理多個 H5 應用和共享套件，建置快取加速開發。
    link: /zh-TW/guide/project/dir
    linkText: 目錄結構
  - icon: 📱
    title: 三套 UI 框架
    details: 分別提供 NutUI、Vant、Varlet 版本，自由選擇適合的行動端 UI 元件庫。
    link: /zh-TW/apps/nutui
    linkText: 檢視應用
  - icon: 🔧
    title: 統一工程設定
    details: 共享 ESLint、Prettier、Stylelint、TypeScript 設定，減少重複，保持團隊規範一致。
    link: /zh-TW/guide/project/standard
    linkText: 程式碼規範
  - icon: 🗄️
    title: Nitro Mock 服務
    details: 內建 Nitro Mock 後端，提供登入認證、商品列表等完整介面模擬，開發無需等待後端。
    link: /zh-TW/apps/backend-mock
    linkText: Mock 文件
  - icon: 📦
    title: 狀態管理
    details: Pinia + 持久化外掛，生產環境 AES 加密儲存，多 Tab 狀態同步。
    link: /zh-TW/packages/stores
    linkText: Stores 文件
  - icon: ⚡
    title: Vite 建置
    details: 共享 Vite 設定，支援自動匯入、px-to-viewport 行動適配、PWA 等開箱即用。
    link: /zh-TW/guide/project/vite
    linkText: Vite 設定
  - icon: 🌐
    title: 國際化
    details: 內建 vue-i18n，支援簡體中文、繁體中文、英文、日文四語言，共享 locales 套件跨應用複用。
    link: /zh-TW/guide/essentials/locale
    linkText: 國際化文件
  - icon: 🔒
    title: TypeScript
    details: 全量 TypeScript 覆蓋，嚴格型別檢查，完整的型別宣告，提升程式碼可維護性。
    link: /zh-TW/guide/introduction/about
    linkText: 了解更多
---
