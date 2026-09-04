# Varlet

3 アプリ共通の Home/List/Member/Examples は `/home`、`/list`、`/member`、`/examples` です。業務画面は `packages/mobile-ui`、ネイティブナビと `/examples/components` はアプリ固有です。英語既定で Home/Member に中日切替があります。テーマ付き AI ボタンは `/ai/chat` を開き、Chat/Login/Cart/Details では隠れます。

Varlet 3 は `VarletImportResolver` で読み込み、全登録しません。紫 `#6750a4`、`var-app-bar` / `var-bottom-navigation` を使用。言語は `Locale.add(lang, messages)` の後に `Locale.use(lang)` を呼びます。専用 UnoCSS preset はこのアプリだけに適用します。

```bash
pnpm dev:varlet
pnpm dev:services:varlet
pnpm build:varlet
pnpm -F @vh5/h5-varlet preview
```

Port: `5779`.

[バックエンドモード](../guide/essentials/server.md) · [テーマ](../guide/essentials/styles.md) · [ルート動作](../guide/essentials/route.md)
