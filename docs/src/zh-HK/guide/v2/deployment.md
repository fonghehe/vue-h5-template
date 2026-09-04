# Deployment

將所選 App 嘅 `dist` 當 History Fallback SPA 部署。真實環境先將 `/api/ai/**` Proxy 去 `vue-h5-template-ai-service`，再將其餘 `/api/**` Proxy 去 `vue-h5-template-business-service`。`text/event-stream` 要關閉 Proxy Buffering 同 Response Transformation。Browser Target 係 Safari 16.4+ / Chrome 111+。

PWA 同 Production Image Optimization 分別由 `VITE_PWA_ENABLED`、`VITE_IMAGE_OPTIMIZE` 控制。Service Worker 唔會 Cache `/api/**`。Secret 同 AI Key 唔可以放入 `VITE_*`。

微信/企業微信 WebView 要符合目標內核，唔保證舊版。舊 Dockerfile 係畀 playground，要先調整。子目錄要檢查 PWA URL、SPA fallback 同 root links。見[部署邊界](../essentials/build.md)。
