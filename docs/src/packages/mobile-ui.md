# Shared Mobile UI

`@vh5/mobile-ui` is source-consumed and framework-neutral. It provides the shared product pages, `FloatingAiButton`, `LanguageSelect`, safe Markdown and SVG components. App wrappers supply framework/session/endpoint props; do not import Vant, NutUI or Varlet into this package.

```ts
import HomePage from '@vh5/mobile-ui/HomePage.vue';
import FloatingAiButton from '@vh5/mobile-ui/FloatingAiButton.vue';
import { useCartStore } from '@vh5/mobile-ui/cart';
import { useProductPage, useInfiniteProducts } from '@vh5/mobile-ui/queries';
```

`src/surface.css` · `src/cart.ts` · `src/queries.ts` · `src/assets/icons`

```bash
pnpm -F @vh5/mobile-ui type-check
```

[Reference: UI](../guide/v2/ui-framework.md) · [Reference: Query / Pinia](../guide/essentials/state.md) · [Reference: i18n](../guide/essentials/locale.md)

## Cart and demo checkout

The shared `/list → /cart → /payment` flow uses `commerce.css` and each app’s theme tokens: Vant blue, NutUI red and Varlet purple. The catalog offers a bag/count shortcut and pill-shaped add buttons. Cart rows provide selection, removal and 44px quantity controls; the safe-area checkout bar opens the lazy payment page.

Choose WeChat Pay, Alipay or Bank card, then confirm. This is a frontend-only demo, with no payment SDK, backend order or real charge. The receipt uses the selected items’ total, while success intentionally clears the **entire persisted cart**, including unselected items. The receipt lives only in the current page; refreshing does not restore it. Empty or unselected carts cannot pay. This works identically with Mock and real-service data sources; real payments require a separate backend integration.

English, Chinese and Japanese labels are shared. Component tests cover quantity bounds, selection, removal, all payment methods and clearing persisted state. Playwright verifies the flow in all three apps, including 320px layouts and Japanese labels.
