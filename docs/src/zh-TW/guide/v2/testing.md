# 測試

## 型別檢查與開發啟動

`pnpm typecheck` 獨立檢查三個應用、共享執行套件（utils、stores、locales、core、UI/API/AI）、Mock 後端、Vite 設定和 workspace CLI。每個應用皆檢查原始碼及 `tsconfig.node.json`；`tsconfig.tools.json` 檢查根目錄 Vitest/Playwright 設定與 E2E。套件內測試也參與型別檢查。新增含原始碼的套件必須提供 `type-check` 腳本，才能被遞迴命令檢查。可用 `pnpm -F @vh5/utils type-check` 或 `pnpm -F @vh5/mobile-ui type-check` 局部驗證。

新增 workspace 套件或修改 exports 後，執行 `pnpm install` 並重新啟動開發服務。Vant 連接埠被佔用時會報錯，不會自動切換。如果舊服務顯示 `Failed to resolve import @vh5/mobile-ui/...`，停止該服務，重新執行 `pnpm dev:vant`，然後重新整理瀏覽器。E2E 也會直接開啟各路由，檢查模組 HTTP 錯誤與未捕捉的瀏覽器例外。

`pnpm test:e2e` 依序在 Vant、NutUI、Varlet 執行共同行為測試，涵蓋 Tab、英中日切換與保存、320px 觸控尺寸、AI 浮動入口、Query、登入、Mock API 及 401。測試連接埠為 15778/15777/15779，等待 Nitro API 就緒。可執行 `pnpm test:e2e:nutui` 或 `pnpm test:e2e:varlet` 單獨驗證。

Vitest + happy-dom 測試 utils/request/stores/composables，Vue Test Utils 測試 Login Form 與 Chat Input，Playwright 測試 Home、Login、Mock API、401 和 SSE。

`pnpm check` 執行 lint、typecheck、unit test、build；E2E 因需瀏覽器與本機服務而獨立執行，CI 會在 quality job 後運行。
測試涵蓋 Network、Visual Viewport、下拉更新生命週期、購物車數量與選取，以及應用層錯誤邊界。

## 核心回歸覆蓋

測試涵蓋 SSE 的 CRLF/多位元組 UTF-8 分塊、非法事件、fetch 標頭與失敗、逐塊響應式更新、停止/清空/重試競態、Axios 逾時/網路/HTTP 錯誤、Query 分頁與語言快取隔離、購物車數量和金額邊界、使用者工作階段，以及下拉更新失敗後復原。

`MarkdownContent` 使用檔案級 `jsdom` 環境及真實 DOMPurify，不模擬淨化，也不用 happy-dom 驗證淨化正確性；其他 DOM 元件測試仍用 happy-dom。jsdom 維持相容的 29.x，因為 30.x 的 Node 最低要求高於本專案。

`vitest.config.ts` 明確納入核心 API/AI、工具與 composables、部分行動元件/store 和後端工具，包含未被測試匯入的檔案。分支、函式、行、敘述的 60% 門檻只針對此範圍，不代表整站覆蓋率。執行 `pnpm test:coverage` 取得報告；`pnpm test packages/ai-chat/src/__tests__` 可單獨執行串流測試。CI 品質任務也執行覆蓋率檢查。
