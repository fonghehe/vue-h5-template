# v2 架構

三個應用透過 `packages/mobile-ui` 共用相同業務 Tab 與延遲載入頁面，保留各自原生導覽與元件展示；正式建置僅包含一套 UI。

路由刻意維持手寫，讓 Layout、Lazy Load、title、KeepAlive、登入和權限規則清楚可查；先前未真正生效的檔案路由整合已移除。
三個應用均提供應用層錯誤邊界、離線提示、Mobile Web API 頁面與可持久化購物車。Network、Visual Viewport 與下拉更新生命週期位於 `@vh5-core/composables`。

## 目前實作邊界

三應用共用業務 Tab、主題及 HTTP 401，但僅 Vant 檢查 `requiresAuth`，`authority` 尚未接入角色授權。業務頁預設不快取，包含購物車與 Query；布局在路由變更後重設 `.app-content` 捲動位置。Pinia 持久化及 Query 資料快取不依賴 KeepAlive。user/cart 正式環境仍用 localStorage。`/payment` 提供純前端付款方式示範；真實付款、自動 token 更新、伺服器同步購物車及上傳尚未實作。見[路由](../essentials/route.md)、[狀態](../essentials/state.md)、[部署](../essentials/build.md)。
