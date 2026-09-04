# 路由同導覽

每個應用喺 `src/router/index.ts` 手寫路由，以 runtime 記錄為準。保留嘅舊 `typed-router.d.ts` 唔係最新生成結果，未啟用檔案路由或者自動路由名稱型別保證。

共用 `/home`、`/list`、`/member`、`/examples`，舊 `/mine`、`/example` 會轉址。子頁包括 `/details?id=1`、`/cart`、`/payment`、`/login`、`/ai/chat`、`/examples/{query,request,mobile,svg-icons,pwa,components}`。Vant/Varlet 名稱保留 `mine`、`example`，NutUI 用 `member`、`examples`；跨應用連結用標準路徑。

`title` 係翻譯鍵（例如 `app.home`），頂欄同瀏覽器標題會跟語言切換。Tab 只喺四個主頁顯示；Chat/Login/Cart/Payment/Details 隱藏 AI 浮動入口。

全部應用處理 `guestOnly`，只有 Vant 檢查 `requiresAuth`；示例未設 `requiresAuth: true`。HTTP 401 統一處理。`authority` 型別唔代表角色授權已接入，後端仍然要驗證。

業務頁面預設唔啟用 `keepAlive`；購物車持久化同 Query 資料快取唔需要頁面快取。布局保留可選嘅條件包裹能力，但切去非快取路由會移除，唔係持久跨路由快取。三個布局喺 `route.fullPath` 改變後重設實際捲動容器 `.app-content`，包括 Tab 切換同瀏覽器返回，唔只依賴視窗嘅 `scrollBehavior`。回跳地址用 `getSafeRedirect`。參見[架構](../v2/architecture.md)同[API](./api.md)。
