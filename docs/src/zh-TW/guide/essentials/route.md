# 路由與導覽

各應用在 `src/router/index.ts` 手寫路由，以執行期記錄為準。保留的舊 `typed-router.d.ts` 不是最新生成結果，未啟用檔案路由或自動路由名稱型別保證。

共用 `/home`、`/list`、`/member`、`/examples`，舊 `/mine`、`/example` 會重新導向。子頁包含 `/details?id=1`、`/cart`、`/payment`、`/login`、`/ai/chat`、`/examples/{query,request,mobile,svg-icons,pwa,components}`。Vant/Varlet 路由名稱保留 `mine`、`example`，NutUI 使用 `member`、`examples`；跨應用連結用標準路徑。

`title` 是翻譯鍵（如 `app.home`），頂欄與瀏覽器標題隨語言變更。Tab 僅在四個主頁顯示；會員、聊天、登入、購物車、付款、詳情不顯示 AI 浮動入口。

全部應用處理 `guestOnly`，只有 Vant 檢查 `requiresAuth`；示例未設 `requiresAuth: true`。HTTP 401 統一處理。`authority` 型別不代表角色授權已接入，後端仍須驗證。

業務頁面預設不啟用 `keepAlive`；購物車持久化與 Query 資料快取不依賴頁面快取。布局保留選用的條件包裹能力，但進入非快取路由會移除，並非持久的跨路由快取。三個布局在 `route.fullPath` 變更後，重設實際捲動容器 `.app-content`，包含 Tab 切換與瀏覽器返回，不只依賴視窗的 `scrollBehavior`。回跳地址使用 `getSafeRedirect`。參見[架構](../v2/architecture.md)與[API](./api.md)。
