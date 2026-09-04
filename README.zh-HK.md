<div align="center">

<h1>Vue H5 Template</h1>

基於 Vue 3 + TypeScript + Turborepo 嘅流動端 H5 開發模板

[English](./README.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md) | [繁體中文(台)](./README.zh-TW.md) | [繁體中文(港)]

</div>

## 一致嘅流動體驗

三套 App 共用 Home / List / Member / Examples、商品詳情同購物車、Query、API 範例及串流對話。各自保留原生導覽、元件展示同主題色。

介面預設英文，Member 可以切換簡體中文、日文，並保存選擇，同步標題、文案同 Mock 商品語言。AI 浮動按鈕放喺 Tab 上面，會員、輸入同結帳頁會隱藏。商品卡片喺 320px 螢幕仍保留實際 44px 觸控尺寸。

三端都支援 Mock 同獨立 AI/Business 服務。`pnpm test:e2e` 驗證三套 App。參見 [UI 架構](docs/src/zh-HK/guide/v2/ui-framework.md)。

## 簡介

Vue H5 Template 係一個免費開源嘅流動端 H5 開發模板，基於 Turborepo Monorepo 架構，使用最新嘅 Vue 3、Vite、TypeScript 等主流技術棧，提供 NutUI、Vant、Varlet 三套 UI 框架嘅 H5 應用模板。

## 特性

- **Monorepo 架構**：基於 Turborepo + pnpm workspace，統一管理多個 H5 應用同共享套件
- **三套 UI 框架**：分別提供 NutUI、Vant、Varlet 版本，自由揀選適合嘅 UI 組件庫
- **獨立視覺系統**：Vant 藍、NutUI 紅、Varlet 紫各自使用完整 Design Token，避免跨 Framework 撈亂色彩
- **Type-safe 基建**：Strict TypeScript、明確 Lazy Route、OpenAPI Generated Types 同統一 API Error
- **Streaming AI Chat**：Vendor-neutral SSE/ReadableStream、AbortController 同安全 Markdown
- **Server State**：TanStack Vue Query 提供 Cache、Mutation、Pagination、Infinite Query
- **真實 Mobile Pattern**：Error Boundary、Offline、Visual Viewport、Pull-to-refresh、Web Share、Clipboard 同持久化購物車
- **Vite 構建**：基於 Vite 嘎構建配置，支援自動導入同組件自動註冊
- **UnoCSS**：原子化 CSS 引擎，全局使用 utility-first 風格寫樣式
- **狀態管理**：Pinia + 持久化插件，生產環境 AES 加密儲存
- **Mock 服务**：基於 Nitro 嘎 Mock 後端，提供登入認證、商品列表等接口
- **Eruda**：內置流動端除錯控制台，僅在非生產環境開啟
- **統一規範**：共享 ESLint / OxLint / Stylelint / Oxfmt / Commitlint 配置
- **流動端適配**：postcss-mobile-forever 流動端適配方案（設計稿寬 375px，最大顯示寬 600px）
- **國際化**：支援簡體中文、繁體中文、英文、日文四種語言

## 技術棧

| 技術                | 版本  | 說明               |
| ------------------- | ----- | ------------------ |
| Vue 3               | 3.5   | 前端框架           |
| TypeScript          | 6.0   | 類型安全           |
| Vite                | 8.1   | 構建工具           |
| UnoCSS              | 66.x  | 原子化 CSS 引擎    |
| Turborepo           | 2.10   | Monorepo 管理      |
| pnpm                | 11.10 | 套件管理器         |
| Pinia               | 4.0   | 狀態管理           |
| Vue Router          | 5.0   | 路由               |
| TanStack Vue Query  | 5.x   | Server State 同 Cache |
| Axios               | 1.x   | Type-safe REST Transport |
| Vue I18n            | 11.4  | 國際化             |
| Nitro               | 2.x   | Mock 伺服器        |
| NutUI               | 4.3   | UI 組件庫          |
| Vant                | 4.10   | UI 組件庫          |
| Varlet              | 3.19  | UI 組件庫          |
| VueUse              | 14.x  | 組合式工具集       |
| Eruda               | 3.x   | 流動端除錯控制台   |

## 環境要求

- [Node.js](https://nodejs.org/) >= 22.18.0
- [pnpm](https://pnpm.io/) >= 11.0.0
- [Git](https://git-scm.com/)

## 安裝使用

```bash
# 複製項目
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template

# 安裝依賴
pnpm install

# 啟動開發（互動式揀選應用）
pnpm dev

# 啟動指定應用
pnpm dev:nutui    # NutUI 版
pnpm dev:vant     # Vant 版
pnpm dev:varlet   # Varlet 版
```

開發環境預設使用內置 Nitro Mock。需要連接配套嘅 `vue-h5-template-business-service`（`:8002`）同 `vue-h5-template-ai-service`（`:8001`）時，先啟動兩個後端，再執行 `pnpm dev:services:vant`、`pnpm dev:services:nutui` 或 `pnpm dev:services:varlet`。代理規則同環境變數請參閱[Request 架構](https://fonghehe.github.io/vue-h5-template/zh-HK/guide/v2/request)。

## 構建

```bash
# 構建所有應用
pnpm build

# 構建指定應用
pnpm build:nutui
pnpm build:vant
pnpm build:varlet

# 構建文檔
pnpm build:docs
```

## 項目結構

```
vue-h5-template/
├── apps/
│   ├── backend-mock/       # Nitro Mock 服務
│   ├── h5-nutui/           # NutUI H5 應用（端口 5777）
│   ├── h5-vant/            # Vant H5 應用（端口 5778）
│   └── h5-varlet/          # Varlet H5 應用（端口 5779）
├── docs/                   # VitePress 文檔站
├── internal/
│   ├── lint-configs/       # ESLint、OxLint、Stylelint、Oxfmt、Commitlint 配置
│   ├── node-utils/         # Node.js 工具
│   ├── tsconfig/           # 共享 TypeScript 配置
│   └── vite-config/        # 共享 Vite 配置
├── packages/
│   ├── @core/              # 核心套件（base/shared、design、typings、composables）
│   ├── locales/            # 國際化語言包
│   ├── stores/             # Pinia 狀態管理
│   ├── styles/             # 共享樣式
│   └── utils/              # 共享工具
└── scripts/                # 構建腳本同 CLI 工具
```

## 測試賬號

Mock 服務提供以下測試賬號：

| 用戶名 | 密碼   | 角色     |
| ------ | ------ | -------- |
| user   | 123456 | 普通用戶 |
| admin  | 123456 | 管理員   |

## 文檔

- [線上文檔](https://fonghehe.github.io/vue-h5-template/)

## 瀏覽器支援

Production target 為 Chrome / Android WebView 111+ 同 Safari / iOS WebView 16.4+，支援相同核心嘅近期 WeChat 同 WeCom WebView；唔支援 IE 同舊版 Android WebView。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --- | --- | --- | --- |
| Edge ≥ 111 | Firefox ≥ 115 | Chrome ≥ 111 | Safari ≥ 16.4 |

## 貢獻

歡迎參與貢獻，請參考 [貢獻指南](https://github.com/fonghehe/vue-h5-template/blob/main/CONTRIBUTING.md)。

Git 提交規範請遵循 [Conventional Commits](https://www.conventionalcommits.org/) 約定。

## License

[MIT](./LICENSE)
