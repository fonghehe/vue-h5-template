# 常見問題

## 安裝與模組解析

使用 Node 22.x 的 22.18+ 或 24.x、pnpm 11.10.0。workspace 變更後 install。舊服務無法解析 `@vh5/mobile-ui/...` 時停止該進程，重啟 `pnpm dev:vant` 並重新整理；另一端口測試成功不等於原進程修復。

## 連接埠

Vant 5778 佔用會報錯，可用 `VITE_PORT=5788 pnpm dev:vant`。Mock 異常先確認 5320 進程，插件不會替換它。服務模式需 8002/8001 已啟動，帳號由業務服務決定。

## 頂欄和型別

導入 `@vh5/styles/vant`，頂欄變數放在 `.van-nav-bar`，避免根層樣式覆蓋。

使用 `pnpm typecheck`，不是舊 `pnpm check:type`。檢查共享套件、Mock、工具、三個應用原始碼及 `tsconfig.node.json`，也檢查根測試設定和 E2E。自動匯入宣告由 Vite 產生，路由仍手寫。

## 新增與部署

見[功能](../essentials/contributing-features.md)、[後端](../essentials/server.md)、[構建](../essentials/build.md)、[樣式](../essentials/styles.md)。子目錄/PWA、旧 Dockerfile 需另行確認；不要優先刪除 lockfile。
