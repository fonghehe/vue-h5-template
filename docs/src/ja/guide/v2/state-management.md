# 状態管理

Pinia は Token、設定などのクライアント状態を管理します。TanStack Query はキャッシュ、再試行、ページング、Mutation などのサーバー状態を管理します。Query の結果を Pinia へ複製しません。

フォームなどの局所状態は Vue refs、ストリーミング会話は `useStreamingChat` が所有します。`/examples/query` にページング、Mutation、Infinite Query の実例があります。
カートの商品行、数量、選択状態はユーザー所有の Client State として Pinia が管理します。商品一覧、Loading、Retry などの Remote State はカート Store に複製しません。

言語設定は Pinia ではなく Vue I18n と localStorage で管理します。
