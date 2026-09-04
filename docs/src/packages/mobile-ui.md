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

## Focused navigation

The four bottom tabs are the primary navigation. Home is an informational overview without duplicate feature links or a language selector. Member itself is the personal center: it shows the supplied avatar/name, login status, account information and preferences, with login/logout as appropriate. It does not invent editable profile fields or new backend endpoints. Language switching is available only here.

The catalog provides the primary cart entry; Details returns to the catalog instead of adding another cart shortcut. AI Chat uses only the shared floating button, not Home cards or an Examples row. Examples is the sole menu for Query, Request, Mobile Web APIs, SVG, PWA and native components. Back/continue links within checkout remain workflow controls. All three apps share this structure and retain their own theme.

## Bottom spacing

Shared pages use a 20px bottom content gap. In-flow tabs explicitly handle the bottom safe area, so tab pages do not reserve it a second time. Pages without tabs keep their safe-area inset. Cart and Payment render `CommerceDock` only while checkout controls are present: its ResizeObserver measures the fixed bar (including safe area and wrapped labels), and a matching in-flow spacer prevents content overlap. The page adds only the 20px gap, not another safe-area inset. Empty carts and payment success remove the bar and spacer together; Catalog never reserves a checkout bar.
