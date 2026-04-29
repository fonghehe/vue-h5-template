# 伺服端互動

## Mock 服務

開發環境使用基於 Nitro 的 Mock 後端，執行在 `http://localhost:5320`。

前端透過 Vite 代理將 `/api` 請求轉發到 Mock 服務：

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

## API 模組

每個應用的 `src/api/` 目錄定義了 API 請求函式：

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

## 認證流程

1. 使用者提交登入表單，呼叫 `POST /api/auth/login`
2. 伺服端回傳 `accessToken`，同時設定 `refreshToken` 到 HttpOnly Cookie
3. 後續請求在 Header 中攜帶 `Authorization: Bearer <token>`
4. Token 過期時呼叫 `POST /api/auth/refresh` 重新整理
