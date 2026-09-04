# コード規約

> `lefthook.yml` は正しい `pnpm typecheck` を使い、workspace、3 アプリの設定、テストツールを検証します。CI は lint、型チェック、単体テストのカバレッジ、ビルドを独立して実行します。

ESLint、Oxfmt、Stylelint、OXLint、Commitlint の共有設定を使用しています。

```bash
pnpm lint
pnpm format
```

Git コミットは `czg` で規約化: `type(scope): message`

## Git フック（lefthook）

このリポジトリは Git フックに [lefthook](https://github.com/evilmartians/lefthook) を使用しています。`git commit` するたびに pre-commit フックが自動実行されます（低スペックマシンのメモリ・CPU 急増を避けるため、直列で実行）。

- **oxlint** —— ステージ済みファイルに対して `oxlint --fix --type-aware`
- **oxfmt** —— ステージ済みファイルをフォーマット
- **eslint** —— ステージ済みファイルに対して `eslint --fix`
- **stylelint** —— ステージ済みの Vue / CSS / SCSS ファイルに対して `stylelint --fix`
- **typecheck** —— 全体の TypeScript 型チェック（`pnpm typecheck`）

すべての lint ジョブは自動修正して変更を再ステージします。`commit-msg` フックは `commitlint` を実行し、上記のコミットメッセージ形式を強制します。マージ後は `post-merge` フックが自動的に `pnpm install` を実行します。

フックは自動で走るため、通常のコミットで十分です（手動で先に lint する必要はありませんが、ローカル確認用に `pnpm lint` / `pnpm format` が使えます）。

## AI アシスタントのローカルファイル

`.gitignore` は一般的な AI ツールのローカルメモリ、履歴、セッション、認証情報（`.workbuddy/memory/` など）を除外します。`AGENTS.md`、`.cursor/rules/`、`.claude/skills/`、`.codex/skills/` などの共有ルールは追跡可能なままです。個人データは削除しません。他のツールを追加する際は対象を限定し、`git check-ignore --no-index` で確認してください。回帰テストは共有ルールが除外されないことも検証します。
