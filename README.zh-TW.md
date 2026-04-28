<div align="center">

<h1>Vue H5 Template</h1>

基於 Vue 3 + TypeScript + Turborepo 的行動端 H5 開發範本

[English](./README.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md) | 繁體中文 | [香港繁體](./README.zh-HK.md)

</div>

## 簡介

Vue H5 Template 是一個免費開源的行動端 H5 開發範本，基於 Turborepo Monorepo 架構，使用最新的 Vue 3、Vite、TypeScript 等主流技術棧，提供 NutUI、Vant、Varlet 三套 UI 框架的 H5 應用範本。

## 特性

- **Monorepo 架構**：基於 Turborepo + pnpm workspace，統一管理多個 H5 應用和共享套件
- **三套 UI 框架**：分別提供 NutUI、Vant、Varlet 版本，自由選擇適合的 UI 元件庫
- **TypeScript**：全面的 TypeScript 支援
- **Vite 建置**：基於 Vite 的建置設定，支援自動匯入和元件自動註冊
- **狀態管理**：Pinia + 持久化外掛，生產環境 AES 加密儲存
- **Mock 服務**：基於 Nitro 的 Mock 後端，提供登入認證、商品列表等介面
- **統一規範**：共享 ESLint / Prettier / Stylelint / Commitlint 設定
- **行動適配**：postcss-px-to-viewport 行動端適配方案
- **國際化**：支援簡體中文、繁體中文、英文、日文四種語言

## 技術棧

| 技術       | 版本  | 說明          |
| ---------- | ----- | ------------- |
| Vue 3      | 3.5   | 前端框架      |
| TypeScript | 6.0   | 型別安全      |
| Vite       | 8.0   | 建置工具      |
| Turborepo  | 2.9   | Monorepo 管理 |
| pnpm       | 10.27 | 套件管理器    |
| Pinia      | 3.0   | 狀態管理      |
| Vue Router | 5.0   | 路由          |
| Vue I18n   | 11.3  | 國際化        |
| Nitro      | 2.x   | Mock 伺服器   |
| NutUI      | 4.3   | UI 元件庫     |
| Vant       | 4.9   | UI 元件庫     |
| Varlet     | 3.12  | UI 元件庫     |
| VueUse     | 14.x  | 組合式工具集  |

## 環境要求

- [Node.js](https://nodejs.org/) >= 20.12.0
- [pnpm](https://pnpm.io/) >= 10.0.0
- [Git](https://git-scm.com/)

## 安裝使用

```bash
# 複製專案
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template

# 安裝相依套件
pnpm install

# 啟動開發（互動式選擇應用）
pnpm dev

# 啟動指定應用
pnpm dev:nutui    # NutUI 版
pnpm dev:vant     # Vant 版
pnpm dev:varlet   # Varlet 版
```

## 建置

```bash
# 建置所有應用
pnpm build

# 建置指定應用
pnpm build:nutui
pnpm build:vant
pnpm build:varlet

# 建置文件
pnpm build:docs
```

## 專案結構

```
vue-h5-template/
├── apps/
│   ├── backend-mock/       # Nitro Mock 服務
│   ├── h5-nutui/           # NutUI H5 應用（連接埠 5777）
│   ├── h5-vant/            # Vant H5 應用（連接埠 5778）
│   └── h5-varlet/          # Varlet H5 應用（連接埠 5779）
├── docs/                   # VitePress 文件站
├── internal/
│   ├── lint-configs/       # ESLint、Stylelint、Commitlint 設定
│   ├── node-utils/         # Node.js 工具
│   ├── tsconfig/           # 共享 TypeScript 設定
│   └── vite-config/        # 共享 Vite 設定
├── packages/
│   ├── @core/              # 核心套件（base、composables、preferences）
│   ├── locales/            # 國際化語言包
│   ├── stores/             # Pinia 狀態管理
│   ├── styles/             # 共享樣式
│   └── utils/              # 共享工具
└── scripts/                # 建置腳本和 CLI 工具
```

## 測試帳號

Mock 服務提供以下測試帳號：

| 使用者名稱 | 密碼   | 角色       |
| ---------- | ------ | ---------- |
| user       | 123456 | 一般使用者 |
| admin      | 123456 | 管理員     |

## 文件

- [線上文件](https://fonghehe.github.io/vue-h5-template/)

## 瀏覽器支援

支援現代瀏覽器和行動端瀏覽器，不支援 IE。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge ≥ 80                                                                                                                                                                                              | Firefox ≥ 78                                                                                                                                                                                                      | Chrome ≥ 80                                                                                                                                                                                                   | Safari ≥ 14                                                                                                                                                                                                   |

## 貢獻

歡迎參與貢獻，請參考 [貢獻指南](https://github.com/fonghehe/vue-h5-template/blob/main/CONTRIBUTING.md)。

Git 提交規範請遵循 [Conventional Commits](https://www.conventionalcommits.org/) 約定。

## License

[MIT](./LICENSE)
