# Testing

根目錄嘅 `vitest.config.ts` 統一設定整個工作區。測試放喺相關程式碼旁邊，需要模擬瀏覽器 API 嘅測試喺各自嘅測試套件入面設定。

`pnpm typecheck` 亦會透過 `@vh5/docs` 檢查 VitePress 設定。獨立檢查可執行 `pnpm -F @vh5/docs type-check`；文件建置成功不代表型別檢查已通過。

## 型別檢查同開發啟動

`pnpm typecheck` 會獨立檢查五個應用、共享執行套件（utils、stores、locales、core、UI/API/AI）、Mock 後端、Vite 設定同 workspace CLI。每個應用都檢查源碼同 `tsconfig.node.json`；`tsconfig.tools.json` 檢查根目錄 Vitest/Playwright 設定同 E2E。套件內測試亦參與型別檢查。新增有源碼嘅套件要提供 `type-check` script，先會由 Turbo 檢查。可用 `pnpm -F @vh5/utils type-check` 或 `pnpm -F @vh5/mobile-ui type-check` 局部驗證。

新增 workspace 套件或修改 exports 後，執行 `pnpm install` 並重新啟動開發服務。Vant Port 被佔用時會報錯，唔會自動切換。如果舊服務顯示 `Failed to resolve import @vh5/mobile-ui/...`，停止該服務，重新執行 `pnpm dev:vant`，再重新整理瀏覽器。E2E 亦會直接開啟各路由，檢查模組 HTTP 錯誤同未捕捉嘅瀏覽器例外。

`pnpm test:e2e` 按下表次序執行共用 Playwright 測試套件。開發模式會等 Nitro 商品 API 就緒。套件涵蓋 Tab 一致性、語言設定保存、商品觸控範圍、結帳、AI 聊天、Query、登入同 HTTP 401 處理。

| 應用 | `E2E_APP` | 測試連接埠 | 單獨執行 |
| --- | --- | --- | --- |
| [Vant](../../apps/vant.md) | `vant` | 15778 | `pnpm exec playwright test` |
| [NutUI](../../apps/nutui.md) | `nutui` | 15777 | `pnpm test:e2e:nutui` |
| [Varlet](../../apps/varlet.md) | `varlet` | 15779 | `pnpm test:e2e:varlet` |
| [TDesign Mobile Vue](../../apps/tdesign.md) | `tdesign` | 15780 | `pnpm test:e2e:tdesign` |
| [Ionic Vue](../../apps/ionic.md) | `ionic` | 15781 | `pnpm test:e2e:ionic` |

Vitest + happy-dom 測 utils/request/stores/composables，Vue Test Utils 測 Login Form 同 Chat Input，Playwright 測 Home、Login、Mock API、401 同 SSE。

`pnpm check` 包含 lint、typecheck、unit test、build；E2E 因為要 Browser 同 Local Server 而獨立執行，CI 會喺 quality job 之後運行。
測試涵蓋 Network、Visual Viewport、Pull-to-refresh 生命週期、購物車數量同選取，以及應用層 Error Boundary。

## 核心回歸覆蓋

測試涵蓋 SSE 嘅 CRLF/多位元組 UTF-8 分塊、非法事件、fetch header 同失敗、逐塊響應式更新、停止/清空/重試競態、Axios timeout/網絡/HTTP error、Query 分頁同語言 cache 隔離、購物車數量同金額邊界、用戶 session，以及下拉更新失敗後恢復。

`MarkdownContent` 用檔案級 `jsdom` 環境同真實 DOMPurify，唔 Mock 淨化，亦唔用 happy-dom 判斷淨化有冇生效；其他 DOM component tests 照用 happy-dom。jsdom 保持兼容嘅 29.x，因為 30.x 嘅 Node 最低要求高過本項目。

`vitest.config.ts` 明確包含核心 API/AI、工具同 composables、部分 mobile components/store 同後端工具，包括未被測試 import 嘅檔案。分支、函數、行、語句嘅 60% 門檻只針對呢個範圍，唔代表成個網站覆蓋率。用 `pnpm test:coverage` 睇報告；`pnpm test packages/ai-chat/src/__tests__` 可單獨跑串流測試。CI quality job 亦會檢查覆蓋率。

