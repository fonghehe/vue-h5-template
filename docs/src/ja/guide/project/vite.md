# Vite 設定

`internal/vite-config` が共有 Vite 設定ジェネレーターを提供します。

## 使用方法

```ts
import { defineConfig } from "@vh5/vite-config";

export default defineConfig(async () => ({
  application: {
    uiLibrary: "nut", // 'nut' | 'vant' | 'varlet'
  },
  vite: {
    /* カスタム設定 */
  },
}));
```

## 組み込みプラグイン

| プラグイン                 | 説明                                |
| -------------------------- | ----------------------------------- |
| `@vitejs/plugin-vue`       | Vue 3 SFC サポート                  |
| `@vitejs/plugin-vue-jsx`   | JSX/TSX サポート                    |
| `unplugin-auto-import`     | API 自動インポート                  |
| `unplugin-vue-components`  | コンポーネント自動登録              |
| `unplugin-vue-router`      | 型安全なファイルルーティング        |
| `unocss`                   | アトミック CSS エンジン             |
| `vite-plugin-eruda-pro`    | モバイルデバッグコンソール (開發時) |
| `vite-plugin-vue-devtools` | Vue DevTools                        |
| `postcss-mobile-forever`   | px を viewport に変換               |
| `vite-plugin-html`         | HTML テンプレート注入               |
| `vite-plugin-compression`  | Gzip/Brotli 圧縮                    |
| `vite-plugin-pwa`          | PWA サポート                        |
| `nitro-mock`               | Nitro Mock サーバー統合             |
