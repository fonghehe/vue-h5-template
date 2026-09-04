# バックエンドモード

3 アプリとも同じ 2 モードを利用できます。以下から対象のコマンドを 1 つ選んでください。

```bash
pnpm dev:vant
pnpm dev:nutui
pnpm dev:varlet

pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

## Nitro Mock

`dev:<ui>` は development モードで `/api/**` をポート 5320 の Nitro に転送します。空きポートならプラグインが起動し、使用中なら追加の Mock を起動しません。別バックエンドや AI キーは不要です。

## 連携サービス

これらのバックエンドは独立した Git リポジトリで、フロントエンドには同梱されていません。任意の作業ディレクトリにクローンしてください。

- [vue-h5-template-ai-service](https://github.com/fonghehe/vue-h5-template-ai-service) — AI ストリーミングサービス（ポート 8001）
- [vue-h5-template-business-service](https://github.com/fonghehe/vue-h5-template-business-service) — 業務 API サービス（ポート 8002）

```bash
git clone https://github.com/fonghehe/vue-h5-template-ai-service.git
git clone https://github.com/fonghehe/vue-h5-template-business-service.git
```

クローン後、各 README に従って実行環境を用意してください。以下の起動コマンドは、それぞれのリポジトリのディレクトリで、別々のターミナルから実行します。

`dev:services:<ui>` は `.env.services` を読み込み、Nitro を起動しません。各バックエンドの `.env.example` を基に設定し、別々に起動します。

```bash
# vue-h5-template-ai-service/
uv sync
uv run uvicorn app.main:app --reload --port 8001

# vue-h5-template-business-service/
docker compose up --build
```

業務サービスは Docker Compose の PostgreSQL を使います。AI サービスの既定値は `AI_PROVIDER=mock` で、キーなしでも独立したストリーミングサービスとして動作します。

```dotenv
VITE_GLOB_API_URL=/api
VITE_AI_API_BASE_URL=/api/ai
VITE_AI_CHAT_ENDPOINT=/api/ai/chat
VITE_NITRO_MOCK=false
VITE_API_TARGET=http://localhost:8002
VITE_AI_API_TARGET=http://localhost:8001
```

`/api/ai` を `/api` **より先に**判定し、それぞれ 8001 と 8002 に転送します。アプリの `.env.services.local` で変更できます。実装は `internal/vite-config/src/backend-proxy.ts` です。絶対 URL の `VITE_GLOB_API_URL` は開発プロキシを通りません。

アカウントは Nitro ではなく業務サービスのデータです。`AI_AUTH_REQUIRED=true` の場合は業務サービスでログインし、両サービスの JWT 設定を一致させます。モデルキーや署名秘密鍵をフロントへ置かないでください。

REST は[共有 API](./api.md)、AI は `FetchChatProvider` を利用します。言語ヘッダーだけで実バックエンドの翻訳を保証するものではありません。開発プロキシは本番では使われません。[デプロイ](../v2/deployment.md)でリバースプロキシを設定してください。
