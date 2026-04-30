# HTTP 与 API 层

HTTP 栈拆分为三个包，每个包职责单一：

| 包              | 职责                                                |
| --------------- | --------------------------------------------------- |
| `@vh5/request`  | 类型化 `fetch` 封装、拦截器、Token 刷新、错误标准化 |
| `@vh5/api`      | 接口定义与请求/响应 DTO（无副作用）                 |
| `@vh5/services` | 领域服务，消费 `@vh5/api` 并返回领域模型            |

应用和特性模块**不直接调用** `fetch`。

## 1. 请求客户端（`@vh5/request`）

```ts
// packages/request/src/client.ts
import { createRequest } from "./core";
import { useAuthStore } from "@vh5/feature-auth/store";

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

// 401 时单请求刷新
request.interceptors.response.use(undefined, async (error) => {
  if (error.httpStatus === 401 && !error.config._retried) {
    await useAuthStore().refresh();
    error.config._retried = true;
    return request(error.config);
  }
  throw error;
});
```

`RequestError` 数据结构：

```ts
class RequestError extends Error {
  code: number; // 后端业务码
  httpStatus: number; // HTTP 状态码
  payload?: unknown; // 原始响应体
  config: RequestConfig; // 原始请求配置
}
```

单请求可配置项：

```ts
request.get<Product>("/product/detail", {
  params: { id },
  silent: true, // 不触发全局 Toast
  retry: { count: 2 }, // 指数退避重试
  signal, // AbortController
});
```

## 2. API SDK（`@vh5/api`）

接口定义为纯声明——不引入 Vue、Pinia 或 Toast。

```ts
// packages/api/src/auth.ts
import { request } from "@vh5/request";

export interface LoginPayload {
  username: string;
  password: string;
}
export interface LoginResponseDTO {
  accessToken: string;
  id: number;
  username: string;
  realName: string;
  avatar: string;
  roles: string[];
}

export const authApi = {
  login: (payload: LoginPayload) => request.post<LoginResponseDTO>("/auth/login", payload),
  logout: () => request.post<void>("/auth/logout"),
  refresh: () => request.post<{ accessToken: string }>("/auth/refresh"),
};
```

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

## 3. 领域服务（`@vh5/services`）

服务层将 DTO 转换为领域模型，并集中业务规则。视图和 Store 依赖服务，而非直接依赖 `@vh5/api`。

```ts
// packages/services/src/product.service.ts
import { productApi, type ProductDTO } from "@vh5/api";

export interface Product {
  id: number;
  title: string;
  price: number; // 领域模型使用 number 而非 string
  imgUrl: string;
  description: string;
}

const toProduct = (dto: ProductDTO): Product => ({
  id: dto.id,
  title: dto.title,
  price: Number(dto.price),
  imgUrl: dto.imgUrl,
  description: dto.description ?? "",
});

export const ProductService = {
  async getList(page = 1, size = 20) {
    const { items, total } = await productApi.list({ page, size });
    return { items: items.map(toProduct), total };
  },
  async getDetail(id: number) {
    return toProduct(await productApi.detail(id));
  },
};
```

## 4. 在视图中消费服务

通过特性 Composable 而非直接在模板中调用服务。Composable 负责管理 `loading`、`error`、取消与刷新。

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

## 5. 新增接口

1. 在 `packages/api/src/<domain>.ts` 中添加 DTO 及接口定义。
2. 如需领域转换，在 `packages/services/src/<domain>.service.ts` 中添加。
3. 在特性包的 Composable 中封装（`packages/features/<domain>/composables/`）。
4. 在视图中使用该 Composable。
