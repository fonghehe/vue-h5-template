# Vite Config

`internal/vite-config` は共有 Vite 設定ジェネレーターを提供します。

## 使用方法

```ts
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: {
    uiLibrary: 'nut', // 'nut' | 'vant' | 'varlet'
  },
  vite: {
    // カスタム Vite 設定
  },
}));
```

## 組み込みプラグイン

| プラグイン                 | 説明                    |
| -------------------------- | ----------------------- |
| `@vitejs/plugin-vue`       | Vue 3 SFC サポート      |
| `@vitejs/plugin-vue-jsx`   | JSX/TSX サポート        |
| `unplugin-auto-import`     | API 自動インポート      |
| `unplugin-vue-components`  | コンポーネント自動登録  |
| `vite-plugin-vue-devtools` | Vue DevTools            |
| `postcss-px-to-viewport`   | px を viewport に変換   |
| `vite-plugin-html`         | HTML テンプレート注入   |
| `vite-plugin-compression`  | Gzip/Brotli 圧縮        |
| `vite-plugin-pwa`          | PWA サポート            |
| `nitro-mock`               | Nitro Mock サーバー統合 |

## 環境変数

`.env.*` ファイルで設定：

| 変数                      | 説明                         |
| ------------------------- | ---------------------------- |
| `VITE_PORT`               | 開発サーバーポート           |
| `VITE_BASE`               | ベースパス                   |
| `VITE_GLOB_API_URL`       | API リクエストプレフィックス |
| `VITE_NITRO_MOCK`         | Mock サーバーを有効化        |
| `VITE_DEVTOOLS`           | DevTools を有効化            |
| `VITE_INJECT_APP_LOADING` | グローバルローディングを注入 |
