# 構建同部署

```bash
pnpm build:vant
pnpm -F @vh5/h5-vant preview
pnpm build:docs
pnpm -F @vh5/docs preview
```

其他應用將 `vant` 換成 `nutui` / `varlet`。全 build 包含 docs。部署 `apps/h5-<ui>/dist` 做 history SPA，preview 唔會起後端。

正式環境要自設代理，先 `/api/ai/**` 去 AI，其餘 `/api/**` 去業務，關閉 SSE buffering；`VITE_NITRO_MOCK=false`，前端唔可以放密鑰。

除咗 `VITE_BASE` 仲要檢查 server fallback、PWA start URL/導覽回退、root-relative links，唔係淨改 base 就保證子目錄部署。

PWA 用 `VITE_PWA_ENABLED=true`，只 precache 靜態資源，API 唔快取。圖片優化係 build-only，Vant 正式設定已開。

Dockerfile 而家複製 **playground/dist**，Nginx 未接雙後端，要先調整，唔可以直接當 H5 正式部署。

文檔輸出 `docs/.vitepress/dist`，base `/vue-h5-template/`；docs workflow 從 main 或手動觸發，release 用 Changesets，要設定發布 token。見[部署](../v2/deployment.md)。
