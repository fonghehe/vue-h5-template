# Vue H5 Template

以 Vue 3、TypeScript 同 Turborepo 為基礎嘅流動網頁開發範本。

[English](./README.md) | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md) | [繁體中文（台）](./README.zh-TW.md) | 繁體中文（港）

## 專案功能

Vant、NutUI、Varlet、TDesign Mobile Vue 同 Ionic Vue 係五個獨立構建嘅應用程式。佢哋共用首頁、列表、會員同示例分頁，亦共用商品詳情、收藏、本機購物車同結帳示範。每個應用程式有自己嘅導覽、主題同組件示例。

- **資料同路由**。使用明確宣告嘅懶載入路由、OpenAPI 產生嘅型別同共用 Axios 客戶端。TanStack Vue Query 管理伺服器資料，Pinia 管理登入狀態同本機購物車。
- **串流聊天**。SSE 客戶端支援停止、重試、重新生成回覆同經過清理嘅 Markdown。模型設定同憑證由配套後端管理。
- **流動網頁互動**。支援安全區域、隨鍵盤調整嘅聊天輸入、下拉更新、離線提示同可選 PWA。
- **語言**。應用程式預設英文，可以喺會員頁切換英文、簡體中文同日文。專案文件有五種語言版本。

## 本機啟動

使用 **Node.js 24.x**，以及 **pnpm 12 或以上**。根目錄清單固定咗 pnpm 版本。

```bash
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template
pnpm install
```

揀一個應用程式啟動，亦可以用 `pnpm dev` 互動揀工作區套件。

```bash
pnpm dev:vant    # 5778
pnpm dev:nutui   # 5777
pnpm dev:varlet  # 5779
pnpm dev:tdesign # 5783
pnpm dev:ionic   # 5784
```

開發指令會啟動或者沿用 **5320** 連接埠嘅 Nitro Mock。測試帳戶係 `user / 123456` 同 `admin / 123456`。要接駁獨立業務服務（8002）同 AI 服務（8001），先開兩個後端，再執行 `pnpm dev:services:<ui>`。

## 構建同驗證

| 用途 | 指令 |
| --- | --- |
| 本機文件 | `pnpm dev:docs` |
| 構建單一應用程式 | `pnpm build:vant` / `pnpm build:nutui` / `pnpm build:varlet` / `pnpm build:tdesign` / `pnpm build:ionic` |
| 構建工作區 / 只構建文件 | `pnpm build` / `pnpm build:docs` |
| 程式碼、型別、單元測試同構建 | `pnpm check` |
| 五個應用程式嘅瀏覽器測試 | `pnpm test:e2e` |
| 重新生成 API 型別 | `pnpm api:generate` |

應用程式輸出去 `apps/h5-<ui>/dist`，構建目標係 Chrome/Android WebView 111+ 同 Safari/iOS WebView 16.4+。正式環境需要設定 SPA 回退同兩個後端嘅路由。

## 儲存庫結構

| 路徑 | 職責 |
| --- | --- |
| `apps/h5-{vant,nutui,varlet,tdesign,ionic}` | 應用程式外殼、路由表同 UI 轉接層 |
| `packages/mobile-ui` | 共用業務頁面同查詢 hooks |
| `packages/{api-client,ai-chat}` | REST 契約同串流客戶端 |
| `packages/{locales,stores,styles}` | 共用翻譯、客戶端狀態同主題樣式 |
| `apps/backend-mock` | 開發用 Nitro Mock |
| `internal` | 共用構建、Lint 同 TypeScript 設定 |
| `openapi`, `e2e`, `docs` | API 契約、瀏覽器測試同專案文件 |

## 文件

[網上文件](https://fonghehe.github.io/vue-h5-template/zh-HK/) · [後端模式](./docs/src/zh-HK/guide/essentials/server.md) · [部署](./docs/src/zh-HK/guide/essentials/build.md) · [貢獻指南](./CONTRIBUTING.md)

[MIT](./LICENSE)
