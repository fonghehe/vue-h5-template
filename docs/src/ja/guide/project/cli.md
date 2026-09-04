# CLI — vsh

> CLI は基本画面を生成し layout/locales/API/stores をコピーしますが、現行 v2 の検証済み完全コピーではありません。依存と bootstrap を共有 mobile UI / Query に合わせる必要があります。既存アプリを参考に、生成後は型・build・ブラウザテストを実行してください。

プロジェクトには小さなコマンドラインツール `@vh5/vsh`（コマンド名 `vsh`）が組み込まれており、[cac](https://github.com/cacjs/cac) 上に構築されています。リント、依存関係チェック、スキャフォールド、ワークスペース管理をまとめて提供し、贡献者が長いコマンドチェーンを覚える必要がなくなります。

## コマンドの実行

この CLI はバイナリ名 `vsh` を持つワークスペースパッケージです。呼び出し方は 2 通りあります：

```bash
# pnpm 経由（推奨）
pnpm exec vsh <command>

# または共通コマンドを既にラップしたルートの npm スクリプト
pnpm lint        # vsh lint
pnpm format      # vsh lint --format
pnpm publint     # vsh publint
pnpm create-app  # vsh create-app
```

`pnpm exec vsh --help` ですべてのコマンドを一覧表示、`pnpm exec vsh <command> --help` で個別コマンドのオプションを表示できます。

## コマンド

### `vsh lint`

リント / フォーマットチェック一式を実行します。CPU コア数に応じて直列か並列かを自動選択します（コア数 ≤ 4 の場合は直列で、低スペックマシンのメモリ急増を防ぎます）。

```bash
pnpm exec vsh lint
pnpm exec vsh lint --threads 4   # oxfmt / oxlint のスレッド数を明示
```

順次実行される内容：

| ツール | コマンド |
| ------ | -------- |
| Oxfmt（チェック） | `oxfmt --check --threads=N` |
| OxLint | `oxlint --type-aware --threads=N` |
| ESLint | `eslint . --cache` |
| Stylelint | `stylelint "**/*.{vue,css,less,scss}" --cache` |

報告のみではなく自動修正するには `--format` を付けます：

```bash
pnpm format
# 実行順：stylelint --fix、oxfmt、oxlint --fix --type-aware、eslint --fix
```

### `vsh publint`

各パッケージの `package.json` を [publint](https://github.com/bloomberg/publint) の公開基準でチェックします。

```bash
pnpm publint
```

### `vsh create-app`

`apps/` 配下に新しい H5 アプリを対話的にスキャフォールドします。UI フレームワーク（Varlet / Vant / NutUI）とアプリ名を入力すると、完全なボイラープレート（`package.json`、`vite.config.ts`、ルーティング、ビュー、i18n、stores）を生成し、対応する参考アプリから `layout/`、`locales/`、`api/`、`stores/` をコピーします。

```bash
pnpm create-app
```

完了後、出力された次の手順に従ってください：`pnpm install` を実行し、ルートの `package.json` に `dev:<name>` / `build:<name>` スクリプトを追加します。

### `vsh check-circular`

`circular-dependency-scanner` を使って workspace 内の循環（インポート）依存をスキャンします。結果は **警告** として出力され、ビルドは失敗しません。

```bash
pnpm exec vsh check-circular
pnpm exec vsh check-circular --staged            # ステージされたファイルのみ
pnpm exec vsh check-circular --verbose           # 詳細表示（既定でオン）
pnpm exec vsh check-circular --threshold 2       # 最小サイクル長
pnpm exec vsh check-circular --ignore-dirs dist,node_modules
```

既定では `dist`、`.turbo`、`output`、`.cache`、`scripts`、`internal` および一部の大きな UI-kit パッケージを無視します。

### `vsh check-dep`

[depcheck](https://github.com/depcheck/depcheck) を使って、すべての workspace パッケージの不足・未使用依存を検出します。

```bash
pnpm exec vsh check-dep
pnpm exec vsh check-dep --ignore-packages @vh5/foo,@vh5/bar
pnpm exec vsh check-dep --ignore-matches vite,vitest
pnpm exec vsh check-dep --ignore-patterns dist,public
```

ビルド専用の一部パッケージ（例：`@vh5/tsconfig`、`@vh5/vite-config`）は既定で無視されます。

### `vsh code-workspace`

現在の workspace パッケージから `vh5.code-workspace` ファイルを再生成し、VS Code のマルチルート workspace を同期します。

```bash
pnpm exec vsh code-workspace
pnpm exec vsh code-workspace --spaces 4
pnpm exec vsh code-workspace --auto-commit   # 結果を git add
```

`vsh lint` が駆動するツールチェーンは [コード規約](./standard) を参照してください。
