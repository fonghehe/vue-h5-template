# Varlet

Mobile H5 app based on [Varlet](https://varlet.pages.dev/) 3.x.

## Features

- Varlet components **fully on-demand**, auto-registered and CSS injected via `VarletImportResolver` — no `app.use(Varlet)` needed
- Material Design style
- Built-in Snackbar API component

## Run

```bash
pnpm dev:varlet
```

Default port: `5779`

## On-demand Loading

```ts
// bootstrap.ts — no global registration needed, VarletImportResolver handles everything
import "@vh5/styles/global";
// ❌ No longer using app.use(Varlet) or full CSS import
```

## Varlet Components Used

| Component               | Usage               |
| ----------------------- | ------------------- |
| `var-app-bar`           | Top navigation bar  |
| `var-bottom-navigation` | Bottom tab bar      |
| `var-cell`              | Product list / item |
| `var-swipe`             | Carousel            |
| `var-input`             | Input field         |
| `var-image`             | Image display       |
| `var-button`            | Button              |
| `var-space`             | Spacing layout      |
| `Snackbar`              | Toast message (API) |
