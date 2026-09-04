# 快速開始

使用 **Node.js 22.x 的 22.18+ 或 24.x**、**pnpm 11**（`pnpm@11.10.0`），以根 `package.json` 為準，舊 Node 20/pnpm 10 不再適用。

克隆後進入根目錄，按需執行。install 會執行 workspace 的 `stub` 以準備內部構建套件。

```bash
pnpm install
pnpm dev:vant
# alternatives: pnpm dev:nutui / pnpm dev:varlet
pnpm check
pnpm test:e2e
pnpm build:vant
pnpm -F @vh5/h5-vant preview
```

`pnpm dev` 互動選擇一個套件，不是全部啟動。預設 NutUI 5777、Vant 5778、Varlet 5779、Nitro 5320。測試帳號 `user / 123456`、`admin / 123456` 僅供 Nitro。

預設英文，Home/Member 支援中日切換，共用業務 Tab 與 AI 浮動入口。[服務模式](../essentials/server.md)需自行啟動兩個配套後端。

參照應用 `.env.example` 設定本機檔案，不要覆寫既有值。新增 workspace 依賴後需 install 並重啟。Vant 連接埠佔用時報錯，請確認終端 URL。

`pnpm build` 包含 workspace 與文檔，應用輸出在 `apps/h5-<ui>/dist`。preview 不含 Mock。文檔用 `pnpm dev:docs` / `pnpm build:docs`，CLI 用 `pnpm create-app`，參見[建立應用](../essentials/create-app.md)。
