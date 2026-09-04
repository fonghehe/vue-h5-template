# Request 架構

Mock 同真實服務使用獨立嘅持久化 Session 命名空間，切換後請重新登入。可以喺 `.env.services.local` 覆寫服務地址，再重啟 Vite。流動除錯面板預設關閉，需要時先設定 `VITE_ERUDA_ENABLED=true`，避免遮住導覽。

`openapi/schema.yaml` 經 `pnpm api:generate` 產生 TypeScript Types。Axios 統一加 Token 同 Request ID、解包 `ApiResponse<T>`，再用 `ApiError` 區分 Business、HTTP、401、Timeout 同 Network Error。

401 會清除登入狀態；Redirect 必須經 `getSafeRedirect`。唔好手動修改 Generated Types。

Endpoint module 僅允許相對 URL。客戶端會在附加認證標頭之前拒絕絕對地址；切換可信後端應設定 `baseURL`。

## Mock 同真實服務模式

三套 H5 應用共用同一個切換方式：

```bash
# Nitro Mock：唔需要外部資料庫或服務
pnpm dev:vant
pnpm dev:nutui
pnpm dev:varlet

# 真實雙服務：揀一套 UI 應用
pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

使用真實服務模式前，請喺兩個獨立終端啟動配套 repository：

```bash
# vue-h5-template-business-service
cp .env.example .env
docker compose up --build

# vue-h5-template-ai-service
cp .env.example .env
uv sync
make dev
```

真實服務模式會讀取 `apps/<app>/.env.services`。`/api/ai/**` 代理到 `http://localhost:8001` 嘅 `vue-h5-template-ai-service`，其餘 `/api/**` 代理到 `http://localhost:8002` 嘅 `vue-h5-template-business-service`。AI 規則優先註冊，唔會畀 Business fallback 截住。

| 前端路徑 | 開發目標 | 職責 |
| --- | --- | --- |
| `/api/ai/chat` | AI Service `:8001` | Provider 無關嘅 SSE 對話 |
| `/api/auth/**` | Business Service `:8002` | 登入、更新同登出 |
| `/api/user/**` | Business Service `:8002` | 目前用戶同收藏 |
| `/api/product/**` | Business Service `:8002` | 商品目錄同詳情 |

瀏覽器一直呼叫同源相對 URL，可以保留 refresh cookie、Bearer token 同 SSE 行為，亦避免開發環境 CORS 差異。服務位置唔同時調整 `VITE_API_TARGET` 同 `VITE_AI_API_TARGET`；唔好將 Provider 密鑰放入前端環境變數。
