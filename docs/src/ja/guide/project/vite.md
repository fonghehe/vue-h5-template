# Vite 設定

共有ファクトリーは `internal/vite-config`。Vite 8/Rolldown で Chrome 111+、Safari 16.4+ を対象にします。WeChat/WeCom を含む WebView は相当のエンジンが必要で、全旧バージョンの保証はありません。

```ts
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: { uiLibrary: 'vant' }, // 'nut' | 'vant' | 'varlet'
  vite: { server: { strictPort: true } },
}));
```

Vue/JSX、自動 import、UnoCSS、viewport CSS、HTML/loading、選択した UI resolver を利用します。ファイルルーティングは無効です。SVG は eager `import.meta.glob` とコンポーネント sprite であり、旧プラグインではありません。

任意の env: `VITE_PWA_ENABLED`、`VITE_IMAGE_OPTIMIZE`、`VITE_DEVTOOLS`、`VITE_ERUDA_ENABLED`、`VITE_VISUALIZER`、`VITE_ARCHIVER`。圧縮は `VITE_COMPRESS=gzip,brotli`。PWA は既定で無効。画像最適化は build のみで、Vant の `.env.production` は有効です。

`VITE_NITRO_MOCK` でモード選択。転送先は `VITE_MOCK_API_TARGET`、`VITE_API_TARGET`、`VITE_AI_API_TARGET`、`/api/ai` を先に判定します。[接続手順](../essentials/server.md)を参照。本番で Nitro を有効にしないでください。

変更後は `pnpm -F @vh5/vite-config stub` と再起動。独立チェックは `pnpm -F @vh5/vite-config type-check`。型は `src/typing.ts`、env は `src/utils/env.ts`、CSS/warmup は `src/config/application.ts`。
