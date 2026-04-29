# Vant

Mobile H5 app based on [Vant](https://vant-ui.github.io/vant/) 4.x.

## Features

- Vant components **on-demand loading**, auto-registered via `VantResolver` — no `app.use(Vant)` needed
- Full CSS loaded (`vant/lib/index.css`) to ensure Toast/Dialog functional components render correctly
- Built-in `showToast`, `showDialog` API-style calls

## Run

```bash
pnpm dev:vant
```

Default port: `5778`

## On-demand Loading

```ts
// bootstrap.ts
// ✅ Import global base styles only; Vant component CSS is injected on-demand by VantResolver
import "@vh5/styles/global";
// ❌ Do NOT use app.use(Vant) for global registration
// ❌ Do NOT import vant/lib/index.css (conflicts with Resolver on-demand injection)
```

`VantResolver` defaults to `importStyle: true`, automatically injecting each component's CSS when used, ensuring correct style load order.

## Vant Components Used

| Component                     | Usage               |
| ----------------------------- | ------------------- |
| `van-nav-bar`                 | Top navigation bar  |
| `van-tabbar`                  | Bottom tab bar      |
| `van-cell` / `van-cell-group` | Product list / item |
| `van-swipe`                   | Carousel            |
| `van-form` / `van-field`      | Login form          |
| `van-image`                   | Image display       |
| `van-button`                  | Button              |
| `van-tag`                     | Tag                 |
| `van-empty`                   | Empty state         |
| `van-back-top`                | Back to top         |
| `showToast`                   | Toast message (API) |
| `showDialog`                  | Dialog (API)        |
