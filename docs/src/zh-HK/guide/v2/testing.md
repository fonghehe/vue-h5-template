# Testing

## 型別檢查同開發啟動

`pnpm typecheck` 會獨立檢查三個應用、共享執行套件（utils、stores、locales、core、UI/API/AI）、Mock 後端、Vite 設定同 workspace CLI。每個應用都檢查源碼同 `tsconfig.node.json`；`tsconfig.tools.json` 檢查根目錄 Vitest/Playwright 設定同 E2E。套件內測試亦參與型別檢查。新增有源碼嘅套件要提供 `type-check` script，先會被遞迴命令檢查。可用 `pnpm -F @vh5/utils type-check` 或 `pnpm -F @vh5/mobile-ui type-check` 局部驗證。

新增 workspace 套件或修改 exports 後，執行 `pnpm install` 並重新啟動開發服務。Vant Port 被佔用時會報錯，唔會自動切換。如果舊服務顯示 `Failed to resolve import @vh5/mobile-ui/...`，停止該服務，重新執行 `pnpm dev:vant`，再重新整理瀏覽器。E2E 亦會直接開啟各路由，檢查模組 HTTP 錯誤同未捕捉嘅瀏覽器例外。

`pnpm test:e2e` 依次喺 Vant、NutUI、Varlet 執行共同行為測試，涵蓋 Tab、英中日切換同保存、320px 觸控尺寸、AI 浮動入口、Query、登入、Mock API 同 401。測試 Port 為 15778/15777/15779，等 Nitro API 就緒。可用 `pnpm test:e2e:nutui` 或 `pnpm test:e2e:varlet` 單獨驗證。

Vitest + happy-dom 測 utils/request/stores/composables，Vue Test Utils 測 Login Form 同 Chat Input，Playwright 測 Home、Login、Mock API、401 同 SSE。

`pnpm check` 包含 lint、typecheck、unit test、build；E2E 因為要 Browser 同 Local Server 而獨立執行，CI 會喺 quality job 之後運行。
測試涵蓋 Network、Visual Viewport、Pull-to-refresh 生命週期、購物車數量同選取，以及應用層 Error Boundary。

## 核心回歸覆蓋

測試涵蓋 SSE 嘅 CRLF/多位元組 UTF-8 分塊、非法事件、fetch header 同失敗、逐塊響應式更新、停止/清空/重試競態、Axios timeout/網絡/HTTP error、Query 分頁同語言 cache 隔離、購物車數量同金額邊界、用戶 session，以及下拉更新失敗後恢復。

`MarkdownContent` 用檔案級 `jsdom` 環境同真實 DOMPurify，唔 Mock 淨化，亦唔用 happy-dom 判斷淨化有冇生效；其他 DOM component tests 照用 happy-dom。jsdom 保持兼容嘅 29.x，因為 30.x 嘅 Node 最低要求高過本項目。

`vitest.config.ts` 明確包含核心 API/AI、工具同 composables、部分 mobile components/store 同後端工具，包括未被測試 import 嘅檔案。分支、函數、行、語句嘅 60% 門檻只針對呢個範圍，唔代表成個網站覆蓋率。用 `pnpm test:coverage` 睇報告；`pnpm test packages/ai-chat/src/__tests__` 可單獨跑串流測試。CI quality job 亦會檢查覆蓋率。
