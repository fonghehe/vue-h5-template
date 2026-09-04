# Varlet

三個應用統一 Home/List/Member/Examples，路徑係 `/home`、`/list`、`/member`、`/examples`。業務頁來自 `packages/mobile-ui`，原生導覽同 `/examples/components` 保留應用實作。預設英文，Home/Member 可切換中日文。AI 浮動按鈕打開 `/ai/chat`，喺 Chat/Login/Cart/Details 隱藏。

Varlet 3 按需用 `VarletImportResolver`，主題紫 `#6750a4`，導覽係 `var-app-bar` / `var-bottom-navigation`。語言先 `Locale.add` 再 `Locale.use`，只有呢個應用載入 Varlet UnoCSS preset。

```bash
pnpm dev:varlet
pnpm dev:services:varlet
pnpm build:varlet
pnpm -F @vh5/h5-varlet preview
```

Port: `5779`.

[後端模式](../guide/essentials/server.md) · [主題](../guide/essentials/styles.md) · [路由行為](../guide/essentials/route.md)
