# 状態管理

Pinia はセッションとクライアント状態、TanStack Query は商品・読み込み・再試行・ページ分割・更新、Vue refs は画面内操作を担当します。チャットは `useStreamingChat`、言語は Vue I18n と localStorage の `vh5:locale` が所有します。

各アプリの QueryClient は `staleTime: 30_000`、`retry: 1`。`packages/mobile-ui/src/queries.ts` の `useProductPage(page, pageSize)` と `useInfiniteProducts(pageSize)` は言語をキーに含めます。`/examples/query` はページ分割、お気に入り mutation、ボタンによる追加読み込みの例です。自動スクロール検出ではありません。Pinia に結果を複製しないでください。

セッション store は Vant/Varlet の `src/stores/user.ts`、NutUI の `src/store/modules/user.ts`。ログイン後は token と公開ユーザー情報を保存します。共有カートは選択した商品スナップショット・数量・選択状態であり、バックエンド同期カートではありません。

`initStores(app, { namespace })` のキーは `${namespace}-${storeId}`。既定ストレージは開発で localStorage、本番で SecureLS ですが、現在の user/cart は両環境とも localStorage を明示します。ブラウザ暗号化は XSS 対策ではありません。`resetAllStores()` は Query キャッシュや言語設定を消しません。

[状態境界](../v2/state-management.md)と[API](./api.md)も参照してください。
