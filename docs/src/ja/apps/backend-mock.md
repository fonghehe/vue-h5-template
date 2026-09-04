# Nitro Mock バックエンド

`pnpm dev:<ui>` が 5320 の Nitro を起動または再利用します。単体は `pnpm -F @vh5/backend-mock exec nitro dev --port 5320`。本番業務サーバーとして使わないでください。

| Method | Path | Result |
| --- | --- | --- |
| POST | `/api/auth/login` | public user + accessToken |
| POST | `/api/auth/logout` | refresh cookie cleared |
| POST | `/api/auth/refresh` | access token string (legacy endpoint) |
| GET | `/api/user/info` | user; Bearer token required |
| GET | `/api/product/list?page=1&pageSize=4` | paginated products |
| GET | `/api/product/detail?id=1` | product |
| POST | `/api/product/favorite` | `{ productId, favorite }` |
| POST | `/api/ai/chat` | SSE: start / delta / finish / [DONE] |

Nitro アカウントは `user / 123456`、`admin / 123456`。ログインは公開情報と token を返し、パスワードは返しません。access token は 7 日、refresh cookie は 30 日。旧 refresh は token 文字列を返しますがブラウザからは未使用で、自動更新もありません。

商品は `Accept-Language` に応じて英語（既定）・中国語・日本語を返します。お気に入りは検証して値を返すだけで永続化しません。AI は実際の SSE チャンクです。**`/api/upload` handler と完成したアップロード画面はありません**。

別の 2 サービスは[バックエンドモード](../guide/essentials/server.md)を参照。アカウントと永続化・認証は Nitro と独立しています。
