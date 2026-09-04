# 請求架構

Mock 與真實服務使用獨立的持久化工作階段命名空間，切換後請重新登入。可在 `.env.services.local` 覆寫服務位址，再重新啟動 Vite。行動除錯面板預設關閉，需要時才設定 `VITE_ERUDA_ENABLED=true`，避免遮擋導覽。

`openapi/schema.yaml` 經 `pnpm api:generate` 產生 TypeScript 型別。Axios 統一加入 Token 與 Request ID、解包 `ApiResponse<T>`，並以 `ApiError` 區分業務、HTTP、401、Timeout 與 Network Error。

401 會清除登入狀態；回跳 URL 必須經 `getSafeRedirect`。產生的型別檔案不可手動修改。

Endpoint module 僅允許相對 URL。客戶端會在附加認證標頭之前拒絕絕對地址；切換可信後端應設定 `baseURL`。

## Mock 與真實服務模式

三套 H5 應用共用相同的切換方式：

```bash
# Nitro Mock：不需要外部資料庫或服務
pnpm dev:vant
pnpm dev:nutui
pnpm dev:varlet

# 真實雙服務：選擇一套 UI 應用
pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

使用真實服務模式前，請在兩個獨立終端啟動配套儲存庫：

```bash
# vue-h5-template-business-service
cp .env.example .env
docker compose up --build

# vue-h5-template-ai-service
cp .env.example .env
uv sync
make dev
```

真實服務模式讀取 `apps/<app>/.env.services`。`/api/ai/**` 會代理到 `http://localhost:8001` 的 `vue-h5-template-ai-service`，其餘 `/api/**` 代理到 `http://localhost:8002` 的 `vue-h5-template-business-service`。AI 規則會優先註冊，不會被 Business fallback 攔截。

| 前端路徑 | 開發目標 | 職責 |
| --- | --- | --- |
| `/api/ai/chat` | AI Service `:8001` | Provider 無關的 SSE 對話 |
| `/api/auth/**` | Business Service `:8002` | 登入、更新與登出 |
| `/api/user/**` | Business Service `:8002` | 目前使用者與收藏 |
| `/api/product/**` | Business Service `:8002` | 商品目錄與詳情 |

瀏覽器始終呼叫同源相對 URL，可保留 refresh cookie、Bearer token 與 SSE 行為，並避免開發環境 CORS 差異。服務位置不同時調整 `VITE_API_TARGET` 和 `VITE_AI_API_TARGET`；請勿把 Provider 密鑰放進前端環境變數。
