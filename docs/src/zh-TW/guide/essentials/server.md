# 後端模式

三個應用皆支援兩種模式，請選擇一條命令啟動：

```bash
pnpm dev:vant
pnpm dev:nutui
pnpm dev:varlet

pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

`dev:<ui>` 將 `/api/**` 代理到 5320 的 Nitro Mock。端口空閒時自動啟動，已佔用時不再啟動另一個實例，不需要獨立後端或 AI 金鑰。

`dev:services:<ui>` 載入 `.env.services` 並停用 Nitro。先依照兩個後端各自的 `.env.example` 設定，再分別執行：

這兩個後端是獨立的 Git 儲存庫，並未包含在前端專案中。請先複製到自己的工作目錄：

- [vue-h5-template-ai-service](https://github.com/fonghehe/vue-h5-template-ai-service) — AI 串流服務（連接埠 8001）
- [vue-h5-template-business-service](https://github.com/fonghehe/vue-h5-template-business-service) — 業務 API 服務（連接埠 8002）

```bash
git clone https://github.com/fonghehe/vue-h5-template-ai-service.git
git clone https://github.com/fonghehe/vue-h5-template-business-service.git
```

複製後，請依照各儲存庫 README 安裝執行環境。下方啟動命令須在各自的儲存庫目錄中，使用獨立終端機執行。

```bash
# vue-h5-template-ai-service/
uv sync
uv run uvicorn app.main:app --reload --port 8001

# vue-h5-template-business-service/
docker compose up --build
```

業務服務使用 Docker Compose 的 PostgreSQL；AI 預設 `AI_PROVIDER=mock`，仍是獨立串流服務。

```dotenv
VITE_GLOB_API_URL=/api
VITE_AI_API_BASE_URL=/api/ai
VITE_AI_CHAT_ENDPOINT=/api/ai/chat
VITE_NITRO_MOCK=false
VITE_API_TARGET=http://localhost:8002
VITE_AI_API_TARGET=http://localhost:8001
```

`/api/ai` 必須先於 `/api` 匹配，分別轉到 8001 與 8002。覆寫設定放在應用的 `.env.services.local`。共享代理位於 `internal/vite-config/src/backend-proxy.ts`；絕對 URL 的 `VITE_GLOB_API_URL` 不經開發代理。

登入資料由業務服務決定，不是 Nitro 帳號。若 `AI_AUTH_REQUIRED=true`，先登入業務服務並同步兩個後端的 JWT 設定。金鑰只留在後端。語言請求標頭不保證真實服務已有翻譯。REST 使用[共享 API](./api.md)，AI 使用 `FetchChatProvider`；正式環境需另設[反向代理](../v2/deployment.md)。
