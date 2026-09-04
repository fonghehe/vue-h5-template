# 状态管理

Pinia 管会话和客户端状态；TanStack Query 管商品数据、加载、重试、分页与变更；Vue refs 管局部交互。聊天状态归 `useStreamingChat`，语言由 Vue I18n 和 localStorage 的 `vh5:locale` 管理。

三个应用都在 bootstrap 安装一个 QueryClient，`staleTime: 30_000`、`retry: 1`。`packages/mobile-ui/src/queries.ts` 提供 `useProductPage(page, pageSize)`、`useInfiniteProducts(pageSize)`，缓存键包含语言。`/examples/query` 演示分页、收藏 mutation 和点击加载更多，不是视口触发的自动无限滚动。不要把结果镜像进 Pinia。

会话 store 分别在 Vant/Varlet 的 `src/stores/user.ts`、NutUI 的 `src/store/modules/user.ts`。登录 action 调用类型化 API，保存 token 和公开用户信息。共享购物车保存用户选择的商品快照、数量、选中状态，并不是与后端同步的购物车。

`initStores(app, { namespace })` 安装 Pinia 和持久化，键为 `${namespace}-${storeId}`。默认开发用 localStorage、生产用 SecureLS；但当前 user/cart store 显式选择 localStorage，两个环境都是如此。浏览器端加密不能防御 XSS。`resetAllStores()` 只重置 Pinia，不清 Query 缓存或语言设置。

参见[状态边界](../v2/state-management.md)与[API](./api.md)。
