# Styles and Mobile Themes

All apps import `@vh5/styles/global`. Vant, NutUI and Varlet also load their own theme from `packages/styles/src/<ui>/index.css` (`#1989fa`, `#fa2c19` and `#6750a4` respectively). TDesign and Ionic define their app tokens in `apps/h5-<ui>/src/theme.css` (`#0052d9` and `#0054e9`). Both apps disable px-to-viewport conversion in their Vite configs.

```ts
// Vant bootstrap; choose only the current app's theme.
import '@vh5/styles/global';
import '@vh5/styles/vant';
```

```css
/* packages/styles/src/vant/index.css */
.van-nav-bar {
  --van-nav-bar-background: var(--app-primary);
  --van-nav-bar-title-text-color: #fff;
  --van-nav-bar-icon-color: #fff;
  --van-nav-bar-text-color: #fff;
}
```

Vant navbar tokens are defined on the component, not only `:root`, so later Vant CSS cannot reset the header to white. The background follows `--app-primary`; title, back icon and text actions are white. UI JS/CSS load via framework resolvers. NutUI functional Toast/Notify/Dialog/ImagePreview styles are explicitly imported in bootstrap; its SCSS variable injection is scoped to app files.

Shared product styles live in `packages/mobile-ui/src/surface.css` and scoped SFC styles. Responsive grids, wrapping titles and 44px touch targets keep the catalog readable at 320px. The shared package is excluded from `postcss-mobile-forever`; other app styles use a 375px design viewport with a 600px maximum display width.

The active UnoCSS configuration is `internal/vite-config/src/plugins/unocss.ts`, not a root `uno.config.ts`. It uses presetUno, attributify, icons and Varlet's preset only for Varlet. Actual shortcuts: `mobile-card`, `page-shell`, `tap-target`; rules: `safe-area-pt`, `safe-area-pb`, `safe-area-px`, `h-safe-screen`. Breakpoints: 375/600/768px. Keep complex components in scoped CSS.

After build-config changes run `pnpm -F @vh5/vite-config stub`. Shared SVG examples use `packages/mobile-ui/src/assets/icons`; Vant also retains its app icon directory. See [UI strategy](../v2/ui-framework.md).
