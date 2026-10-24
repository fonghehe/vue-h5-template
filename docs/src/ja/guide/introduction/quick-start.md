# クイックスタート

**Node.js 24.x** と **pnpm 12 以降**を使います。pnpm の固定バージョンはルートの `package.json` に記載しています。

クローン後にルートで必要なコマンドを実行します。`pnpm install` は内部ビルド用パッケージの `stub` も実行します。

```bash
pnpm install
pnpm dev:vant
```

`pnpm dev` は 1 パッケージを対話選択します。一括起動ではありません。既定ポートは NutUI 5777、Vant 5778、Varlet 5779、TDesign 5783、Ionic 5784、Nitro 5320。`user / 123456`、`admin / 123456` は Nitro 専用です。

画面は英語で開始し、Member で中国語・日本語に切り替えられます。共通タブと AI ボタンを備えます。[サービスモード](../essentials/server.md)では 2 つのバックエンドを別途起動してください。

`.env.example` から必要な値をローカル設定へコピーし、既存設定を上書きしないでください。workspace 追加後は install と再起動が必要です。Vant は使用中のポートで起動に失敗します。ターミナルの URL を確認してください。

`pnpm build` は workspace と docs もビルドします。アプリ成果物は `apps/h5-<ui>/dist`。preview は静的配信だけで Mock はありません。文書は `pnpm dev:docs` / `pnpm build:docs`。CLI は `pnpm create-app` です。[アプリ作成](../essentials/create-app.md)を参照してください。

## VS Code

VS Code でリポジトリのルートを開き、`.vscode/settings.json` を読み込んで推奨拡張機能をインストールします。SFC には Vue (Official)、整形には Oxc を使い、型診断にはワークスペース版の TypeScript を選択します。依存関係と必要な Playwright ブラウザーをインストールすると、テストビューから Vitest と Playwright を実行できます。
