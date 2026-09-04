# コード規約

> 現在の制限：`lefthook.yml` は削除済み `pnpm check:type` を呼びます。正しいコマンドは `pnpm typecheck`。hook に依存する前に設定修正が必要です。今回の文書更新では Git hook 自体は変更しません。CI は独立して `pnpm check` を実行します。

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
- **check:type** —— 全体の TypeScript 型チェック（`pnpm check:type`）

すべての lint ジョブは自動修正して変更を再ステージします。`commit-msg` フックは `commitlint` を実行し、上記のコミットメッセージ形式を強制します。マージ後は `post-merge` フックが自動的に `pnpm install` を実行します。

フックは自動で走るため、通常のコミットで十分です（手動で先に lint する必要はありませんが、ローカル確認用に `pnpm lint` / `pnpm format` が使えます）。
