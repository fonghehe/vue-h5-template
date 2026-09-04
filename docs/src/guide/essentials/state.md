# State Management

Pinia owns session/client state; TanStack Query owns product data, loading, retries, pagination and mutations; Vue refs own local interactions. Chat state belongs to `useStreamingChat`. Language belongs to Vue I18n plus `vh5:locale` in localStorage.

All apps install one QueryClient in bootstrap with `staleTime: 30_000` and `retry: 1`. `packages/mobile-ui/src/queries.ts` exposes `useProductPage(page, pageSize)` and `useInfiniteProducts(pageSize)`; keys include locale. `/examples/query` demonstrates pagination, favorite mutation and explicit load-more (not automatic viewport-triggered infinite scrolling). Do not mirror results in Pinia.

Session stores are `apps/h5-vant/src/stores/user.ts`, `apps/h5-varlet/src/stores/user.ts`, and `apps/h5-nutui/src/store/modules/user.ts`. Their login action calls the typed API and stores the returned token and public user data. The shared cart stores user-selected product snapshots, quantity and selection; it is not a backend-synchronized cart.

`initStores(app, { namespace })` installs Pinia and persistence under `${namespace}-${storeId}`. Its default is localStorage in development and SecureLS in production, but current user/cart stores explicitly select localStorage in both modes. Browser-side encryption is not a security boundary against XSS. `resetAllStores()` resets Pinia, not Query caches or language preferences.

See [state boundaries](../v2/state-management.md) and [API](./api.md).
