# NutUI

三套应用统一 Home、List、Member、Examples Tab，对应 `/home`、`/list`、`/member`、`/examples`。业务页来自 `packages/mobile-ui`，原生导航和 `/examples/components` 保留应用实现。默认英文，Member 可切换中日文。主题色 AI 悬浮按钮打开 `/ai/chat`，在聊天/登录/购物车/支付/详情隐藏。

NutUI 4 使用 `NutUIResolver` 和 `@nutui/icons-vue`，主题红 `#fa2c19`。布局使用 `NutNavbar`，Tab 通过 `NutTabbarItem.to` 导航。原生日文标签来自 `src/locales/nutui-ja.ts`。函数式 Toast/Notify/Dialog/ImagePreview CSS 在 bootstrap 显式导入；SCSS 变量只注入本应用源码。

```bash
pnpm dev:nutui
pnpm dev:services:nutui
pnpm build:nutui
pnpm -F @vh5/h5-nutui preview
```

Port: `5777`.

[后端模式](../guide/essentials/server.md) · [主题](../guide/essentials/styles.md) · [路由行为](../guide/essentials/route.md)
