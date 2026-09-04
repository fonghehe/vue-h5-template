# 常見問題

## 安裝同模組解析

用 Node 22.x 嘅 22.18+ 或 24.x、pnpm 11.10.0。workspace 改完要 install。舊服務解析唔到 `@vh5/mobile-ui/...` 時停咗嗰個進程，重啟 `pnpm dev:vant` 再 refresh；另一 Port 測試成功唔等於原進程修復。

## Port

Vant 5778 佔用會報錯，可用 `VITE_PORT=5788 pnpm dev:vant`。Mock 出事先確認 5320 進程，插件唔會替換。服務模式要 8002/8001 已起，帳號由業務服務決定。

## 頂欄同型別

導入 `@vh5/styles/vant`，頂欄變數放喺 `.van-nav-bar`，避免 root 樣式覆蓋。

用 `pnpm typecheck`，唔係舊 `pnpm check:type`。會檢查共享套件、Mock、工具、三個應用源碼同 `tsconfig.node.json`，仲有根測試設定同 E2E。自動 import 宣告由 Vite 生成，路由仍然手寫。

## 新增同部署

見[功能](../essentials/contributing-features.md)、[後端](../essentials/server.md)、[構建](../essentials/build.md)、[樣式](../essentials/styles.md)。子目錄/PWA、舊 Dockerfile 要另行確認；唔好首先刪 lockfile。
