# HTTP 同 API 層

REST 統一用 `packages/api-client` 嘅 Axios client。應用 `src/api` 保留相容 re-export，唔好每個應用另建 fetch 封裝。

網絡契約係 `ApiResponse<T>`：`{ code, message, data, error? }`，成功碼係 0；函式直接回傳**解包後嘅 data**。商品列表回傳 `PaginationResponse<ProductItem>`，包含 `items、page、pageSize、total、hasMore`，唔係陣列。

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

商品快取同分頁用 `@vh5/mobile-ui/queries`；Request 頁只示範直接呼叫。

bootstrap 統一用 `configureApiClient` 設定地址、token、語言同 HTTP 401 callback。請求按需要附上 Bearer token、`Accept-Language`、可選嘅 `X-Request-ID`；預設 timeout 15 秒並啟用 credentials。

`ApiError.kind` 係 `business | configuration | http | network | timeout | unauthorized | unknown`。HTTP 401 清除 session 再去登入頁；HTTP 200 入面嘅業務錯誤係另一個分支。**未實作 token 自動更新**。端點要用相對 API base 嘅路徑。

新增端點要先改 `openapi/schema.yaml` 並執行 `pnpm api:generate`，再喺 `packages/api-client/src/modules` 加入同匯出函式，同步 Nitro handler、測試同所需 Query hook。生成型別只保障編譯期契約，唔做 runtime schema 驗證。串流用獨立嘅 `@vh5/ai-chat` fetch 通道。參見[請求架構](../v2/request.md)同[後端模式](./server.md)。
