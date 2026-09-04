# Vant

三套应用统一 Home、List、Member、Examples Tab，对应 `/home`、`/list`、`/member`、`/examples`。业务页来自 `packages/mobile-ui`，原生导航和 `/examples/components` 保留应用实现。默认英文，Member 可切换中日文。主题色 AI 悬浮按钮打开 `/ai/chat`，在聊天/登录/购物车/支付/详情隐藏。

Vant 4 通过 `VantResolver` 按需加载 JS/CSS，不用 `app.use(Vant)` 或全量样式。顶栏蓝色 `#1989fa`，组件级变量保障白色标题/返回箭头不被后加载根样式覆盖。布局使用 `van-nav-bar`、`van-tabbar`；LoginForm 是应用内可测试组件，商品列表不再是 Vant Cell 展示页。

```bash
pnpm dev:vant
pnpm dev:services:vant
pnpm build:vant
pnpm -F @vh5/h5-vant preview
```

Port: `5778`.

[后端模式](../guide/essentials/server.md) · [主题](../guide/essentials/styles.md) · [路由行为](../guide/essentials/route.md)
