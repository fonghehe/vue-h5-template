# 構建與部署

```bash
pnpm build:vant
pnpm -F @vh5/h5-vant preview
pnpm build:docs
pnpm -F @vh5/docs preview
```

其他應用替換 `vant` 為 `nutui` / `varlet`。全 build 包含 docs。部署 `apps/h5-<ui>/dist` 為 history SPA，preview 不啟動後端。

正式環境需自設代理，先 `/api/ai/**` 到 AI，其餘 `/api/**` 到業務，關閉 SSE 緩衝；`VITE_NITRO_MOCK=false`，前端不能放金鑰。

`VITE_BASE` 以外還需檢查伺服器 fallback、PWA start URL/導覽回退、根路徑連結，不代表只改 base 就支援子目錄。

PWA 用 `VITE_PWA_ENABLED=true`，只預快取靜態資源，API 不快取。圖片優化為 build-only，Vant 正式設定已開啟。

Dockerfile 目前複製 **playground/dist**，Nginx 未接双後端，使用前必須調整，不能直接當 H5 正式部署。

文檔輸出 `docs/.vitepress/dist`，base `/vue-h5-template/`；docs workflow 從 main 或手動觸發，release 用 Changesets，需設定發布 token。見[部署](../v2/deployment.md)。
