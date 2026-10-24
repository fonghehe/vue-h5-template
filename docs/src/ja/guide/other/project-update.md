# プロジェクトの保守

## コードを同期する

変更のない状態で上流を追跡しているブランチを開き、`git pull --ff-only` と `pnpm install --frozen-lockfile` を実行します。ワークスペースパッケージやビルド設定の変更後は開発サーバーを再起動します。

## 依存関係を更新する

`pnpm outdated -r` で更新候補を確認します。`pnpm-workspace.yaml` の該当する catalog 項目を変更して `pnpm install` を実行し、catalog とロックファイルの差分を確認します。内部依存関係には `workspace:*` を使用します。

## 変更を検証する

`pnpm check` を実行します。実行時の依存関係、ナビゲーション、通信、ビルド連携を変更した場合は `pnpm test:e2e` も実行します。共通の依存関係を変更した場合は 5 つの UI アプリを確認します。

## ローカル成果物を作り直す

`pnpm clean` はインストール済みモジュール、ビルド成果物、Turbo キャッシュを削除します。その後 `pnpm install --frozen-lockfile` でロック済みの依存関係を復元します。
