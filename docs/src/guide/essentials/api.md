# HTTP & API Layer

The HTTP stack is split into three packages so each has a single responsibility:

| Package         | Responsibility                                                          |
| --------------- | ----------------------------------------------------------------------- |
| `@vh5/request`  | Typed `fetch` wrapper, interceptors, refresh-token, error normalisation |
| `@vh5/api`      | Endpoint definitions and request/response DTOs (no side effects)        |
| `@vh5/services` | Domain services that consume `@vh5/api` and return domain models        |

Apps and features never call `fetch` directly.

## 1. The Request Client (`@vh5/request`)

```ts
// packages/request/src/client.ts
import { createRequest } from "./core";
import { useAuthStore } from "@vh5/feature-auth/store";

export const request = createRequest({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 15_000,
});

// Inject access token
request.interceptors.request.use((config) => {
  const token = useAuthStore().accessToken;
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

// Single-flight refresh on 401
request.interceptors.response.use(undefined, async (error) => {
  if (error.httpStatus === 401 && !error.config._retried) {
    await useAuthStore().refresh();
    error.config._retried = true;
    return request(error.config);
  }
  throw error;
});
```

`RequestError` shape:

```ts
class RequestError extends Error {
  code: number; // backend business code
  httpStatus: number; // HTTP status
  payload?: unknown; // raw response body
  config: RequestConfig; // original request
}
```

Per-call options:

```ts
request.get<Product>("/product/detail", {
  params: { id },
  silent: true, // suppress global toast
  retry: { count: 2 }, // exponential backoff
  signal, // AbortController
});
```

## 2. The API SDK (`@vh5/api`)

Endpoints are pure declarations — no Vue, no Pinia, no toasts.

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

## 3. Domain Services (`@vh5/services`)

A service translates DTOs into domain models and centralises business rules.
Views and stores depend on services, never on `@vh5/api` directly.

```ts
// packages/services/src/product.service.ts
import { productApi, type ProductDTO } from "@vh5/api";

export interface Product {
  id: number;
  title: string;
  price: number; // domain model uses number
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

## 4. Consuming a Service in a View

Use a feature composable instead of calling the service from the template
directly. The composable owns `loading`, `error`, cancellation and refresh.

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

## 5. Adding a New Endpoint

1. Add the DTO + endpoint to `packages/api/src/<domain>.ts`.
2. If a domain transform is needed, add it to
   `packages/services/src/<domain>.service.ts`.
3. Expose it via a composable in the feature
   (`packages/features/<domain>/composables/`).
4. Use the composable in views.
