# NutUI

All three apps have Home, List, Member and Examples tabs at `/home`, `/list`, `/member`, `/examples`. Product views come from `packages/mobile-ui`; native navigation and `/examples/components` remain app-specific. English is the default, with Chinese and Japanese switching on Member. The themed floating AI button opens `/ai/chat` and hides on Member/Chat/Login/Cart/Payment/Details.

NutUI 4 uses `NutUIResolver` and `@nutui/icons-vue`. The theme is red `#fa2c19`. Layout uses `NutNavbar` and `NutTabbarItem.to` for route navigation. Japanese native labels come from `src/locales/nutui-ja.ts`. Functional Toast/Notify/Dialog/ImagePreview CSS is explicitly imported in bootstrap; SCSS variable injection is limited to this app's source.

```bash
pnpm dev:nutui
pnpm dev:services:nutui
pnpm build:nutui
pnpm -F @vh5/h5-nutui preview
```

Port: `5777`.

[Backend modes](../guide/essentials/server.md) · [Themes](../guide/essentials/styles.md) · [Route behavior](../guide/essentials/route.md)
