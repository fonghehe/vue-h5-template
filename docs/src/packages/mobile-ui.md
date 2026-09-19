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

## Favorites and chat suggestions

### Favorite interaction

`FavoriteButton` receives a numeric `productId` and the current `session` token. Signed-out users see a login link; no private-state request is sent. A valid signed-in product loads its saved state before enabling the action. Failed reads offer retry. Failed writes preserve the last confirmed state and display an error. Fetching or saving disables duplicate submissions.

Favorite state belongs to TanStack Query. Cache keys include the control instance, session generation and product ID; they do not contain the token. A mutation captures its original cache key, so a late response cannot overwrite another account or product. Each new mount/session reads the server again. The action sets an explicit boolean rather than asking the server to invert unknown state.

### Localized starter prompts

The chat empty state loads `GET /api/ai/suggestions` as a JSON request. The query is separated by language, remains fresh for five minutes, and disables automatic retries. While loading, on an empty result, or after failure, translated local prompts remain usable. Selecting a prompt follows the existing send/stop flow; this request does not change the SSE protocol or persist a conversation.

The client maps `zh-*` to `zh-CN`, `ja-*` to `ja-JP`, and other languages to `en-US`. FastAPI itself only accepts those three exact values; omission defaults to `en-US`, and unsupported values return HTTP 422. The explicit `locale` query parameter selects the prompts; do not rely on `Accept-Language` alone.

The monorepo derives the suggestion base URL from `ChatPage.endpoint` by removing its trailing `/chat`. Both that URL and locale are in the query key. Configure `VITE_AI_CHAT_ENDPOINT` consistently with the AI proxy. The request belongs in `@vh5/api-client`, while SSE remains in `@vh5/ai-chat`.

[API](./api-client.md) · [Mock](../apps/backend-mock.md) · [Tests](../guide/v2/testing.md)
