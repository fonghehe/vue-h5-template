# @vh5/api-client

共享类型化 Axios REST 客户端，在 bootstrap 统一配置。接口直接返回 data，UI 处理 `ApiError`，不解析响应包装。

`createApiClient` · `configureApiClient` · `httpClient` · `ApiError` · `isApiError` · `getErrorMessage`

`loginApi` · `logoutApi` · `fetchUserInfoApi` · `getProductList` · `getProductDetail` · `toggleProductFavorite`

```bash
pnpm api:generate
pnpm -F @vh5/api-client type-check
```

[参考: API](../guide/essentials/api.md) · [参考: Mock / services](../guide/essentials/server.md)

## REST 契约与请求取消

以下函数直接返回解包后的数据，并通过 `ApiError` 拒绝失败请求。读取操作应转发 Query 的 `AbortSignal`。收藏写入使用 bootstrap 统一配置的登录客户端，不接受调用方提供的用户 ID。

```ts
import { getProductFavorite, setProductFavorite, getChatSuggestions } from '@vh5/api-client';

const state = await getProductFavorite(1, signal);
await setProductFavorite(1, !state.favorite);
const prompts = await getChatSuggestions('zh-TW', signal, '/api/ai');
```

客户端把 `zh-*` 映射为 `zh-CN`、`ja-*` 映射为 `ja-JP`，其他语言映射为 `en-US`。FastAPI 本身只接受这三个精确值，省略时默认 `en-US`，非法值返回 HTTP 422。语言由显式 `locale` 查询参数决定，不能只依赖 `Accept-Language`。

Monorepo 从 `ChatPage.endpoint` 移除末尾 `/chat` 得到建议接口 base URL，并把该地址与语言都加入缓存键。`VITE_AI_CHAT_ENDPOINT` 应与 AI 代理配置一致。JSON 请求位于 `@vh5/api-client`，SSE 协议继续放在 `@vh5/ai-chat`。

[UI](./mobile-ui.md) · [Mock](../apps/backend-mock.md)
