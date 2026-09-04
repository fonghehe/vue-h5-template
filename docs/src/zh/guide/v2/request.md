# 请求架构

Mock 与真实服务使用独立的持久化会话命名空间，切换后需要重新登录。可在 `.env.services.local` 覆盖服务地址，然后重启 Vite。移动调试面板默认关闭；需要时显式设置 `VITE_ERUDA_ENABLED=true`，避免它遮挡导航。

`packages/api-client` 是共享的类型安全 REST Client。

```text
openapi/schema.yaml → pnpm api:generate → generated/schema.d.ts
→ types.ts → modules/*.ts → Query / Store / Page
```

Axios Client 会解包 `ApiResponse<T>`，页面直接得到 `T`。请求拦截器统一添加 Token 和可选 `X-Request-ID`；响应层使用 `ApiError` 区分业务错误、HTTP、401、超时、断网和未知错误。页面使用 `unknown` 与 `getErrorMessage`，不再出现 `catch (error: any)`。

Client 在 Pinia 初始化后配置一次。401 回调会清除认证状态并跳转登录页；登录回跳必须经过 `getSafeRedirect`，避免开放重定向。

接入真实后端时，替换 OpenAPI Schema，运行 `pnpm api:generate`，再调整很薄的 endpoint modules。不要手工修改生成文件。

Endpoint module 只允许相对 URL。客户端会在附加认证头之前拒绝绝对地址；切换可信后端应配置 `baseURL`，不要在页面传入完整 URL。

## Mock 与真实服务模式

三套 H5 应用使用同一套切换方式：

```bash
# Nitro Mock：不需要外部数据库或后端服务
pnpm dev:vant
pnpm dev:nutui
pnpm dev:varlet

# 真实双服务：选择一套 UI 应用启动
pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

使用真实服务模式前，在两个独立终端启动配套仓库：

```bash
# vue-h5-template-business-service
cp .env.example .env
docker compose up --build

# vue-h5-template-ai-service
cp .env.example .env
uv sync
make dev
```

真实服务模式读取 `apps/<app>/.env.services`：`/api/ai/**` 转发到 `http://localhost:8001` 的 `vue-h5-template-ai-service`，其他 `/api/**` 请求转发到 `http://localhost:8002` 的 `vue-h5-template-business-service`。AI 规则优先注册，不会被业务服务的 `/api` 兜底规则截获。

| 前端路径 | 开发目标 | 职责 |
| --- | --- | --- |
| `/api/ai/chat` | AI Service `:8001` | Provider 无关的 SSE 对话 |
| `/api/auth/**` | Business Service `:8002` | 登录、刷新与登出 |
| `/api/user/**` | Business Service `:8002` | 当前用户与收藏 |
| `/api/product/**` | Business Service `:8002` | 商品列表与详情 |

浏览器始终请求相对的同源地址，因此刷新 Cookie、Bearer Token 和 SSE 行为与生产网关一致，也不会产生开发环境 CORS 分歧。服务地址不同时修改 `VITE_API_TARGET` 和 `VITE_AI_API_TARGET`；它们只是开发代理地址，不能存放 Provider 密钥。
