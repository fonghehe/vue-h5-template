# 翻訳と多言語ドキュメント

ドキュメントサイトは VitePress で構築されており、5 言語で提供されています。このガイドではディレクトリ構成と、言語間の同期方法を説明します。

## 言語

| Locale key | 名称 | `lang` |
| ---------- | ---- | ------ |
| `root` | English | `en-US` |
| `zh` | 简体中文 | `zh-CN` |
| `ja` | 日本語 | `ja` |
| `zh-TW` | 繁體中文(台) | `zh-TW` |
| `zh-HK` | 繁體中文(港) | `zh-HK` |

言語のメタデータと言語切替は `docs/.vitepress/config/` にあります。各言語は専用の設定ファイルを持ち、`index.mts` がそれらを統合し、`en.mts` / `zh.mts` / `ja.mts` / `zh-TW.mts` / `zh-HK.mts` がそれぞれの言語の `nav` と `sidebar` を保持しています。

## ディレクトリ構成

すべてのドキュメントは `docs/src/` 配下にあります。英語（root）のページは最上位に、その他の各言語は専用フォルダに置かれます：

```
docs/src/
├── guide/            # 英語（root）のページ
├── zh/guide/         # 简体中文
├── ja/guide/         # 日本語
├── zh-TW/guide/      # 繁體中文(台)
└── zh-HK/guide/      # 繁體中文(港)
```

`apps/` と `packages/` も同様の構成です。

## 翻訳ページの追加

1. **パスのミラーリング。** 英語ページが `docs/src/guide/project/architecture.md` の場合、日本語版は `docs/src/ja/guide/project/architecture.md` に置きます —— 言語フォルダ以降のパスを一致させます。VitePress はミラーしたパスをもとに言語切替で両者を紐付けるため、翻訳ページはワンクリックで行き来できます。
2. **サイドバーへの登録。** `docs/.vitepress/config/<locale>.mts` を開き、該当するサイドバーグループ（例：*プロジェクト* グループ）にページを追加します。この手順がないとページは存在しますがナビゲーションに表示されません。
3. **内容の翻訳。** 見出し、コードブロック、`meta.title` の値を原文と揃え、どの言語でも同じ構成が得られるようにします。

## 言語の同期を保つには

自動同期ツールはありません —— 一貫性は慣習によって保たれます：

- **ページごとの単一情報源。** 英語ページを変更したら、同じ PR で他の 4 つの翻訳も更新します。
- **サイドバー順の一致。** 5 言語のサイドバー項目の順序を一致させ、ナビゲーションの体験を統一します。
- **見出し / アンカーの一致。** 見出しは相互に対応させ、相互リンクと目次が揃うようにします。
- **ローカルでプレビュー。** `pnpm dev:docs` を実行し、切替で言語を変えて正しく描画・リンクされているか確認します。

## 新しい言語の追加

1. `zh.mts` にならって `docs/.vitepress/config/<lang>.mts` を作成します（`label`、`lang`、`link: '/<lang>/'`、および完全な `nav` / `sidebar` を設定）。
2. `docs/.vitepress/config/index.mts` の `locales` に登録します（例：`'<lang>': { ...<lang> }`）。
3. `docs/src/<lang>/` を作成し、既存言語からページツリーをまるごとコピーしてから翻訳します。
4. 検索 UI を多言語化する場合は `docs/.vitepress/config/shared.mts` の `search.locales` ブロックに新言語を追加します。

本番サイトは GitHub Pages の `/vue-h5-template/` 配下にデプロイされます（詳細は `.github/workflows/docs.yml`）。
