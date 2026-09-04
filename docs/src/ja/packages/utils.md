# Utils

`packages/utils` は全 H5 アプリ共通のユーティリティ関数を提供します。`@vh5-core/shared` のキャッシュ・ユーティリティモジュールを集約しています。

## 非同期エラーハンドリング

### `to()`

try/catch をなくし、Promise を `[error, data]` タプルに変換します。

```ts
import { to } from '@vh5/utils';

const [err, data] = await to(getProductList());
if (err) {
  console.error('リクエスト失敗', err);
  return;
}
console.log(data);
```

## プログレスバー

```ts
import { startProgress, stopProgress } from '@vh5/utils';

router.beforeEach(() => startProgress());
router.afterEach(() => stopProgress());
```

## グローバルローディング

### `unmountGlobalLoading()`

アプリマウント後にスケルトン画面を削除します：

```ts
import { unmountGlobalLoading } from '@vh5/utils';
unmountGlobalLoading();
```

## 日付フォーマット

```ts
import { formatDate, formatDateTime } from '@vh5/utils';

formatDate(new Date()); // '2024-01-01'
formatDate(new Date(), 'YYYY-MM-DD HH:mm'); // '2024-01-01 12:00'
formatDateTime(new Date()); // '2024-01-01 12:00:00'
```

## キャッシュ管理

### `StorageManager`

プレフィックスと有効期限付きの localStorage ラッパー：

```ts
import { StorageManager } from '@vh5/utils';

const storage = new StorageManager({ prefix: 'my-app-' });
storage.setItem('token', 'xxx', 7 * 24 * 60 * 60 * 1000);
const token = storage.getItem('token');

// プレフィックス付きの key をすべてクリア
storage.clear();

// 期限切れの項目をすべてクリア
storage.clearExpiredItems();
```

## ファイルダウンロード

```ts
import {
  downloadFileFromUrl,
  downloadFileFromBase64,
  downloadFileFromBlob,
} from '@vh5/utils';

// URL からダウンロード
await downloadFileFromUrl({
  source: 'https://example.com/file.pdf',
  fileName: 'report.pdf',
});

// Blob からダウンロード
downloadFileFromBlob({ source: blob, fileName: 'export.xlsx' });

// Base64 からダウンロード
downloadFileFromBase64({ source: base64String, fileName: 'image.png' });
```

## その他のユーティリティ

| 関数                     | 説明                                   |
| ------------------------ | -------------------------------------- |
| `cloneDeep()`            | ディープコピー（lodash.clonedeep）     |
| `get()` / `set()`        | オブジェクトパス読み書き（es-toolkit） |
| `isEqual()`              | ディープ等値比較（es-toolkit）         |
| `diffObj()`              | オブジェクト差分比較                   |
| `generateTree()`         | 配列からツリー構造へ変換               |
| `flatTree()`             | ツリー構造の平坦化                     |
| `cn()`                   | CSS クラス名の結合（clsx + tailwind-merge） |
| `openWindow()`           | 安全な新規ウィンドウオープン           |
| `isUrl()`                | URL 形式検証                           |
| `unmountGlobalLoading()` | グローバルスケルトン解除               |
