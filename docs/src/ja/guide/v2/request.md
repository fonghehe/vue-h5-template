# リクエスト設計

Mock と実サービスは永続化セッションの名前空間を分離します。切り替え後は再ログインしてください。接続先は `.env.services.local` で上書きして Vite を再起動します。モバイルデバッグパネルはナビゲーションを遮らないよう既定で無効です。必要な場合のみ `VITE_ERUDA_ENABLED=true` を設定してください。

`openapi/schema.yaml` を `pnpm api:generate` で TypeScript 型へ変換し、`packages/api-client` の小さな endpoint module から利用します。Axios は Token と Request ID を付与し、`ApiResponse<T>` を展開します。

失敗は `ApiError` で business/HTTP/401/timeout/network に分類されます。401 は認証状態を消去し、`getSafeRedirect` で検証したログイン先へ遷移します。生成ファイルは手で編集しません。

Endpoint module は相対 URL のみを使用します。クライアントは認証ヘッダーを付与する前に絶対 URL を拒否します。信頼済みバックエンドの切り替えには `baseURL` を設定してください。

## Mock モードと実サービスモード

3 つの H5 アプリは同じ切り替え方法を使用します。

```bash
# Nitro Mock：外部データベースやサービスは不要
pnpm dev:vant
pnpm dev:nutui
pnpm dev:varlet

# 実サービス：UI アプリを 1 つ選択
pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

実サービスモードに入る前に、別々の terminal で companion repository を起動します。

```bash
# vue-h5-template-business-service
cp .env.example .env
docker compose up --build

# vue-h5-template-ai-service
cp .env.example .env
uv sync
make dev
```

実サービスモードは `apps/<app>/.env.services` を読み込みます。`/api/ai/**` は `http://localhost:8001` の `vue-h5-template-ai-service` に、それ以外の `/api/**` は `http://localhost:8002` の `vue-h5-template-business-service` にプロキシされます。より具体的な AI ルールが先に登録されるため、business 側の fallback に吸収されません。

| フロントエンドのパス | 開発時の転送先 | 役割 |
| --- | --- | --- |
| `/api/ai/chat` | AI service `:8001` | Provider 非依存の SSE chat |
| `/api/auth/**` | Business service `:8002` | Login、refresh、logout |
| `/api/user/**` | Business service `:8002` | Current user と favourites |
| `/api/product/**` | Business service `:8002` | Catalogue と商品詳細 |

ブラウザーは常に同一オリジンの相対 URL を呼び出すため、refresh cookie、Bearer token、SSE の挙動を本番 gateway と揃えられます。サービスの場所を変える場合は `VITE_API_TARGET` と `VITE_AI_API_TARGET` を変更してください。Provider の秘密情報はフロントエンド環境変数に保存しません。
