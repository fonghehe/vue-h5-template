# なぜ Vue H5 Template を選ぶのか？

## 背景

モバイル H5 開発において、開発者は新しいプロジェクトを始める際に同様の課題に直面します：

- 適切な UI フレームワーク（NutUI、Vant、Varlet）の選定と正しい設定
- ビルドツールと開発環境をゼロから構築
- チーム全体でのコード規約、lint、フォーマットの統一
- 認証、状態管理、国際化などの共通機能の実装
- 複数アプリ間での共有コードと設定の管理

Vue H5 Template は、構造化された本番対応の Monorepo テンプレートでこれらの問題を解決するために作られました。

## なぜ Monorepo なのか？

### コードの再利用

従来のマルチリポジトリ構成では、共有コード（utils、stores、styles、configs）を個別に管理・公開する必要があります。Monorepo では：

- 共有パッケージは workspace 参照で直接リンク
- 共有コードの変更が即座にすべてのアプリに反映
- 内部パッケージの公開やバージョン管理が不要

### 統一規約

Monorepo により、すべてのアプリが同じ設定を共有：

- ESLint、Prettier、Stylelint 設定
- TypeScript 設定
- コミット規約と CI/CD パイプライン
- 依存関係のバージョン（pnpm catalog 経由）

### マルチ UI フレームワーク対応

チームやプロジェクトによって好みの UI フレームワークは異なります。Vue H5 Template は3つのすぐに使えるアプリテンプレートを提供：

| アプリ    | UI フレームワーク | デフォルトポート |
| --------- | ----------------- | ---------------- |
| h5-nutui  | NutUI 4.x         | 5777             |
| h5-vant   | Vant 4.x          | 5778             |
| h5-varlet | Varlet 3.x        | 5779             |

一つを選んで使うことも、複数を同時に使うこともできます。

## 品質と規約

プロジェクトは厳格な品質基準を採用：

- **型安全性**：完全な TypeScript カバレッジ
- **コードスタイル**：ESLint + Prettier + Stylelint、共有設定
- **コミット規約**：Commitlint + Conventional Commits
- **Git Hooks**：Lefthook による pre-commit と commit-msg チェック
- **スペルチェック**：CSpell によるタイプミス検出
