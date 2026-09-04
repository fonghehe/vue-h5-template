# 共享移动 UI

`@vh5/mobile-ui` 直接消费源码，不依赖具体 UI 框架，提供共享业务页、`FloatingAiButton`、`LanguageSelect`、安全 Markdown 和 SVG 组件。应用包装传入框架/会话/端点参数，不要在包内导入三种 UI 库。

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

[参考: UI](../guide/v2/ui-framework.md) · [参考: Query / Pinia](../guide/essentials/state.md) · [参考: i18n](../guide/essentials/locale.md)
