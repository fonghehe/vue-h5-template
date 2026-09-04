# NutUI

三個應用統一 Home/List/Member/Examples，路徑為 `/home`、`/list`、`/member`、`/examples`。業務頁來自 `packages/mobile-ui`，原生導覽與 `/examples/components` 保留應用實作。預設英文，Member 可切換中日文。AI 浮動按鈕開啟 `/ai/chat`，在 Member/Chat/Login/Cart/Payment/Details 隱藏。

NutUI 4 使用 `NutUIResolver`、`@nutui/icons-vue`，主題紅 `#fa2c19`。導覽用 `NutNavbar` 與 `NutTabbarItem.to`。日文適配在 `src/locales/nutui-ja.ts`。函數式元件 CSS 在 bootstrap 匯入，SCSS 變數僅注入本應用。

```bash
pnpm dev:nutui
pnpm dev:services:nutui
pnpm build:nutui
pnpm -F @vh5/h5-nutui preview
```

Port: `5777`.

[後端模式](../guide/essentials/server.md) · [主題](../guide/essentials/styles.md) · [路由行為](../guide/essentials/route.md)
