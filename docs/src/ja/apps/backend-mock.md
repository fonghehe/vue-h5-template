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
| GET | `/api/product/favorite?id=1` | Bearer; `{ productId, favorite }` |
| POST | `/api/product/favorite` | Bearer; `{ productId, favorite }` |
| GET | `/api/ai/suggestions?locale=en-US` | `string[]` |
| POST | `/api/ai/chat` | SSE: start / delta / finish / [DONE] |

Nitro アカウントは `user / 123456`、`admin / 123456`。ログインは公開情報と token を返し、パスワードは返しません。access token は 7 日、refresh cookie は 30 日。旧 refresh は token 文字列を返しますがブラウザからは未使用で、自動更新もありません。

商品は `Accept-Language` に応じて英語（既定）・中国語・日本語を返します。AI は実際の SSE チャンクです。**`/api/upload` handler と完成したアップロード画面はありません**。

別の 2 サービスは[バックエンドモード](../guide/essentials/server.md)を参照。アカウントと永続化・認証は Nitro と独立しています。

## Mock の認証と保存範囲

Nitro はお気に入りの取得・保存の両方で認証し、ユーザー ID 別にプロセス内の Map に保存します。ブラウザの再読み込みでは残りますが、Nitro を再起動すると消えます。PostgreSQL の永続化とは異なる開発用データです。不正な ID は 400、存在しない商品は 404、未認証は 401 を返します。実サービスの検証エラーとは一部異なります。

提案の Mock は翻訳済み配列を返し、プロバイダーを呼び出しません。厳密な言語検証、Request ID、`/api/v1` の別名は実際の FastAPI で確認します。Mock やブラウザテストの成功だけでは、実 DB・モデルとの連携を確認したことにはなりません。
