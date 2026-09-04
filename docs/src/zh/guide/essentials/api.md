# HTTP 与 API 层

REST 请求统一通过 `packages/api-client` 中的 Axios 客户端。应用 `src/api` 仅保留共享接口的兼容导出，不要在每个应用里另建 fetch 封装。

## 对外契约

网络响应为 `ApiResponse<T>`：`{ code, message, data, error? }`，成功码为 0。接口函数直接返回**解包后的数据**。商品列表返回含 `items、page、pageSize、total、hasMore` 的 `PaginationResponse<ProductItem>`，不是数组。

```ts
import { getProductList, loginApi, isApiError } from '@vh5/api-client';

const session = await loginApi({ username: 'user', password: '123456' });
const products = await getProductList({ page: 1, pageSize: 4 });
console.log(session.accessToken, products.items, products.hasMore);

try {
  await getProductList({ page: 2 });
} catch (error: unknown) {
  if (isApiError(error)) console.error(error.kind, error.message);
}
```

商品页的缓存、分页使用 `@vh5/mobile-ui/queries`。Request 示例演示直接调用，不是另一套服务端状态仓库。

## 初始化与错误

每个应用在 bootstrap 中统一调用 `configureApiClient`，配置地址、当前 token、当前语言与 HTTP 401 回调。请求按需携带 Bearer token、`Accept-Language` 和可选的 `X-Request-ID`；默认超时 15 秒，开启 credentials。

`ApiError.kind` 为 `business | configuration | http | network | timeout | unauthorized | unknown`。HTTP 401 清除会话并跳转登录；HTTP 200 内的业务错误码不走同一分支。当前**未实现自动刷新 token**。接口路径必须相对于配置的 API base。

## 新增接口

1. 修改 `openapi/schema.yaml`，运行 `pnpm api:generate`。
2. 在 `packages/api-client/src/modules` 添加并导出类型化函数。
3. 添加 Nitro handler 和行为测试。
4. 有缓存或 mutation 需求时添加 Query hook。

生成声明只提供编译期契约，不做运行时 schema 校验。Streaming 使用独立的 `@vh5/ai-chat` fetch 通道。参见[请求架构](../v2/request.md)和[后端模式](./server.md)。
