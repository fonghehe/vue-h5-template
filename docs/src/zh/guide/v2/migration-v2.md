# 从 v1 迁移到 v2

## Breaking Changes

- REST 方法返回解包后的数据，不再返回 `ApiResponse<T>`。
- `loginApi` 改为接收 `{ username, password }`。
- 商品列表固定返回 `PaginationResponse<ProductItem>`。
- `fetchUserInfoApi` 从统一拦截器获取 Token。
- 移除未真正启用的文件路由插件，运行时继续使用显式路由。
- 浏览器目标升级为 Safari 16.4+ / Chrome 111+。
- 需要 Node 22.18+/24 和 pnpm 11。

推荐顺序：更新 workspace/构建配置；用共享 API Client 替换本地 fetch；把 `response.data` 改为直接数据；服务端状态迁到 Vue Query；补路由 Meta；生成 OpenAPI 类型；评估 PWA/存储/安全策略；最后运行 `pnpm check` 和 E2E。

能力分级：P0 已实现认证/401、权限 Meta、类型错误、懒路由、安全 Markdown、XSS/开放重定向防护、Safe Area、CI 和测试。P1 Roadmap 包含 Feature Flags、暗色主题、错误上报、Analytics Consent、上传/预览、虚拟列表、WebView Bridge 和性能监控。相机、QR、Deep Link、Native Bridge、CDN、SSR/SSG 与 SEO 属于按业务引入的 P2。

## 当前实现边界

三套应用共享业务 Tab、主题和 HTTP 401；仅 Vant 实际检查 `requiresAuth`，`authority` 尚非已接入角色授权。所有布局条件挂载 KeepAlive，进入非缓存路由会移除。user/cart 即使生产也显式使用 localStorage。未实现自动刷新 token、服务端购物车同步、支付与上传。参见[路由](../essentials/route.md)、[状态](../essentials/state.md)与[部署](../essentials/build.md)。
