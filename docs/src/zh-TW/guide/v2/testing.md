# 測試


`pnpm typecheck` 也會透過 `@vh5/docs` 檢查 VitePress 設定。個別驗證可執行 `pnpm -F @vh5/docs type-check`；文件建置成功不代表型別檢查通過。

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

## 新增功能回歸檢查

API 測試涵蓋 ID、本文、取消訊號、語言轉換、AI base URL 與錯誤傳遞；元件測試涵蓋未登入、收藏與取消、讀取重試、寫入失敗與切換帳號後的舊回應。聊天測試涵蓋遠端建議、本機回退及卸載時中止串流。每個測試建立並清理獨立 QueryClient。

```bash
pnpm test packages/api-client/src/__tests__/features.test.ts packages/mobile-ui/src/__tests__/favorite-button.test.ts packages/mobile-ui/src/__tests__/chat-page.test.ts
pnpm test:coverage
pnpm test:e2e
```

Playwright 驗證重新整理後保留收藏、取消、遠端建議及失敗後的本機回退。Query 收藏測試先登入；串流測試輸入固定問題，不依賴建議文案。這些是開發 Mock 檢查，PostgreSQL／Redis 整合需另外設定環境。

## 瀏覽器復原與正式環境預覽

先執行 `pnpm build` 建置三套應用。設定 `E2E_PREVIEW=1` 後，僅在 Vite preview 執行瀏覽器行為測試，正式版本仍關閉 Nitro Mock。涵蓋延遲載入失敗及復原、320×640、844×390、1280×800 版面、鍵盤操作和聊天視口縮小復原。所需回應由瀏覽器測試攔截提供，另直接請求預覽伺服器，確認沒有開發商品 API。

```bash
E2E_APP=vant E2E_PREVIEW=1 pnpm exec playwright test
E2E_APP=nutui E2E_PREVIEW=1 E2E_BROWSER=webkit pnpm exec playwright test
E2E_APP=varlet E2E_PREVIEW=1 E2E_BROWSER=webkit pnpm exec playwright test
```

`E2E_BROWSER=webkit` 選擇 WebKit，預設 Chromium；`E2E_CHANNEL=chrome` 可選擇已安裝 Chrome。透過 `E2E_APP=vant`、`nutui`、`varlet` 分別執行。這些是瀏覽器模擬：調整視口不能證明實際 iOS/Android 鍵盤、裝置安全區或內嵌 WebView 行為。

`RouteLoadError` 單獨處理 Router 導航載入異常，透過事件停止應用層進度列，保留目前頁面並提供失敗目標的整頁重新載入。導航成功後提示消失，元件卸載時移除兩個 Router 鉤子。

共用 Vite 設定從宿主應用統一解析 `vue-router`。pnpm 的不同 peer 變體可能打包出不同的 Router 注入鍵，導致開發正常而正式版本共用元件無法取得 Router。正式預覽測試涵蓋此整合，不需要匯入規則例外或相依套件升級。懸浮 AI 入口在輸入框聚焦時隱藏，避免攔截輸入框邊緣的觸控。

應用導航適配保留框架元件，並支援 Enter/Space 啟用和可見焦點。NutUI 在視覺導航項外使用原生按鈕，避免焦點屬性同時傳遞給內部徽章。使用既有 `keep-px` 選擇器機制，僅保留返回按鈕與底部導航的 44px 最小觸控尺寸，其餘應用版面繼續使用既有 vw 轉換。WebKit 鍵盤檢查使用 Option+Tab，以在 Safari 預設鍵盤模式下包含按鈕。

本次測試的 WebKit 存在已重現限制：延遲載入模組收到測試注入的 HTTP 503 後，原頁面即使整頁導航仍保留失敗模組，且不再發出該模組請求。重新載入回歸保持啟用並在該瀏覽器失敗，沒有略過或標為預期失敗。獨立建立的頁面可載入，但使用者點擊開啟的彈出頁面也重現失敗，因此未提供未經驗證的彈窗復原方案。Chromium 已驗證一般重新載入路徑；該觀察不能證明實際裝置 Safari 的行為。

`postcss-mobile-forever` 5 對字串選擇器排除項使用全等比對，因此將既有 `keep-px` 排除項改為符合類名邊界的正則，以相容 Vue 作用域選擇器；一般 px 到 vw 的轉換繼續啟用。
