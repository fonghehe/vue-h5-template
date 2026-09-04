# State Management

v2 separates state by ownership.

| State | Owner | Examples |
| --- | --- | --- |
| Client state | Pinia | access token, user preferences, cart selection |
| Server state | TanStack Query | product pages, caching, retries, mutations |
| Local interaction | Vue refs | form drafts, selected tab, dialog visibility |
| Streaming conversation | `useStreamingChat` | messages, controller, stream status, retry |

Do not copy query results into Pinia. It creates two caches with different invalidation rules. Query keys must include every input that changes the response. Mutations invalidate or update the smallest matching key.

`/examples/query` demonstrates a standard paginated query, mutation and infinite query. The application installs one `QueryClient` with a short stale time and a single retry suitable for mobile networks.

The cart store keeps only user-owned cart lines, quantity and selection. It may persist locally; product list fetching, loading and retry state must not move into that store.

Language preference is managed by Vue I18n and localStorage, not Pinia.
