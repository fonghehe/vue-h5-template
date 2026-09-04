# HTTP と API 層

REST は `packages/api-client` の Axios クライアントに統一しています。アプリの `src/api` は互換用の再エクスポートです。各アプリに別の fetch ラッパーを追加しないでください。

## 公開契約

通信形式は `ApiResponse<T>`（`{ code, message, data, error? }`）で成功コードは 0 です。関数は**展開済みの data**を返します。商品一覧は配列ではなく、`items, page, pageSize, total, hasMore` を持つ `PaginationResponse<ProductItem>` です。

```ts
import { getProductList, loginApi, isApiError } from '@vh5/api-client';

const session = await loginApi({ username: 'user', password: '123456' });
const products = await getProductList({ page: 1, pageSize: 4 });
console.log(session.accessToken, products.items, products.hasMore);

try {
  await getProductList({ page: 2 });
} catch (error: unknown) {
  if (isApiError(error)) console.error(error.kind, error.message);
}
```

商品画面のキャッシュとページ分割には `@vh5/mobile-ui/queries` を使います。Request 画面は直接呼び出しの例であり、別のサーバー状態ストアではありません。

## 初期化とエラー

bootstrap で `configureApiClient` に URL、現在の token、言語、HTTP 401 コールバックを設定します。必要に応じて Bearer token、`Accept-Language`、`X-Request-ID` を付けます。タイムアウトは既定で 15 秒、credentials は有効です。

`ApiError.kind` は `business | configuration | http | network | timeout | unauthorized | unknown`。HTTP 401 はセッションを消してログインへ移動します。HTTP 200 内の業務エラーは別の経路です。**token の自動更新は未実装**です。エンドポイントは API base に対する相対パスにしてください。

## エンドポイント追加

1. `openapi/schema.yaml` を変更し、`pnpm api:generate` を実行します。
2. `packages/api-client/src/modules` に型付き関数を追加・公開します。
3. Nitro handler とテストを追加します。
4. キャッシュや mutation が必要なら Query hook を追加します。

生成型はコンパイル時の契約であり、実行時 schema 検証ではありません。ストリームは `@vh5/ai-chat` の fetch 経路です。[リクエスト設計](../v2/request.md)と[バックエンドモード](./server.md)を参照してください。
