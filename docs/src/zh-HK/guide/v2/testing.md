# Testing

## 型別檢查同開發啟動

`pnpm typecheck` 除咗應用，亦會獨立檢查 `mobile-ui`、`api-client`、`ai-chat` 同 `vite-config`。Vant 同時檢查應用同 `tsconfig.node.json`，避免應用環境掩蓋共享套件缺少型別擴充嘅問題。可以執行 `pnpm -F @vh5/h5-vant type-check` 同 `pnpm -F @vh5/mobile-ui type-check` 單獨驗證。

新增 workspace 套件或修改 exports 後，執行 `pnpm install` 並重新啟動開發服務。Vant Port 被佔用時會報錯，唔會自動切換。如果舊服務顯示 `Failed to resolve import @vh5/mobile-ui/...`，停止該服務，重新執行 `pnpm dev:vant`，再重新整理瀏覽器。E2E 亦會直接開啟各路由，檢查模組 HTTP 錯誤同未捕捉嘅瀏覽器例外。

`pnpm test:e2e` 依次喺 Vant、NutUI、Varlet 執行共同行為測試，涵蓋 Tab、英中日切換同保存、320px 觸控尺寸、AI 浮動入口、Query、登入、Mock API 同 401。測試 Port 為 15778/15777/15779，等 Nitro API 就緒。可用 `pnpm test:e2e:nutui` 或 `pnpm test:e2e:varlet` 單獨驗證。

Vitest + happy-dom 測 utils/request/stores/composables，Vue Test Utils 測 Login Form 同 Chat Input，Playwright 測 Home、Login、Mock API、401 同 SSE。

`pnpm check` 包含 lint、typecheck、unit test、build；E2E 因為要 Browser 同 Local Server 而獨立執行，CI 會喺 quality job 之後運行。
測試涵蓋 Network、Visual Viewport、Pull-to-refresh 生命週期、購物車數量同選取，以及應用層 Error Boundary。
