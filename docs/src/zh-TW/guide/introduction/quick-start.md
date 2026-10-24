# 快速開始

使用 **Node.js 24.x** 和 **pnpm 12 或更新版本**。pnpm 的固定版本請見根目錄 `package.json`。

克隆後進入根目錄，按需執行。install 會執行 workspace 的 `stub` 以準備內部構建套件。

```bash
pnpm install
pnpm dev:vant
```

`pnpm dev` 互動選擇一個套件，不是全部啟動。預設 NutUI 5777、Vant 5778、Varlet 5779、TDesign 5783、Ionic 5784、Nitro 5320。測試帳號 `user / 123456`、`admin / 123456` 僅供 Nitro。

預設英文，Member 支援中日切換，共用業務 Tab 與 AI 浮動入口。[服務模式](../essentials/server.md)需自行啟動兩個配套後端。

參照應用 `.env.example` 設定本機檔案，不要覆寫既有值。新增 workspace 依賴後需 install 並重啟。Vant 連接埠佔用時報錯，請確認終端 URL。

`pnpm build` 包含 workspace 與文檔，應用輸出在 `apps/h5-<ui>/dist`。preview 不含 Mock。文檔用 `pnpm dev:docs` / `pnpm build:docs`，CLI 用 `pnpm create-app`，參見[建立應用](../essentials/create-app.md)。

## VS Code

在 VS Code 開啟儲存庫根目錄，載入 `.vscode/settings.json` 並安裝工作區推薦擴充功能。以 Vue (Official) 編輯單檔元件、Oxc 格式化，並選用工作區的 TypeScript 版本取得型別診斷。安裝相依套件及所需的 Playwright 瀏覽器後，可在測試面板執行 Vitest 和 Playwright。
