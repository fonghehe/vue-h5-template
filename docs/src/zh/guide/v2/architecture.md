# v2 架构

三个应用通过 `packages/mobile-ui` 共享同一套业务 Tab 和懒加载页面，保留各自原生导航与组件展示；每个生产包只包含一个 UI 框架。

共享 REST 能力位于 `packages/api-client`，流式协议位于 `packages/ai-chat`，Nitro Mock 位于 `apps/backend-mock`，构建和规范配置集中在 `internal`。

v2 继续使用手写 Vue Router。上一版虽然安装了 `unplugin-vue-router`，运行时却仍是手写路由，生成类型与真实路由并不一致。显式路由更适合当前规模，也更容易审查 Layout、懒加载、`title`、`keepAlive`、`requiresAuth` 和 `authority`。只有当页面数量显著增长时才应重新评估文件路由。

运行时边界：Pinia 管客户端状态，TanStack Query 管服务端状态，API Client 管 REST 与错误，AI Chat 包管流协议和会话生命周期，SFC 只负责展示和局部交互。

三个应用均提供应用级错误边界、离线提示、Mobile Web API 页面和可持久化购物车。网络状态、Visual Viewport 与下拉刷新生命周期位于 `@vh5-core/composables`；购物车选择属于 Pinia，商品远程数据仍属于 TanStack Query/请求层。

## 当前实现边界

三套应用共享业务 Tab、主题和 HTTP 401；仅 Vant 实际检查 `requiresAuth`，`authority` 尚非已接入角色授权。业务页面默认不缓存，包括购物车与 Query；三个布局在路由变化时重置 `.app-content` 滚动位置。Pinia 持久化和 Query 数据缓存独立于 KeepAlive。user/cart 即使生产也显式使用 localStorage。`/payment` 已提供纯前端支付方式演示；真实支付、自动刷新 token、服务端购物车同步与上传尚未实现。参见[路由](../essentials/route.md)、[状态](../essentials/state.md)与[部署](../essentials/build.md)。
