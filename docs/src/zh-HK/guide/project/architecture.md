# 系統架構

```text
App route → shared mobile page → Query → api-client (Axios) → Nitro / business service
App route → shared ChatPage → useStreamingChat → FetchChatProvider → Nitro / AI service
bootstrap → i18n → Pinia → configureApiClient → VueQueryPlugin → router → mount
```

三個應用共用業務頁，保留原生導覽、主題、語言同 session 整合。`mobile-ui` 管頁面同 Query/cart，`api-client` 管 REST，`ai-chat` 管串流，views 只係 lazy 包裝。

Pinia 管 client state，Vue Query 管 server cache，Vue I18n 管語言。購物車只喺本機，結算係示例，冇支付功能。Nitro 同兩個配套服務共用 REST/SSE 契約。

HTTP 401 全應用統一處理，但 `requiresAuth` 目前只係 Vant 評估，角色 metadata 唔會自動授權。見[路由邊界](../essentials/route.md)。

Vite 8 用 Rolldown，UI 按需載入，UnoCSS 同 scoped CSS 並用；共享頁面排除 px-to-vw。namespace 隔離 store key，但 user/cart 正式環境仍然用 localStorage。

check 包括 lint、型別、Vitest、workspace build；Playwright 分開，Changesets 管發布。參見[目錄](./dir.md)、[後端](../essentials/server.md)、[測試](../v2/testing.md)、[v2](../v2/architecture.md)。
