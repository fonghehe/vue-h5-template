# ルーティング

各アプリの `src/router/index.ts` にルートを手書きします。残っている旧 `typed-router.d.ts` ではなく、実行時レコードが正です。ファイルルーティングやルート名の自動生成保証はありません。

共通パスは `/home`、`/list`、`/member`、`/examples`。旧 `/mine` と `/example` はリダイレクトします。子画面は `/details?id=1`、`/cart`、`/payment`、`/login`、`/ai/chat`、`/examples/{query,request,mobile,svg-icons,pwa,components}`。Vant/Varlet の名前は `mine` / `example`、NutUI は `member` / `examples` のため、共有リンクはパスを使います。

`title` は `app.home` などの翻訳キーです。ナビバーと document title は言語変更に追従します。タブは 4 つの主要画面のみ、AI ボタンは Member/Chat/Login/Cart/Payment/Details では非表示です。

全アプリが `guestOnly` を処理しますが、`requiresAuth` を評価するのは Vant のみです。デモルートに `requiresAuth: true` はありません。HTTP 401 処理は全アプリ共通です。`authority` 型だけでロール認可は実行されません。バックエンド認可が必要です。

業務画面は既定で `keepAlive` を有効にしません。カートの永続化や Query のデータキャッシュに画面キャッシュは不要です。任意の条件付きラッパーは残しますが、非キャッシュルートでは削除され、永続的なルート間キャッシュではありません。3つのレイアウトは `route.fullPath` の変更後、実際のスクロール要素 `.app-content` を先頭に戻します。タブ切り替えとブラウザーの戻る操作も対象で、window の `scrollBehavior` だけには依存しません。転送先は `getSafeRedirect` で検証します。[設計](../v2/architecture.md)と[API](./api.md)も参照してください。
