# Varlet

All three apps have Home, List, Member and Examples tabs at `/home`, `/list`, `/member`, `/examples`. Product views come from `packages/mobile-ui`; native navigation and `/examples/components` remain app-specific. English is the default, with Chinese and Japanese switching on Home/Member. The themed floating AI button opens `/ai/chat` and hides on Chat/Login/Cart/Details.

Varlet 3 uses `VarletImportResolver` without global registration. The theme is purple `#6750a4`; layout uses `var-app-bar` and `var-bottom-navigation`. Native locale setup calls `Locale.add(lang, messages)` before `Locale.use(lang)`. Varlet's UnoCSS preset is loaded only for this app.

```bash
pnpm dev:varlet
pnpm dev:services:varlet
pnpm build:varlet
pnpm -F @vh5/h5-varlet preview
```

Port: `5779`.

[Backend modes](../guide/essentials/server.md) · [Themes](../guide/essentials/styles.md) · [Route behavior](../guide/essentials/route.md)
