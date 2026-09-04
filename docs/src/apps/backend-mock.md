# Nitro Mock Backend

`pnpm dev:<ui>` starts/reuses Nitro on port 5320. To run it alone, use `pnpm -F @vh5/backend-mock exec nitro dev --port 5320`. Do not deploy this fixture server as the production business backend.

| Method | Path | Result |
| --- | --- | --- |
| POST | `/api/auth/login` | public user + accessToken |
| POST | `/api/auth/logout` | refresh cookie cleared |
| POST | `/api/auth/refresh` | access token string (legacy endpoint) |
| GET | `/api/user/info` | user; Bearer token required |
| GET | `/api/product/list?page=1&pageSize=4` | paginated products |
| GET | `/api/product/detail?id=1` | product |
| POST | `/api/product/favorite` | `{ productId, favorite }` |
| POST | `/api/ai/chat` | SSE: start / delta / finish / [DONE] |

Nitro accounts: `user / 123456`, `admin / 123456`. Login returns public user fields and an access token, not a password. Access tokens last 7 days; refresh cookies last 30 days. The legacy refresh endpoint returns a token string and is not used by the browser client; there is no automatic refresh flow.

Products are localized from `Accept-Language` (English default, Chinese/Japanese supported). Favorite mutation validates and echoes the choice without durable storage. Chat sends real timed SSE chunks. There is **no `/api/upload` handler** and no completed upload page.

For the two companion services and mode switching, see [Backend modes](../guide/essentials/server.md). Their accounts, persistence and authentication are independent of Nitro fixtures.
