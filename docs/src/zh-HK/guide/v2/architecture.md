# v2 架構

三個 App 透過 `packages/mobile-ui` 共用相同業務 Tab 同延遲載入頁面，保留各自原生導覽同元件展示；Production Build 只包含一套 UI。

路由刻意保留手寫，令 Layout、Lazy Load、title、KeepAlive、登入同權限一目了然；之前未真正運作嘅 File Routing 整合已移除。
三個 App 均提供應用層 Error Boundary、Offline 提示、Mobile Web API 頁面同可持久化購物車。Network、Visual Viewport 同 Pull-to-refresh 生命週期位於 `@vh5-core/composables`。

## 目前實作邊界

三應用共用業務 Tab、主題同 HTTP 401，但只有 Vant 檢查 `requiresAuth`，`authority` 未接角色授權。業務頁預設唔快取，包括購物車同 Query；布局喺路由改變後重設 `.app-content` 捲動位置。Pinia 持久化同 Query 資料快取唔依賴 KeepAlive。user/cart 正式環境仲用 localStorage。`/payment` 提供純前端付款方式示範；真實付款、自動 token 更新、server 同步購物車同上傳未實作。見[路由](../essentials/route.md)、[狀態](../essentials/state.md)、[部署](../essentials/build.md)。
