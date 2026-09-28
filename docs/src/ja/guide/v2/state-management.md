# 状態管理

Pinia は Token、設定などのクライアント状態を管理します。TanStack Query はキャッシュ、再試行、ページング、Mutation などのサーバー状態を管理します。Query の結果を Pinia へ複製しません。

フォームなどの局所状態は Vue refs、ストリーミング会話は `useStreamingChat` が所有します。`/examples/query` にページング、Mutation、Infinite Query の実例があります。
カートの商品行、数量、選択状態はユーザー所有の Client State として Pinia が管理します。商品一覧、Loading、Retry などの Remote State はカート Store に複製しません。

言語設定は Pinia ではなく Vue I18n と localStorage で管理します。

## 商品ルートとリクエストのキャンセル

詳細リンクは JavaScript の安全な整数範囲内にある、単一の正の十進整数 ID のみ受け付けます。欠落、重複、不正な形式、範囲超過の場合は詳細 API を呼ばず、復帰用の案内を表示します。同じページで別の商品を開くと、前の「カートに追加しました」の表示を消去します。

カタログ、ページネーション、無限リストの Query は TanStack Query の `AbortSignal` を `getProductList(params, signal)` 経由で HTTP クライアントに渡します。言語やページの変更、最後の監視元のアンマウント時には不要なリクエストをキャンセルします。遅れて届いた結果が別の言語の表示に混入することはなく、キャッシュの分離は引き続き Query Key が担います。
