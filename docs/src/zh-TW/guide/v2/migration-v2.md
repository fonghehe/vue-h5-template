# 從 v1 遷移到 v2

API 現在回傳已解包資料；login 改用 object 參數；商品列表固定為 pagination；Token 由 interceptor 讀取；未生效的檔案路由整合已移除。

依序遷移 API Client、Vue Query、Route Meta 與 OpenAPI 型別，最後執行 `pnpm check` 和 E2E。Theme、監控、Upload、Virtual List、WebView Bridge 列為 P1；Camera、QR、Deep Link、SSR/SSG 為 P2。

## 目前實作邊界

三應用共用業務 Tab、主題及 HTTP 401，但僅 Vant 檢查 `requiresAuth`，`authority` 尚未接入角色授權。KeepAlive 條件掛載，切到非快取路由會移除。user/cart 正式環境仍用 localStorage。自動 token 更新、伺服器同步購物車、支付及上傳未實作。見[路由](../essentials/route.md)、[狀態](../essentials/state.md)、[部署](../essentials/build.md)。
