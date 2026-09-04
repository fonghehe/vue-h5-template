# 共有モバイル UI

`@vh5/mobile-ui` はソース直接参照で UI フレームワーク非依存です。業務画面、`FloatingAiButton`、`LanguageSelect`、安全な Markdown と SVG を公開。アプリが framework/session/endpoint props を渡します。UI ライブラリはこのパッケージに import しません。

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

[参照: UI](../guide/v2/ui-framework.md) · [参照: Query / Pinia](../guide/essentials/state.md) · [参照: i18n](../guide/essentials/locale.md)
