# 系统架构

```text
App route → shared mobile page → Query → api-client (Axios) → Nitro / business service
App route → shared ChatPage → useStreamingChat → FetchChatProvider → Nitro / AI service
bootstrap → i18n → Pinia → configureApiClient → VueQueryPlugin → router → mount
```

三套应用共享业务行为，保留原生导航、主题、语言适配及会话接入。`mobile-ui` 管页面和 Query/cart 逻辑，`api-client` 管 REST 契约，`ai-chat` 管流协议；应用 views 是懒加载包装，不再维护三套重复业务实现。

Pinia 管客户端状态，Vue Query 缓存远端数据，Vue I18n 管语言。购物车是本地示例，结算不是支付集成。Nitro 与业务/AI 服务使用相同的 REST/SSE 契约。

路由显式定义；HTTP 401 在所有应用集中处理，只有 Vant 当前检查 `requiresAuth`。角色元数据本身不执行鉴权，参见[路由边界](../essentials/route.md)。

Vite 8 使用 Rolldown；resolver 按需加载单个 UI 框架，UnoCSS 配合 scoped CSS。共享响应式页面不做 px-to-vw 转换。namespace 隔离 store key，但当前 user/cart 即使生产也显式使用 localStorage。

`pnpm check` 执行 lint、递归类型检查、Vitest、workspace 构建，Playwright 独立执行；Changesets 管版本与发布。参见[目录](./dir.md)、[后端模式](../essentials/server.md)、[测试](../v2/testing.md)及[v2 边界](../v2/architecture.md)。
