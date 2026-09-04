# 路由与导航

路由手写在各应用的 `src/router/index.ts`。以运行时记录为准；保留的旧 `typed-router.d.ts` 不是当前生成结果。未启用文件路由插件，也不能宣称路由名称已自动生成并保证类型安全。

三个应用统一使用 `/home`、`/list`、`/member`、`/examples`；旧 `/mine`、`/example` 会重定向。子页包括 `/details?id=1`、`/cart`、`/login`、`/ai/chat` 和 `/examples/{query,request,mobile,svg-icons,pwa,components}`。Vant/Varlet 保留 `mine`、`example` 路由名，NutUI 使用 `member`、`examples`，跨应用链接建议用标准路径。

`title` 保存 `app.home` 等翻译键，顶栏和浏览器标题响应语言变化。底部 Tab 仅在四个主页面显示；AI 悬浮入口在聊天、登录、购物车、详情页隐藏。

三个应用都处理 `guestOnly` 登录跳转；只有 Vant 实际检查 `requiresAuth`，NutUI/Varlet 尚未接入。目前示例路由未设置 `requiresAuth: true`。三个应用都有统一 HTTP 401 处理。`authority` 是共享元数据类型，不代表自动执行角色鉴权；后端仍须授权校验。

三个布局都按当前路由的 `keepAlive` 条件包裹页面；切到非缓存路由时包裹会被移除，并不是长期保存的跨路由缓存。登录回跳用 `getSafeRedirect` 校验。参见[架构](../v2/architecture.md)与[API](./api.md)。
