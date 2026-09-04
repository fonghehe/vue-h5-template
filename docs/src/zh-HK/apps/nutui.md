# NutUI

三個應用統一 Home/List/Member/Examples，路徑係 `/home`、`/list`、`/member`、`/examples`。業務頁來自 `packages/mobile-ui`，原生導覽同 `/examples/components` 保留應用實作。預設英文，Home/Member 可切換中日文。AI 浮動按鈕打開 `/ai/chat`，喺 Chat/Login/Cart/Details 隱藏。

NutUI 4 用 `NutUIResolver`、`@nutui/icons-vue`，主題紅 `#fa2c19`。導覽用 `NutNavbar` 同 `NutTabbarItem.to`。日文適配喺 `src/locales/nutui-ja.ts`。函數式元件 CSS 喺 bootstrap 匯入，SCSS 變數只注入本應用。

```bash
pnpm dev:nutui
pnpm dev:services:nutui
pnpm build:nutui
pnpm -F @vh5/h5-nutui preview
```

Port: `5777`.

[後端模式](../guide/essentials/server.md) · [主題](../guide/essentials/styles.md) · [路由行為](../guide/essentials/route.md)
