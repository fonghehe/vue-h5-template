# Request Architecture

The Mock and service modes use separate persisted session namespaces; sign in again after switching. Override service addresses in `.env.services.local` and restart Vite. `VITE_ERUDA_ENABLED=true` explicitly enables the mobile debug panel; it is off by default so it cannot cover navigation.

`packages/api-client` is the shared typed REST client.

```text
openapi/schema.yaml
  └─ pnpm api:generate
      └─ generated/schema.d.ts
          └─ types.ts → modules/*.ts → app query/store/page
```

The Axios client unwraps `ApiResponse<T>`, so consumers receive `T`. Request interceptors attach the bearer token and optional `X-Request-ID`. Response handling distinguishes business, HTTP, unauthorized, timeout, network and unknown failures through `ApiError`.

```ts
try {
  const page = await getProductList({ page: 1, pageSize: 10 });
  console.log(page.items);
} catch (error: unknown) {
  showToast(getErrorMessage(error));
}
```

Configure the singleton once after Pinia initialization. A 401 callback clears auth and redirects to login. Login redirect values must pass `getSafeRedirect`.

Endpoint modules use relative URLs only. The client rejects absolute endpoints before it attaches authentication headers; configure a different trusted backend through `baseURL` instead.

To use a real backend, replace `openapi/schema.yaml`, run `pnpm api:generate`, adapt the small endpoint modules, and set the proxy/base URL. Do not edit the generated file manually.

## Mock and service modes

All three H5 apps support the same two development modes:

```bash
# Nitro mock: no external database or service is required
pnpm dev:vant
pnpm dev:nutui
pnpm dev:varlet

# Real service pair: choose one UI application
pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

Run the companion repositories in separate terminals before entering service mode:

```bash
# vue-h5-template-business-service
cp .env.example .env
docker compose up --build

# vue-h5-template-ai-service
cp .env.example .env
uv sync
make dev
```

Service mode reads `apps/<app>/.env.services`. `/api/ai/**` is proxied to `vue-h5-template-ai-service` at `http://localhost:8001`; all other `/api/**` requests go to `vue-h5-template-business-service` at `http://localhost:8002`. The specific AI rule is registered first, so it is not swallowed by the business fallback.

| Frontend path | Development target | Responsibility |
| --- | --- | --- |
| `/api/ai/chat` | AI service `:8001` | Provider-neutral SSE chat |
| `/api/auth/**` | Business service `:8002` | Login, refresh and logout |
| `/api/user/**` | Business service `:8002` | Current user and favourites |
| `/api/product/**` | Business service `:8002` | Catalogue and product detail |

The browser still calls relative same-origin URLs. This preserves refresh cookies, forwards bearer tokens, avoids development CORS differences and lets production use the same paths behind a gateway. Change `VITE_API_TARGET` and `VITE_AI_API_TARGET` if the services run elsewhere; these values are development proxy destinations, never provider secrets.
