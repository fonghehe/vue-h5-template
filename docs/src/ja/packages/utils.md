# Utils

`packages/utils` は全 H5 アプリ共通のユーティリティ関数を提供します。`@vh5-core/shared` のキャッシュ・ユーティリティモジュールを集約しています。

## 非同期エラーハンドリング

### `to()`

try/catch をなくし、Promise を `[error, data]` タプルに変換します。

```ts
import { to } from "@vh5/utils";

const [err, data] = await to(getProductList());
if (err) {
  console.error("リクエスト失敗", err);
  return;
}
console.log(data);
```

## プログレスバー

```ts
import { startProgress, stopProgress } from "@vh5/utils";

router.beforeEach(() => startProgress());
router.afterEach(() => stopProgress());
```

## グローバルローディング

### `unmountGlobalLoading()`

アプリマウント後にスケルトン画面を削除します：

```ts
import { unmountGlobalLoading } from "@vh5/utils";
unmountGlobalLoading();
```

## 日付フォーマット

```ts
import { formatDate, formatDateTime } from "@vh5/utils";

formatDate(new Date()); // '2024-01-01'
formatDateTime(new Date()); // '2024-01-01 12:00:00'
```

## キャッシュ管理

### `StorageManager`

プレフィックスと有効期限付きの localStorage ラッパー：

```ts
import { StorageManager } from "@vh5/utils";

const storage = new StorageManager({ prefix: "my-app-" });
storage.setItem("token", "xxx", 7 * 24 * 60 * 60 * 1000);
const token = storage.getItem("token");
```
