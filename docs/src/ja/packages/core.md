# コアパッケージ（@vh5-core）

`packages/@core/` 配下の `@vh5-core/*` は、プロジェクトの低レベル基盤です。`packages/@core/README.md` によれば、このディレクトリは「比較的基礎的な SDK や UI コンポーネントライブラリ」を置き、将来的に切り出して npm に公開される可能性があります —— **ビジネスロジックやビジネスパッケージをここに置かないでください。**

## パッケージ

### `@vh5-core/design`
デザイントークンと BEM SCSS ユーティリティ。
- `.` —— デザイン CSS / トークン入口（`design.css`）
- `./bem` —— BEM SCSS ヘルパー（`bem.scss`）

### `@vh5-core/shared`
フレームワークに依存しない共有ビルディングブロック。
- `./constants` —— 共有定数
- `./utils` —— 共有ユーティリティ（`es-toolkit`、`dayjs`、`clsx`、`tailwind-merge` などを利用）
- `./cache` —— キャッシュヘルパー
- `./store` —— `@tanstack/vue-store` ベースの軽量ストア

### `@vh5-core/typings`
共有 TypeScript 型定義。
- `.` —— コア型定義
- `./vue-router` —— ルーター関連の型拡張

### `@vh5-core/composables`
再利用可能な Vue 3 コンポーザブル（`@vueuse/core`、`sortablejs`、`@vh5-core/shared` に依存）。

## 他のパッケージとの関係

他で説明しているユーザー向けパッケージ —— `@vh5/stores`、`@vh5/utils`、`@vh5/styles`、`@vh5/locales`、`@vh5/vite-config` —— は `@vh5-core/*` の上に構築されています。アプリは通常上位パッケージをインポートし、上流が公開していないプリミティブが必要な場合のみ `@vh5-core/*` を利用します。
