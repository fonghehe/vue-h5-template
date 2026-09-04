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
