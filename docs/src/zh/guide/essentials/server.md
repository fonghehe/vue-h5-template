# 服务端交互

## Mock 服务

开发环境使用基于 Nitro 的 Mock 后端，运行在 `http://localhost:5320`。

前端通过 Vite 代理将 `/api` 请求转发到 Mock 服务：

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

## API 模块

每个应用的 `src/api/` 目录定义了 API 请求函数：

```ts
// api/product.ts
import request from '@/utils/request';

export function getProductList(params?: { page?: number; pageSize?: number }) {
  return request.get('/api/product/list', { params });
}

export function getProductDetail(id: number | string) {
  return request.get('/api/product/detail', { params: { id } });
}
```

## 认证流程

1. 用户提交登录表单，调用 `POST /api/auth/login`
2. 服务端返回 `accessToken`，同时设置 `refreshToken` 到 HttpOnly Cookie
3. 后续请求在 Header 中携带 `Authorization: Bearer <token>`
4. Token 过期时调用 `POST /api/auth/refresh` 刷新
