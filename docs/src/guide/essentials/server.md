# Server Interaction

## Mock Server

Development uses a Nitro-based mock backend at `http://localhost:5320`.

The frontend proxies `/api` requests to the mock server via Vite:

```ts
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5320',
      changeOrigin: true,
    },
  },
}
```

## API Modules

Each app defines API request functions in `src/api/`:

```ts
// api/product.ts
import request from "@/utils/request";

export function getProductList(params?: { page?: number; pageSize?: number }) {
  return request.get("/api/product/list", { params });
}

export function getProductDetail(id: number | string) {
  return request.get("/api/product/detail", { params: { id } });
}
```

## Authentication Flow

1. User submits login form → `POST /api/auth/login`
2. Server returns `accessToken`, sets `refreshToken` in HttpOnly Cookie
3. Subsequent requests carry `Authorization: Bearer <token>`
4. On token expiry, call `POST /api/auth/refresh`
