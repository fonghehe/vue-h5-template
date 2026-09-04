# Vant

All three apps have Home, List, Member and Examples tabs at `/home`, `/list`, `/member`, `/examples`. Product views come from `packages/mobile-ui`; native navigation and `/examples/components` remain app-specific. English is the default, with Chinese and Japanese switching on Home/Member. The themed floating AI button opens `/ai/chat` and hides on Chat/Login/Cart/Details.

Vant 4 uses `VantResolver` for JS/CSS on demand, not `app.use(Vant)` or full-library CSS. The blue `#1989fa` navbar uses component-scoped theme variables with white title/back icon so later root defaults cannot override it. Layout uses `van-nav-bar` and `van-tabbar`; LoginForm is a shared-testable app component, and the product catalog is no longer a Vant cell playground.

```bash
pnpm dev:vant
pnpm dev:services:vant
pnpm build:vant
pnpm -F @vh5/h5-vant preview
```

Port: `5778`.

[Backend modes](../guide/essentials/server.md) · [Themes](../guide/essentials/styles.md) · [Route behavior](../guide/essentials/route.md)
