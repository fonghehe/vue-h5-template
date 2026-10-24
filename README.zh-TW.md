# Vue H5 Template

以 Vue 3、TypeScript 和 Turborepo 為基礎的行動網頁開發範本。

[English](./README.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md) | 繁體中文（台） | [繁體中文（港）](./README.zh-HK.md)

## 專案功能

Vant、NutUI、Varlet、TDesign Mobile Vue 和 Ionic Vue 是五個獨立建置的應用程式。它們共用首頁、列表、會員與範例分頁，以及商品詳情、收藏、本機購物車和結帳示範。各應用程式保有自己的導覽、主題與元件範例。

- **資料與路由**。採用明確宣告的延遲載入路由、OpenAPI 產生的型別與共用 Axios 用戶端。TanStack Vue Query 管理伺服器資料，Pinia 管理登入狀態和本機購物車。
- **串流聊天**。SSE 用戶端支援停止、重試、重新產生回覆和經過消毒的 Markdown。模型設定與憑證由配套後端管理。
- **行動網頁互動**。支援安全區域、隨鍵盤調整的聊天輸入、下拉重新整理、離線提示與選用的 PWA。
- **語言**。應用程式預設為英文，可在會員頁切換英文、簡體中文或日文。專案文件提供五種語言版本。

## 在本機啟動

使用 **Node.js 24.x**，以及 **pnpm 12 或更新版本**。根目錄清單固定了 pnpm 版本。

```bash
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template
pnpm install
```

選擇一個應用程式啟動，也可用 `pnpm dev` 互動選擇工作區套件。

```bash
pnpm dev:vant    # 5778
pnpm dev:nutui   # 5777
pnpm dev:varlet  # 5779
pnpm dev:tdesign # 5783
pnpm dev:ionic   # 5784
```

開發指令會啟動或沿用 **5320** 連接埠的 Nitro Mock。測試帳號為 `user / 123456` 和 `admin / 123456`。若要接入獨立的業務服務（8002）與 AI 服務（8001），先啟動兩個後端，再執行 `pnpm dev:services:<ui>`。

## 建置與驗證

| 用途 | 指令 |
| --- | --- |
| 本機文件 | `pnpm dev:docs` |
| 建置單一應用程式 | `pnpm build:vant` / `pnpm build:nutui` / `pnpm build:varlet` / `pnpm build:tdesign` / `pnpm build:ionic` |
| 建置工作區 / 僅建置文件 | `pnpm build` / `pnpm build:docs` |
| 程式碼、型別、單元測試與建置 | `pnpm check` |
| 五個應用程式的瀏覽器測試 | `pnpm test:e2e` |
| 重新產生 API 型別 | `pnpm api:generate` |

應用程式輸出至 `apps/h5-<ui>/dist`，建置目標為 Chrome/Android WebView 111+ 和 Safari/iOS WebView 16.4+。正式環境需設定 SPA 回退及兩個後端的路由。

## 儲存庫結構

| 路徑 | 職責 |
| --- | --- |
| `apps/h5-{vant,nutui,varlet,tdesign,ionic}` | 應用程式外殼、路由表和 UI 轉接層 |
| `packages/mobile-ui` | 共用業務頁面與查詢 hooks |
| `packages/{api-client,ai-chat}` | REST 契約與串流用戶端 |
| `packages/{locales,stores,styles}` | 共用翻譯、用戶端狀態與主題樣式 |
| `apps/backend-mock` | 開發用 Nitro Mock |
| `internal` | 共用建置、Lint 與 TypeScript 設定 |
| `openapi`, `e2e`, `docs` | API 契約、瀏覽器測試與專案文件 |

## 文件

[線上文件](https://fonghehe.github.io/vue-h5-template/zh-TW/) · [後端模式](./docs/src/zh-TW/guide/essentials/server.md) · [部署](./docs/src/zh-TW/guide/essentials/build.md) · [貢獻指南](./CONTRIBUTING.md)

[MIT](./LICENSE)
