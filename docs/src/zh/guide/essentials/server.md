# 后端模式

三个应用都支持以下两种模式。选择一条命令启动目标应用，不要在一个终端依次执行所有命令。

```bash
pnpm dev:vant
pnpm dev:nutui
pnpm dev:varlet

pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

## 本地 Nitro Mock

`dev:<ui>` 使用 development 模式，将 `/api/**` 转发到 5320 端口。端口空闲时 Vite 插件启动 Nitro；已占用时复用该端口，不会再启动第二个 Mock 实例。不需要独立后端或 AI 密钥。

## 配套服务

`dev:services:<ui>` 加载应用的 `.env.services`，不启动 Nitro。先根据两个后端仓库各自的 `.env.example` 完成配置，再分别启动：

```bash
# vue-h5-template-ai-service/
uv sync
uv run uvicorn app.main:app --reload --port 8001

# vue-h5-template-business-service/
docker compose up --build
```

业务服务通过 Docker Compose 使用 PostgreSQL。AI 服务默认 `AI_PROVIDER=mock`，即使没有模型密钥，也是真正独立的流式服务。

```dotenv
VITE_GLOB_API_URL=/api
VITE_AI_API_BASE_URL=/api/ai
VITE_AI_CHAT_ENDPOINT=/api/ai/chat
VITE_NITRO_MOCK=false
VITE_API_TARGET=http://localhost:8002
VITE_AI_API_TARGET=http://localhost:8001
```

代理**先匹配** `/api/ai`，再匹配 `/api`：AI 请求到 8001，业务请求到 8002。可在应用 `.env.services.local` 覆盖目标地址；共享逻辑位于 `internal/vite-config/src/backend-proxy.ts`。绝对地址的 `VITE_GLOB_API_URL` 不走开发代理。

服务模式的登录与账号数据由业务服务决定，不使用 Nitro 测试账号。若启用 `AI_AUTH_REQUIRED=true`，先登录业务服务，并确保两后端 JWT 配置一致。模型密钥和签名密钥只能放在后端。

## 边界

REST 使用[共享 API 客户端](./api.md)，AI 使用 `FetchChatProvider`。语言请求头只是偏好，不保证真实后端已翻译内容。Vite 代理仅用于开发，生产环境需配置 API 网关或反向代理，参见[部署](../v2/deployment.md)。
