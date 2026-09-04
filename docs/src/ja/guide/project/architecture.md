# システム設計

```text
App route → shared mobile page → Query → api-client (Axios) → Nitro / business service
App route → shared ChatPage → useStreamingChat → FetchChatProvider → Nitro / AI service
bootstrap → i18n → Pinia → configureApiClient → VueQueryPlugin → router → mount
```

3 アプリは業務画面を共有し、ネイティブナビ・テーマ・言語・セッション接続は個別です。`mobile-ui` が画面と Query/cart、`api-client` が REST、`ai-chat` がストリームを担当します。views は遅延ラッパーで、業務処理を複製しません。

Pinia はクライアント状態、Vue Query はサーバーキャッシュ、Vue I18n は言語です。カートはローカル、決済はデモです。Nitro と業務/AI サービスで REST/SSE 契約を共用します。

ルートは明示的です。HTTP 401 は共通ですが、`requiresAuth` 評価は現在 Vant のみ。ロールメタデータだけでは認可されません。[ルート境界](../essentials/route.md)を参照してください。

Vite 8 は Rolldown を使用。resolver で UI を個別に読み込み、UnoCSS と scoped CSS を併用。共有画面は px-to-vw 変換から除外します。namespace は store key を分離しますが、user/cart は本番でも localStorage を指定します。

`pnpm check` は lint、型、Vitest、workspace build。Playwright は別実行、Changesets はリリース用です。[構成](./dir.md)、[バックエンド](../essentials/server.md)、[テスト](../v2/testing.md)、[v2 設計](../v2/architecture.md)を参照してください。
