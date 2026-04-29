# Varlet

[Varlet](https://varlet.pages.dev/) 3.x ベースのモバイル H5 アプリ。

## 特徴

- Varlet コンポーネントの完全オンデマンド**ロード**、`VarletImportResolver` で自動登録・ CSS 注入 — `app.use(Varlet)` 不要
- Material Design スタイル
- 組み込み Snackbar API コンポーネント

## 起動

```bash
pnpm dev:varlet
```

デフォルトポート：`5779`

## オンデマンドロードの説明

```ts
// bootstrap.ts — VarletImportResolver が自動処理するため全量登録不要
import "@vh5/styles/global";
// ❌ app.use(Varlet) や全量 CSS インポートは使用しない
```

## 使用している Varlet コンポーネント

| コンポーネント          | 用途                        |
| ----------------------- | --------------------------- |
| `var-app-bar`           | トップナビゲーションバー    |
| `var-bottom-navigation` | ボトムタブバー              |
| `var-cell`              | 商品リスト / リストアイテム |
| `var-swipe`             | カルーセル                  |
| `var-input`             | 入力フィールド              |
| `var-image`             | 画像表示                    |
| `var-button`            | ボタン                      |
| `var-space`             | スペーシングレイアウト      |
| `Snackbar`              | トーストメッセージ（API）   |

| コンポーネント          | 用途                      |
| ----------------------- | ------------------------- |
| `var-app-bar`           | トップナビゲーションバー  |
| `var-bottom-navigation` | ボトムタブバー            |
| `var-card`              | 商品カード                |
| `var-swipe`             | カルーセル                |
| `var-input`             | 入力フィールド            |
| `var-image`             | 画像表示                  |
| `var-button`            | ボタン                    |
| `var-space`             | スペーシングレイアウト    |
| `var-cell`              | リストアイテム            |
| `Snackbar`              | トーストメッセージ（API） |
