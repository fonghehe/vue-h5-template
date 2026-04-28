# Locales

`packages/locales` が `vue-i18n` ベースの国際化コアモジュールを提供します。

## サポート言語

```ts
type SupportedLanguagesType = 'en-US' | 'ja-JP' | 'zh-CN';
```

各アプリは `src/locales/index.ts` で i18n を初期化し、`loadMessages` コールバックでアプリ固有の翻訳と UI ライブラリの Locale を注入できます。
