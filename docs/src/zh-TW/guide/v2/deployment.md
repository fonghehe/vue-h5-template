# 部署

將所選應用的 `dist` 以 History Fallback SPA 部署。真實環境先把 `/api/ai/**` 代理到 `vue-h5-template-ai-service`，再把其餘 `/api/**` 代理到 `vue-h5-template-business-service`。`text/event-stream` 必須關閉代理緩衝與回應轉換。瀏覽器目標為 Safari 16.4+ / Chrome 111+。

PWA 與正式圖片壓縮分別由 `VITE_PWA_ENABLED`、`VITE_IMAGE_OPTIMIZE` 控制。Service Worker 不快取 `/api/**`。Secret 與 AI Key 不可放進 `VITE_*`。

微信/企業微信 WebView 需符合目標內核，不保證舊版。舊 Dockerfile 面向 playground，需先調整。子目錄要檢查 PWA URL、SPA fallback 與根路徑連結。見[部署邊界](../essentials/build.md)。
