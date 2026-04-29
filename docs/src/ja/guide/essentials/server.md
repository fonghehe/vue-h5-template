# サーバー連携

## Mock サーバー

開發環境では Nitro ベースの Mock バックエンド（`http://localhost:5320`）を使用します。

Vite プロキシで `/api` リクエストを Mock サーバーに転送します：

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

## API モジュール

各アプリの `src/api/` で API リクエスト関数を定義します：

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

## 認証フロー

1. ログインフォーム送信 → `POST /api/auth/login`
2. サーバーが `accessToken` を返却、`refreshToken` を HttpOnly Cookie に設定
3. 以降のリクエストで `Authorization: Bearer <token>` を付与
4. 有効期限切れ時は `POST /api/auth/refresh` を呼び出し
