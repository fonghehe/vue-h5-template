# 由 v1 遷移到 v2

API 而家直接回傳 Unwrapped Data；login 改用 Object Parameter；Product List 固定 Pagination；Token 由 Interceptor 讀；未生效嘅 File Routing 整合已移除。

依次遷移 API Client、Vue Query、Route Meta 同 OpenAPI Types，最後跑 `pnpm check` 同 E2E。Theme、Monitoring、Upload、Virtual List、WebView Bridge 係 P1；Camera、QR、Deep Link、SSR/SSG 係 P2。

## 目前實作邊界

三應用共用業務 Tab、主題同 HTTP 401，但只有 Vant 檢查 `requiresAuth`，`authority` 未接角色授權。KeepAlive 條件掛載，切去非快取路由會移除。user/cart 正式環境仲用 localStorage。自動 token 更新、server 同步購物車、支付同上傳未實作。見[路由](../essentials/route.md)、[狀態](../essentials/state.md)、[部署](../essentials/build.md)。
