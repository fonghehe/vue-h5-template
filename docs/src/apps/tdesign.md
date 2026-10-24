# TDesign Mobile Vue

The app uses `Navbar` and `TabBar` from `tdesign-mobile-vue` in `src/layout/index.vue`. Bootstrap imports the TDesign stylesheet. The blue theme (`#0052d9`) is defined in `src/theme.css`.

Home, List, Member and Examples use shared pages from `packages/mobile-ui`. Open **Examples → Components** (`/examples/components`) for framework-specific controls.

## Run locally

The development server uses port **5783**. Use `dev:tdesign` for Nitro Mock or `dev:services:tdesign` after starting both companion services. The production build goes to `apps/h5-tdesign/dist`.

```bash
pnpm dev:tdesign
pnpm dev:services:tdesign
pnpm build:tdesign
pnpm -F @vh5/h5-tdesign preview
```

[Backend modes](../guide/essentials/server.md) · [Routing](../guide/essentials/route.md) · [Testing](../guide/v2/testing.md)
