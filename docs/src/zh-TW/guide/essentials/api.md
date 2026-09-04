# HTTP 與 API 層

REST 統一使用 `packages/api-client` 的 Axios 客戶端。應用的 `src/api` 保留相容重新匯出，不要各自建立 fetch 封裝。

網路契約為 `ApiResponse<T>`：`{ code, message, data, error? }`，成功碼為 0；函式直接回傳**解包後的 data**。商品列表回傳 `PaginationResponse<ProductItem>`，欄位為 `items、page、pageSize、total、hasMore`，不是陣列。

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

商品快取與分頁使用 `@vh5/mobile-ui/queries`；Request 頁只示範直接呼叫。

bootstrap 統一以 `configureApiClient` 設定地址、token、語言及 HTTP 401 回呼。請求按需帶上 Bearer token、`Accept-Language`、可選的 `X-Request-ID`；預設逾時 15 秒並啟用 credentials。

`ApiError.kind` 為 `business | configuration | http | network | timeout | unauthorized | unknown`。HTTP 401 清除工作階段並跳轉登入；HTTP 200 中的業務錯誤走不同分支。**尚未實作 token 自動更新**。端點須為相對 API base 的路徑。

新增端點時，先修改 `openapi/schema.yaml` 並執行 `pnpm api:generate`，再於 `packages/api-client/src/modules` 加入並匯出函式，同步 Nitro handler、測試及需要的 Query hook。生成型別只保障編譯期契約，不做執行期 schema 驗證。串流使用獨立的 `@vh5/ai-chat` fetch 通道。參見[請求架構](../v2/request.md)及[後端模式](./server.md)。
