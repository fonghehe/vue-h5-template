# Server Interaction

## Mock Server

Development uses a Nitro-based mock backend at `http://localhost:5320`. Frontend proxies `/api` requests via Vite.

## API Modules

Each app defines API functions in `src/api/`:

```ts
import request from '@/utils/request';

export function getProductList(params?: { page?: number; pageSize?: number }) {
  return request.get('/api/product/list', { params });
}
```

## Authentication Flow

1. User submits login form → `POST /api/auth/login`
2. Server returns `accessToken`, sets `refreshToken` in HttpOnly Cookie
3. Subsequent requests carry `Authorization: Bearer <token>`
4. On expiry, call `POST /api/auth/refresh`
