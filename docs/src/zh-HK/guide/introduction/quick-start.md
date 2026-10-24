# 快速開始

用 **Node.js 24.x** 同 **pnpm 12 或以上版本**。pnpm 嘅固定版本可以睇根目錄 `package.json`。

Clone 後入根目錄，按需要執行。install 會執行 workspace 嘅 `stub` 準備內部構建套件。

```bash
pnpm install
pnpm dev:vant
```

`pnpm dev` 互動揀一個套件，唔係全部啟動。預設 NutUI 5777、Vant 5778、Varlet 5779、TDesign 5783、Ionic 5784、Nitro 5320。`user / 123456`、`admin / 123456` 只係 Nitro 測試帳號。

預設英文，Member 支援中日切換，共用業務 Tab 同 AI 浮動入口。[服務模式](../essentials/server.md)要自行起兩個配套後端。

參考應用 `.env.example` 設定本機檔案，唔好覆寫已有值。新增 workspace 依賴後要 install 同重啟。Vant Port 佔用會報錯，請確認 terminal URL。

`pnpm build` 包括 workspace 同 docs，應用輸出喺 `apps/h5-<ui>/dist`。preview 唔包 Mock。文檔用 `pnpm dev:docs` / `pnpm build:docs`，CLI 用 `pnpm create-app`，參見[建立應用](../essentials/create-app.md)。

## VS Code

用 VS Code 開啟儲存庫根目錄，載入 `.vscode/settings.json` 同安裝工作區推薦擴充功能。用 Vue (Official) 編輯單檔組件、Oxc 格式化，並選用工作區嘅 TypeScript 版本查看型別診斷。安裝依賴同所需嘅 Playwright 瀏覽器後，可以喺測試面板執行 Vitest 同 Playwright。
