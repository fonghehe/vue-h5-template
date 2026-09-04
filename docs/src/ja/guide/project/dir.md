# ディレクトリ構成

```text
apps/h5-{vant,nutui,varlet}/src/
  bootstrap.ts
  router/index.ts
  layout/index.vue
  views/                    → @vh5/mobile-ui/*.vue
  locales/index.ts
  api/                      → @vh5/api-client
packages/
  mobile-ui/src/             → pages, cart.ts, queries.ts, surface.css
  api-client/src/modules/    → auth.ts, user.ts, product.ts
  api-client/src/generated/  → schema.d.ts
  ai-chat/src/               → fetch-provider.ts, sse.ts, use-streaming-chat.ts
  locales/src/langs/         → en-US, zh-CN, ja-JP, legacy zh-TW
  stores/ styles/ utils/ @core/
internal/                   → vite-config, tsconfig, lint-configs, node-utils
apps/backend-mock/api/
openapi/schema.yaml
e2e/
docs/src/                   → English; zh/, ja/, zh-TW/, zh-HK/
```

共有画面は `packages/mobile-ui/src`、アプリは遅延ルートラッパーです。固有ログインと UI 例はアプリに置きます。セッション store は Vant/Varlet の `stores/user.ts`、NutUI の `store/modules/user.ts`。

API 関数・生成型は `api-client`、プロトコル・会話ライフサイクルは `ai-chat`、ブラウザのライフサイクルは `packages/@core/composables` に配置します。巨大な画面 composable に集めません。

workspace が `.vue`/`.ts` を直接公開します。パッケージ追加後は install、exports 変更後は開発サーバー再起動。ビルド設定はコンパイル済みのため `pnpm -F @vh5/vite-config stub` で更新します。

境界変更前に[ルート](../essentials/route.md)、[設計](./architecture.md)、ルート `AGENTS.md` を確認してください。
