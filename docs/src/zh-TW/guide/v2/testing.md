# 測試

## 型別檢查與開發啟動

`pnpm typecheck` 除了應用，也獨立檢查 `mobile-ui`、`api-client`、`ai-chat` 和 `vite-config`。Vant 同時檢查應用及 `tsconfig.node.json`，避免應用環境掩蓋共享套件缺少型別擴充的問題。可執行 `pnpm -F @vh5/h5-vant type-check` 和 `pnpm -F @vh5/mobile-ui type-check` 單獨驗證。

新增 workspace 套件或修改 exports 後，執行 `pnpm install` 並重新啟動開發服務。Vant 連接埠被佔用時會報錯，不會自動切換。如果舊服務顯示 `Failed to resolve import @vh5/mobile-ui/...`，停止該服務，重新執行 `pnpm dev:vant`，然後重新整理瀏覽器。E2E 也會直接開啟各路由，檢查模組 HTTP 錯誤與未捕捉的瀏覽器例外。

`pnpm test:e2e` 依序在 Vant、NutUI、Varlet 執行共同行為測試，涵蓋 Tab、英中日切換與保存、320px 觸控尺寸、AI 浮動入口、Query、登入、Mock API 及 401。測試連接埠為 15778/15777/15779，等待 Nitro API 就緒。可執行 `pnpm test:e2e:nutui` 或 `pnpm test:e2e:varlet` 單獨驗證。

Vitest + happy-dom 測試 utils/request/stores/composables，Vue Test Utils 測試 Login Form 與 Chat Input，Playwright 測試 Home、Login、Mock API、401 和 SSE。

`pnpm check` 執行 lint、typecheck、unit test、build；E2E 因需瀏覽器與本機服務而獨立執行，CI 會在 quality job 後運行。
測試涵蓋 Network、Visual Viewport、下拉更新生命週期、購物車數量與選取，以及應用層錯誤邊界。
