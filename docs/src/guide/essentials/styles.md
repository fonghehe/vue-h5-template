# Styles

## Global Styles

`packages/styles` provides global base styles and UI library style entries:

```ts
import "@vh5/styles/global"; // Global base styles (CSS Reset + common component styles)
import "@vh5/styles/nutui"; // NutUI theme styles (optional)
import "@vh5/styles/vant"; // Vant theme styles (optional)
import "@vh5/styles/varlet"; // Varlet theme styles (optional)
```

All apps import `@vh5/styles/global` in `bootstrap.ts`.

## On-demand Loading Strategy

All three apps use on-demand loading, with slightly different strategies:

### Vant

- **Component JS + CSS**: Fully on-demand via `VantResolver({ importStyle: true })` (default), no need for `app.use(Vant)`
- **Do not** import `vant/lib/index.css` separately — let Resolver manage CSS injection order

> **Why not import `vant/lib/index.css` alongside on-demand injection?**
> Full CSS and on-demand CSS will inject the same component's styles twice, causing Toast background to be overridden.
> Correct approach: use Resolver only, do not import full CSS separately.

```ts
// bootstrap.ts (vant)
import "@vh5/styles/global";
// ✅ Do not import vant/lib/index.css; component CSS injected on-demand by VantResolver
// ❌ Do not use app.use(Vant)
```

### Varlet

- **Component JS + CSS**: Fully on-demand via `VarletImportResolver`; components in templates auto-inject CSS
- **Snackbar (functional)**: Manually import CSS dependency chain in files where Snackbar is used

```ts
// In files using Snackbar
import { Snackbar } from "@varlet/ui";
import "@varlet/ui/es/snackbar/style/index.mjs"; // Manual Snackbar CSS import
```

### NutUI

- **Component JS + CSS**: Fully on-demand via `NutUIResolver`
- **Functional components** (Toast/Notify/Dialog/ImagePreview): Import CSS manually in `bootstrap.ts`

```ts
// bootstrap.ts (nutui)
import "@nutui/nutui/dist/packages/toast/style/css";
import "@nutui/nutui/dist/packages/notify/style/css";
import "@nutui/nutui/dist/packages/dialog/style/css";
import "@nutui/nutui/dist/packages/imagepreview/style/css";
```

## NutUI SCSS Variables

NutUI uses Vite SCSS `additionalData` function-style injection, scoped to the app's own SCSS files:

```ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: (source: string, filename: string) => {
        if (filename.includes('/apps/h5-nutui/src/')) {
          return `@use "@nutui/nutui/dist/styles/variables.scss" as *;\n${source}`;
        }
        return source;
      },
    },
  },
}
```

## Mobile Adaptation

Uses `postcss-mobile-forever` to convert px to viewport units:

- Design width: 375px
- Max display width: 600px (auto center-constrained on large screens like tablets)

## UnoCSS

The project uses [UnoCSS](https://unocss.dev/) as the atomic CSS engine. Config is at `uno.config.ts` in the project root.

### Built-in Shortcuts

| Shortcut          | Equivalent                                  |
| ----------------- | ------------------------------------------- |
| `flex-center`     | `flex items-center justify-center`          |
| `flex-between`    | `flex items-center justify-between`         |
| `flex-col-center` | `flex flex-col items-center justify-center` |

### Usage

```vue
<template>
  <div class="flex-center h-full text-lg text-gray-600">Hello UnoCSS</div>
</template>
```

UnoCSS supports attributify mode:

```vue
<div flex items-center justify-center text-lg>
  Hello UnoCSS
</div>
```

## BEM Naming

Styles follow BEM naming convention based on `@vh5-core/design` design tokens.
