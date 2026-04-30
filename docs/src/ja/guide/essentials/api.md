# HTTP と API 層

HTTP スタックは責務ごとに 3 つのパッケージに分割されています。

| パッケージ      | 責務                                                                |
| --------------- | ------------------------------------------------------------------- |
| `@vh5/request`  | 型付き `fetch` ラッパー・インターセプター・Token 更新・エラー正規化 |
| `@vh5/api`      | エンドポイント定義とリクエスト/レスポンス DTO（副作用なし）         |
| `@vh5/services` | ドメインサービス。`@vh5/api` を消費してドメインモデルを返す         |

アプリと特性モジュールは **`fetch` を直接呼び出しません**。

## 1. リクエストクライアント（`@vh5/request`）

```ts
export const request = createRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 15_000,
});

// Access Token を注入
request.interceptors.request.use((config) => {
  const token = useAuthStore().accessToken;
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

// 401 時に単一リクエストでリフレッシュ
request.interceptors.response.use(undefined, async (error) => {
  if (error.httpStatus === 401 && !error.config._retried) {
    await useAuthStore().refresh();
    error.config._retried = true;
    return request(error.config);
  }
  throw error;
});
```

`RequestError` の構造：

```ts
class RequestError extends Error {
  code: number; // バックエンドのビジネスコード
  httpStatus: number; // HTTP ステータスコード
  payload?: unknown; // 生のレスポンスボディ
  config: RequestConfig; // 元のリクエスト設定
}
```

## 2. API SDK（`@vh5/api`）

エンドポイントは純粋な宣言です。Vue・Pinia・Toast を一切インポートしません。

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

## 3. ドメインサービス（`@vh5/services`）

サービス層は DTO をドメインモデルに変換し、ビジネスルールを一元管理します。

```ts
// packages/services/src/product.service.ts
export interface Product {
  id: number;
  title: string;
  price: number; // ドメインモデルでは number（string ではない）
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

## 4. View でのサービス利用

テンプレートから直接サービスを呼び出すのではなく、特性 Composable を経由します。Composable は `loading`・`error`・キャンセル・リフレッシュを管理します。

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

## 5. 新しいエンドポイントの追加

1. `packages/api/src/<domain>.ts` に DTO とエンドポイントを追加。
2. ドメイン変換が必要な場合は `packages/services/src/<domain>.service.ts` に追加。
3. 特性パッケージの Composable でラップ（`packages/features/<domain>/composables/`）。
4. View で Composable を使用。
