# サーバー連携

開発環境では Nitro ベースの Mock バックエンド（`http://localhost:5320`）を使用します。Vite プロキシで `/api` リクエストを転送します。

## 認証フロー

1. ログインフォーム送信 → `POST /api/auth/login`
2. サーバーが `accessToken` を返却、`refreshToken` を HttpOnly Cookie に設定
3. 以降のリクエストで `Authorization: Bearer <token>` を付与
4. 有効期限切れ時は `POST /api/auth/refresh` を呼び出し
