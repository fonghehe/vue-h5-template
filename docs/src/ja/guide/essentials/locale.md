# 国際化

`vue-i18n` を使用した国際化。簡体字中国語、繁体字中国語、英語、日本語の4言語をサポート。

## 使用方法

```vue
<template>
  <div>{{ t("app.home") }}</div>
</template>

<script setup>
import { t } from "@/locales";
</script>
```

## 言語切り替え

```ts
import { loadLocaleMessages } from "@vh5/locales";
await loadLocaleMessages("ja-JP");
```

「マイページ」に言語切り替え機能が内蔵されており、アプリ内で直接言語を切り替えることができます。

## 国際化の削除方法

プロジェクトに国際化が不要な場合は、以下の手順で削除できます：

### 1. ロケールファイルの削除

```bash
rm -rf packages/locales/src/langs/
rm -rf apps/h5-nutui/src/locales/langs/
rm -rf apps/h5-vant/src/locales/langs/
rm -rf apps/h5-varlet/src/locales/langs/
```

### 2. locales/index.ts の簡略化

各アプリの `src/locales/index.ts` を簡単な文字列マップに置き換えます。

### 3. setupI18n の削除

各アプリの `bootstrap.ts` から `await setupI18n(app)` を削除します。

### 4. 依存関係の削除

```bash
pnpm remove vue-i18n @intlify/core-base -r
```

### 5. コンポーネントのクリーンアップ

コンポーネントから言語切り替え関連のコードを削除します。
