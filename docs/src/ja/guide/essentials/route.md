# ルーティング

各アプリの `src/router/index.ts` にルートを手書きします。残っている旧 `typed-router.d.ts` ではなく、実行時レコードが正です。ファイルルーティングやルート名の自動生成保証はありません。

共通パスは `/home`、`/list`、`/member`、`/examples`。旧 `/mine` と `/example` はリダイレクトします。子画面は `/details?id=1`、`/cart`、`/login`、`/ai/chat`、`/examples/{query,request,mobile,svg-icons,pwa,components}`。Vant/Varlet の名前は `mine` / `example`、NutUI は `member` / `examples` のため、共有リンクはパスを使います。

`title` は `app.home` などの翻訳キーです。ナビバーと document title は言語変更に追従します。タブは 4 つの主要画面のみ、AI ボタンは Chat/Login/Cart/Details では非表示です。

全アプリが `guestOnly` を処理しますが、`requiresAuth` を評価するのは Vant のみです。デモルートに `requiresAuth: true` はありません。HTTP 401 処理は全アプリ共通です。`authority` 型だけでロール認可は実行されません。バックエンド認可が必要です。

全レイアウトが現在のルートの `keepAlive` に応じてラップします。非キャッシュルートへ移動するとラッパーは消えるため、永続的なルート間キャッシュではありません。ログイン後の転送先は `getSafeRedirect` で検証します。[設計](../v2/architecture.md)と[API](./api.md)も参照してください。
