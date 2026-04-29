# Vant

[Vant](https://vant-ui.github.io/vant/) 4.x ベースのモバイル H5 アプリ。

## 特徴

- Vant コンポーネントのオンデマンド**ロード**、`VantResolver` で自動登録 — `app.use(Vant)` 不要
- CSS 全量ロード（`vant/lib/index.css`）で Toast/Dialog のスタイル順序を保証
- 組み込み `showToast`、`showDialog` API 呼び出し

## 起動

```bash
pnpm dev:vant
```

デフォルトポート：`5778`

## オンデマンドロードの説明

```ts
// bootstrap.ts
// ✅ グローバル基本スタイルのみインポート、Vant コンポーネント CSS は VantResolver が自動注入
import "@vh5/styles/global";
// ❌ app.use(Vant) による全量登録は使用しない
// ❌ vant/lib/index.css の追加インポートは不要
```

`VantResolver` はデフォルトで `importStyle: true` となり、コンポーネント使用時に対応 CSS を自動注入します。

## 使用している Vant コンポーネント

| コンポーネント                | 用途                        |
| ----------------------------- | --------------------------- |
| `van-nav-bar`                 | トップナビゲーションバー    |
| `van-tabbar`                  | ボトムタブバー              |
| `van-cell` / `van-cell-group` | 商品リスト / リストアイテム |
| `van-swipe`                   | カルーセル                  |
| `van-form` / `van-field`      | ログインフォーム            |
| `van-image`                   | 画像表示                    |
| `van-button`                  | ボタン                      |
| `van-tag`                     | タグ                        |
| `van-empty`                   | 空状態                      |
| `van-back-top`                | トップに戻る                |
| `showToast`                   | トーストメッセージ（API）   |
| `showDialog`                  | ダイアログ（API）           |

| コンポーネント           | 用途                     |
| ------------------------ | ------------------------ |
| `van-nav-bar`            | トップナビゲーションバー |
| `van-tabbar`             | ボトムタブバー           |
| `van-card`               | 商品カード               |
| `van-swipe`              | カルーセル               |
| `van-form` / `van-field` | ログインフォーム         |
| `van-image`              | 画像表示                 |
| `van-cell`               | リストアイテム           |
| `van-button`             | ボタン                   |
| `van-tag`                | タグ                     |
| `van-empty`              | 空状態                   |
| `van-back-top`           | トップに戻る             |
