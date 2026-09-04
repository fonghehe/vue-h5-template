# Varlet

三套应用统一 Home、List、Member、Examples Tab，对应 `/home`、`/list`、`/member`、`/examples`。业务页来自 `packages/mobile-ui`，原生导航和 `/examples/components` 保留应用实现。默认英文，Member 可切换中日文。主题色 AI 悬浮按钮打开 `/ai/chat`，在聊天/登录/购物车/支付/详情隐藏。

Varlet 3 使用 `VarletImportResolver` 按需加载，不做全局注册。主题紫 `#6750a4`，布局为 `var-app-bar`、`var-bottom-navigation`。原生语言先 `Locale.add(lang, messages)`，再 `Locale.use(lang)`；仅该应用加载 Varlet UnoCSS preset。

```bash
pnpm dev:varlet
pnpm dev:services:varlet
pnpm build:varlet
pnpm -F @vh5/h5-varlet preview
```

Port: `5779`.

[后端模式](../guide/essentials/server.md) · [主题](../guide/essentials/styles.md) · [路由行为](../guide/essentials/route.md)