## 新增功能回歸檢查

API 測試涵蓋 ID、本文、取消訊號、語言轉換、AI base URL 與錯誤傳遞；元件測試涵蓋未登入、收藏與取消、讀取重試、寫入失敗與切換帳號後的舊回應。聊天測試涵蓋遠端建議、本機回退及卸載時中止串流。每個測試建立並清理獨立 QueryClient。

```bash
pnpm test packages/api-client/src/__tests__/features.test.ts packages/mobile-ui/src/__tests__/favorite-button.test.ts packages/mobile-ui/src/__tests__/chat-page.test.ts
pnpm test:coverage
pnpm exec playwright install chromium
pnpm test:e2e
```

Playwright 驗證重新整理後保留收藏、取消、遠端建議及失敗後的本機回退。Query 收藏測試先登入；串流測試輸入固定問題，不依賴建議文案。這些是開發 Mock 檢查，PostgreSQL／Redis 整合需另外設定環境。

## 瀏覽器復原與正式環境預覽

先執行 `pnpm build` 建置五套應用。設定 `E2E_PREVIEW=1` 後，僅在 Vite preview 執行瀏覽器行為測試，正式版本仍關閉 Nitro Mock。涵蓋延遲載入失敗及復原、320×640、844×390、1280×800 版面、鍵盤操作和聊天視口縮小復原。所需回應由瀏覽器測試攔截提供，另直接請求預覽伺服器，確認沒有開發商品 API。

```bash
E2E_APP=vant E2E_PREVIEW=1 pnpm exec playwright test
pnpm exec playwright install webkit
E2E_APP=ionic E2E_PREVIEW=1 E2E_BROWSER=webkit pnpm exec playwright test
```

`E2E_BROWSER=webkit` 選擇 WebKit，預設 Chromium；`E2E_CHANNEL=chrome` 可選擇已安裝 Chrome。用上表嘅 `E2E_APP` 值揀應用。這些是瀏覽器模擬：調整視口不能證明實際 iOS/Android 鍵盤、裝置安全區或內嵌 WebView 行為。

`RouteLoadError` 單獨處理 Router 導航載入異常，透過事件停止應用層進度列，保留目前頁面並提供失敗目標的整頁重新載入。導航成功後提示消失，元件卸載時移除兩個 Router 鉤子。

共用 Vite 設定從宿主應用統一解析 `vue-router`。pnpm 的不同 peer 變體可能打包出不同的 Router 注入鍵，導致開發正常而正式版本共用元件無法取得 Router。正式預覽測試涵蓋此整合，不需要匯入規則例外或相依套件升級。懸浮 AI 入口在輸入框聚焦時隱藏，避免攔截輸入框邊緣的觸控。

應用導航適配保留框架元件，並支援 Enter/Space 啟用和可見焦點。NutUI 在視覺導航項外使用原生按鈕，避免焦點屬性同時傳遞給內部徽章。使用既有 `keep-px` 選擇器機制，僅保留返回按鈕與底部導航的 44px 最小觸控尺寸，其餘應用版面繼續使用既有 vw 轉換。WebKit 鍵盤檢查使用 Option+Tab，以在 Safari 預設鍵盤模式下包含按鈕。

本次測試的 WebKit 存在已重現限制：延遲載入模組收到測試注入的 HTTP 503 後，原頁面即使整頁導航仍保留失敗模組，且不再發出該模組請求。重新載入回歸保持啟用並在該瀏覽器失敗，沒有略過或標為預期失敗。獨立建立的頁面可載入，但使用者點擊開啟的彈出頁面也重現失敗，因此未提供未經驗證的彈窗復原方案。Chromium 已驗證一般重新載入路徑；該觀察不能證明實際裝置 Safari 的行為。

`postcss-mobile-forever` 5 對字串選擇器排除項使用全等比對，因此將既有 `keep-px` 排除項改為符合類名邊界的正則，以相容 Vue 作用域選擇器；一般 px 到 vw 的轉換繼續啟用。
