# Ionic Vue

`src/bootstrap.ts` registers `IonicVue` and loads Ionic’s base styles. `src/App.vue` uses `IonApp`, and the layout uses `IonToolbar` and `IonFooter` with the workspace’s Vue Router. The blue theme (`#0054e9`) is defined in `src/theme.css`.

Home, List, Member and Examples use shared pages from `packages/mobile-ui`. Open **Examples → Components** (`/examples/components`) for framework-specific controls.

## Run locally

The development server uses port **5784**. Use `dev:ionic` for Nitro Mock or `dev:services:ionic` after starting both companion services. The production build goes to `apps/h5-ionic/dist`.

```bash
pnpm dev:ionic
pnpm dev:services:ionic
pnpm build:ionic
pnpm -F @vh5/h5-ionic preview
```

[Backend modes](../guide/essentials/server.md) · [Routing](../guide/essentials/route.md) · [Testing](../guide/v2/testing.md)
