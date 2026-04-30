# HTTP 與 API 層

HTTP 棧拆分為三個套件，每個套件職責單一：

| 套件            | 職責                                                |
| --------------- | --------------------------------------------------- |
| `@vh5/request`  | 型別化 `fetch` 封裝、攔截器、Token 刷新、錯誤標準化 |
| `@vh5/api`      | 介面定義與請求/響應 DTO（無副作用）                 |
| `@vh5/services` | 領域服務，消費 `@vh5/api` 並回傳領域模型            |

應用與特性模組**不直接呼叫** `fetch`。

## 1. 請求客戶端（`@vh5/request`）

```ts
export const request = createRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 15_000,
});

// 注入 Access Token
request.interceptors.request.use((config) => {
  const token = useAuthStore().accessToken;
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

// 401 時單請求刷新
request.interceptors.response.use(undefined, async (error) => {
  if (error.httpStatus === 401 && !error.config._retried) {
    await useAuthStore().refresh();
    error.config._retried = true;
    return request(error.config);
  }
  throw error;
});
```

`RequestError` 資料結構：

```ts
class RequestError extends Error {
  code: number; // 後端業務碼
  httpStatus: number; // HTTP 狀態碼
  payload?: unknown; // 原始響應體
  config: RequestConfig; // 原始請求設定
}
```

## 2. API SDK（`@vh5/api`）

介面定義為純聲明——不引入 Vue、Pinia 或 Toast。

```ts
// packages/api/src/product.ts
export interface ProductDTO {
  id: number;
  title: string;
  price: string;
  imgUrl: string;
  description?: string;
}

export const productApi = {
  list: (params: { page: number; size: number }) =>
    request.get<{ items: ProductDTO[]; total: number }>("/product/list", { params }),
  detail: (id: number) => request.get<ProductDTO>("/product/detail", { params: { id } }),
};
```

## 3. 領域服務（`@vh5/services`）

服務層將 DTO 轉換為領域模型，集中業務規則。

```ts
// packages/services/src/product.service.ts
export interface Product {
  id: number;
  title: string;
  price: number; // 領域模型使用 number 而非 string
  imgUrl: string;
  description: string;
}

export const ProductService = {
  async getList(page = 1, size = 20) {
    const { items, total } = await productApi.list({ page, size });
    return { items: items.map(toProduct), total };
  },
  getDetail: (id: number) => productApi.detail(id).then(toProduct),
};
```

## 4. 在視圖中消費服務

透過特性 Composable 而非直接在範本中呼叫服務。Composable 負責管理 `loading`、`error`、取消與刷新。

```ts
// packages/features/product/composables/use-product-detail.ts
import { ProductService } from "@vh5/services";
import { tryOnScopeDispose } from "@vueuse/core";

export function useProductDetail(id: MaybeRef<number>) {
  const data = ref<Product | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);
  const ac = new AbortController();
  tryOnScopeDispose(() => ac.abort());

  watch(
    () => unref(id),
    async (value) => {
      if (!value) return;
      loading.value = true;
      try {
        data.value = await ProductService.getDetail(value);
        error.value = null;
      } catch (err) {
        error.value = err as Error;
      } finally {
        loading.value = false;
      }
    },
    { immediate: true },
  );

  return { data, error, loading };
}
```

## 5. 新增介面

1. 在 `packages/api/src/<domain>.ts` 中新增 DTO 及介面定義。
2. 如需領域轉換，在 `packages/services/src/<domain>.service.ts` 中新增。
3. 在特性套件的 Composable 中封裝（`packages/features/<domain>/composables/`）。
4. 在視圖中使用該 Composable。
