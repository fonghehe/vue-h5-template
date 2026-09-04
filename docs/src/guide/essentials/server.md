# Backend Modes

All three apps support the same two modes. Choose one of the following commands; do not run all commands in one terminal.

```bash
pnpm dev:vant
pnpm dev:nutui
pnpm dev:varlet

pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

## Local Nitro Mock

`dev:<ui>` uses development mode and proxies `/api/**` to Nitro at port 5320. The Vite plugin starts Nitro when the port is available; an occupied port is reused without starting another mock instance. No separate backend or AI key is required.

## Companion services

`dev:services:<ui>` loads the app's `.env.services` and does not start Nitro. Start the two companion repositories first (configure each from its own `.env.example`):

```bash
# vue-h5-template-ai-service/
uv sync
uv run uvicorn app.main:app --reload --port 8001

# vue-h5-template-business-service/
docker compose up --build
```

The business service uses PostgreSQL through Docker Compose. The AI service defaults to `AI_PROVIDER=mock`; this is a real separate streaming service even without a model key.

```dotenv
VITE_GLOB_API_URL=/api
VITE_AI_API_BASE_URL=/api/ai
VITE_AI_CHAT_ENDPOINT=/api/ai/chat
VITE_NITRO_MOCK=false
VITE_API_TARGET=http://localhost:8002
VITE_AI_API_TARGET=http://localhost:8001
```

`/api/ai` is matched **before** `/api`: AI traffic goes to 8001, business traffic to 8002. Override targets in the app's `.env.services.local`; shared proxy code is `internal/vite-config/src/backend-proxy.ts`. An absolute `VITE_GLOB_API_URL` bypasses the development proxy.

Service login and account data come from the business service, not Nitro fixtures. If `AI_AUTH_REQUIRED=true`, sign in through the business service and align both services' JWT settings. Keep provider keys and signing secrets on the server.

## Boundaries

REST uses [the shared API client](./api.md); AI uses `FetchChatProvider`. The language header expresses preference, not a guarantee that a real backend translates its content. Vite proxies exist only in development; production needs an API gateway/reverse proxy. See [deployment](../v2/deployment.md).
