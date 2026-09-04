# 後端模式

三個應用都支援兩種模式，請揀一條命令啟動：

```bash
pnpm dev:vant
pnpm dev:nutui
pnpm dev:varlet

pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

`dev:<ui>` 將 `/api/**` 代理到 5320 嘅 Nitro Mock。Port 有空位先自動啟動，已佔用就唔會再開另一個實例，唔使獨立後端或者 AI key。

`dev:services:<ui>` 載入 `.env.services` 並停用 Nitro。先按兩個後端各自嘅 `.env.example` 設定，再分別執行：

```bash
# vue-h5-template-ai-service/
uv sync
uv run uvicorn app.main:app --reload --port 8001

# vue-h5-template-business-service/
docker compose up --build
```

業務服務用 Docker Compose 嘅 PostgreSQL；AI 預設 `AI_PROVIDER=mock`，仍然係獨立串流服務。

```dotenv
VITE_GLOB_API_URL=/api
VITE_AI_API_BASE_URL=/api/ai
VITE_AI_CHAT_ENDPOINT=/api/ai/chat
VITE_NITRO_MOCK=false
VITE_API_TARGET=http://localhost:8002
VITE_AI_API_TARGET=http://localhost:8001
```

`/api/ai` 要先過 `/api` 匹配，分別轉去 8001 同 8002。覆寫設定放喺應用嘅 `.env.services.local`。共享代理位於 `internal/vite-config/src/backend-proxy.ts`；絕對 URL 嘅 `VITE_GLOB_API_URL` 唔經開發代理。

登入資料由業務服務決定，唔係 Nitro 帳號。若 `AI_AUTH_REQUIRED=true`，先登入業務服務並同步兩邊 JWT 設定。密鑰只留喺後端。語言 header 唔保證真實服務已有翻譯。REST 用[共享 API](./api.md)，AI 用 `FetchChatProvider`；正式環境要另設[反向代理](../v2/deployment.md)。
