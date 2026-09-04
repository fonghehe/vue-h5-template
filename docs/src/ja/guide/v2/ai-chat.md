# ストリーミング AI Chat

3つのレイアウトはテーマ色のフローティングボタンから遅延読み込みの `/ai/chat` を開きます。共有 UI は `packages/mobile-ui/src/ChatPage.vue` にあり、各アプリが token と endpoint を渡します。Chat、Login、Cart、Details では非表示です。UI は英語を初期値として中国語・日本語にも対応します。AI 出力は翻訳辞書ではなく、信頼できないコンテンツとして扱います。

`/ai/chat` はベンダー非依存の `ChatProvider` を使います。`FetchChatProvider` が `POST /api/ai/chat` の SSE を `ReadableStream` で読み、`useStreamingChat` がメッセージ、状態、再試行、再生成、`AbortController` を管理します。

Mock も実際に chunk を順次送ります。Markdown は DOMPurify でサニタイズしてから表示し、AI Key は必ずサーバー側に置きます。OpenAI、Claude、Gemini、DeepSeek は UI を変えずに adapter で接続できます。

## Companion AI service を使う

ソースリポジトリ：

- [vue-h5-template-ai-service](https://github.com/fonghehe/vue-h5-template-ai-service) — AI ストリーミングサービス（ポート 8001）
- [vue-h5-template-business-service](https://github.com/fonghehe/vue-h5-template-business-service) — 業務 API サービス（ポート 8002）

クローンと設定の手順は[バックエンドモード](../essentials/server.md)を参照してください。

`vue-h5-template-ai-service` を既定の `AI_PROVIDER=mock` でポート `8001` に起動し、`pnpm dev:services:vant` を実行します。Vite は `/api/ai/chat` を SSE のまま転送し、ログイン済みの場合は `FetchChatProvider` が Business Service の Bearer Token を付与します。両サービスの JWT 設定を同一にすれば `AI_AUTH_REQUIRED=true` も利用できます。

実モデルを使う場合、`AI_PROVIDER=openai-compatible`、`AI_BASE_URL`、`AI_API_KEY`、`AI_MODEL` は **AI service** 側だけに設定します。アプリの `VITE_*` に秘密情報を入れず、ブラウザー契約は変更しません。
