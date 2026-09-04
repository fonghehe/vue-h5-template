# Varlet

三個應用統一 Home/List/Member/Examples，路徑為 `/home`、`/list`、`/member`、`/examples`。業務頁來自 `packages/mobile-ui`，原生導覽與 `/examples/components` 保留應用實作。預設英文，Member 可切換中日文。AI 浮動按鈕開啟 `/ai/chat`，在 Member/Chat/Login/Cart/Payment/Details 隱藏。

Varlet 3 按需使用 `VarletImportResolver`，主題紫 `#6750a4`，導覽為 `var-app-bar` / `var-bottom-navigation`。語言先 `Locale.add` 再 `Locale.use`，只有本應用載入 Varlet UnoCSS preset。

```bash
pnpm dev:varlet
pnpm dev:services:varlet
pnpm build:varlet
pnpm -F @vh5/h5-varlet preview
```

Port: `5779`.

[後端模式](../guide/essentials/server.md) · [主題](../guide/essentials/styles.md) · [路由行為](../guide/essentials/route.md)
