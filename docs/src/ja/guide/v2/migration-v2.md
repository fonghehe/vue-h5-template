# v1 から v2 への移行

API は `ApiResponse<T>` ではなく展開済みデータを返し、login は object 引数、商品一覧は常に pagination 形式です。Token は interceptor が読みます。ファイルルーターの不完全な統合は削除されました。

API Client への移行、Vue Query への server state 移行、Route Meta と OpenAPI 型の更新後、`pnpm check` と E2E を実行してください。P1 は theme、監視、upload、virtual list、WebView bridge、P2 は camera/QR/deep-link/SSR/SSG です。

## 現在の実装範囲

業務タブ・テーマ・HTTP 401 は共通です。`requiresAuth` 評価は Vant のみ、`authority` によるロール認可は未接続です。KeepAlive は条件付きで非キャッシュルートでは消えます。user/cart は本番も localStorage。自動 token 更新、サーバー同期カート、決済、アップロードは未実装です。[ルート](../essentials/route.md)、[状態](../essentials/state.md)、[配信](../essentials/build.md)を参照してください。
