# 共享行動 UI

`@vh5/mobile-ui` 直接使用原始碼，與 UI 框架無關；公開業務頁、AI 按鈕、語言選單、安全 Markdown、SVG。應用傳入框架/工作階段/端點 props，不要於包內匯入 UI 庫。

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

[參考: UI](../guide/v2/ui-framework.md) · [參考: Query / Pinia](../guide/essentials/state.md) · [參考: i18n](../guide/essentials/locale.md)
