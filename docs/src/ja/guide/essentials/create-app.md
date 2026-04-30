# アプリ作成

CLI ツールを使用して新しい H5 アプリを素早くスキャフォールドします。

## 使い方

```bash
pnpm create-app
```

CLI が対話式でガイドします：

1. **UI フレームワークを選択** — Varlet / Vant / NutUI
2. **アプリ名を入力** — 例: `h5-my-app`

## 生成内容

`apps/` ディレクトリに完全なアプリ構造が作成されます：

```
apps/h5-my-app/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── env.d.ts
├── .env
├── .env.development
├── public/
├── src/
│   ├── main.ts
│   ├── bootstrap.ts
│   ├── App.vue
│   ├── router/index.ts
│   ├── views/
│   │   ├── home/index.vue
│   │   ├── list/index.vue
│   │   ├── mine/index.vue
│   │   └── login/index.vue
│   ├── components/
│   ├── layout/index.vue    (参照アプリからコピー)
│   ├── locales/             (参照アプリからコピー)
│   ├── api/                 (参照アプリからコピー)
│   └── stores/              (参照アプリからコピー)
└── types/
```

## 次のステップ

作成後：

1. `pnpm install` を実行して依存関係をインストール
2. ルートの `package.json` にスクリプトを追加：

```json
{
  "scripts": {
    "dev:h5-my-app": "pnpm -F @vh5/h5-my-app run dev",
    "build:h5-my-app": "pnpm run build --filter=@vh5/h5-my-app"
  }
}
```

3. `pnpm dev:h5-my-app` で開発を開始

## 自動設定

生成されたアプリは以下が事前設定済みです：

- **Vite プロキシ** — `/api` を Mock サーバー `localhost:5320` にプロキシ
- **共有スタイル** — `virtual:uno.css`（UnoCSS）と `@vh5/styles/global` をインポート
- **状態管理** — `@vh5/stores`（Pinia + 永続化）を使用；namespace は `VITE_APP_NAMESPACE` + バージョン + 環境から生成
- **国際化** — `@vh5/locales` を使用
- **ルートプログレスバー** — `@vh5/utils` の NProgress
- **UI コンポーネント** — 選択したフレームワークに基づき自動登録：
  - **NutUI**：Toast / Notify / Dialog / ImagePreview の CSS は `bootstrap.ts` で手動インポート、その他はオンデマンド
  - **Vant**：コンポーネント CSS は `VantResolver` によりオンデマンドで注入、全量インポート不要
  - **Varlet**：コンポーネント CSS は `VarletImportResolver` でオンデマンド、関数型コンポーネント（`Snackbar` 等）は呼び出し元で手動インポート
