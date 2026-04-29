# NutUI

[NutUI](https://nutui.jd.com/) 4.x ベースのモバイル H5 アプリ。

## 特徴

- NutUI コンポーネントのオンデマンド**ロード**（`NutUIResolver` により自動登録・ CSS 注入）
- グローバル SCSS 変数サポート（関数式注入、アプリ自身のファイルにのみ適用）
- NutUI アイコンライブラリ `@nutui/icons-vue`

## 起動

```bash
pnpm dev:nutui
```

デフォルトポート：`5777`

## 関数型コンポーネントのスタイル

`showToast`、`showNotify`、`showDialog`、`showImagePreview` などの関数型コンポーネントは Resolver で自動インポートできないため、`bootstrap.ts` で手動インポートが必要です：

```ts
import "@nutui/nutui/dist/packages/toast/style/css";
import "@nutui/nutui/dist/packages/notify/style/css";
import "@nutui/nutui/dist/packages/dialog/style/css";
import "@nutui/nutui/dist/packages/imagepreview/style/css";
```

## SCSS 設定

NutUI グローバル変数は Vite `additionalData` 関数式注入で、アプリ自身の SCSS ファイルにのみ適用されます：

```ts
css: {
  preprocessorOptions: {
    scss: {
      additionalData: (source: string, filename: string) => {
        if (filename.includes('/apps/h5-nutui/src/')) {
          return `@use "@nutui/nutui/dist/styles/variables.scss" as *;\n${source}`;
        }
        return source;
      },
    },
  },
}
```

## 使用している NutUI コンポーネント

| コンポーネント           | 用途                        |
| ------------------------ | --------------------------- |
| `nut-navbar`             | トップナビゲーションバー    |
| `nut-tabbar`             | ボトムタブバー              |
| `nut-cell`               | 商品リスト / リストアイテム |
| `nut-swiper`             | カルーセル                  |
| `nut-form` / `nut-input` | ログインフォーム            |
| `nut-avatar`             | ユーザーアバター            |
| `nut-grid`               | グリッドレイアウト          |
| `nut-button`             | ボタン                      |
| `showToast`              | トーストメッセージ（API）   |
| `showNotify`             | 通知（API）                 |
| `showDialog`             | ダイアログ（API）           |
