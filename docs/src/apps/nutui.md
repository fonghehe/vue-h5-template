# NutUI

Mobile H5 app based on [NutUI](https://nutui.jd.com/) 4.x.

## Features

- NutUI components **on-demand loading** (auto-registered and CSS injected via `NutUIResolver`)
- Global SCSS variables support (function-style injection, scoped to app files only)
- NutUI icon library `@nutui/icons-vue`

## Run

```bash
pnpm dev:nutui
```

Default port: `5777`

## Functional Component Styles

NutUI functional components like `showToast`, `showNotify`, `showDialog`, `showImagePreview` cannot be auto-imported by the Resolver. Import their styles manually in `bootstrap.ts`:

```ts
import "@nutui/nutui/dist/packages/toast/style/css";
import "@nutui/nutui/dist/packages/notify/style/css";
import "@nutui/nutui/dist/packages/dialog/style/css";
import "@nutui/nutui/dist/packages/imagepreview/style/css";
```

## SCSS Configuration

NutUI global variables are injected via Vite `additionalData` function, scoped to the app's own SCSS files only:

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

## NutUI Components Used

| Component                | Usage               |
| ------------------------ | ------------------- |
| `nut-navbar`             | Top navigation bar  |
| `nut-tabbar`             | Bottom tab bar      |
| `nut-cell`               | Product list / item |
| `nut-swiper`             | Carousel            |
| `nut-form` / `nut-input` | Login form          |
| `nut-avatar`             | User avatar         |
| `nut-grid`               | Grid layout         |
| `nut-button`             | Button              |
| `showToast`              | Toast message (API) |
| `showNotify`             | Notify (API)        |
| `showDialog`             | Dialog (API)        |
