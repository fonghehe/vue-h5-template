# Utils

`packages/utils` 提供各 H5 應用共享的工具函式，內部聚合了 `@vh5-core/shared` 的快取和工具模組。

## 非同步錯誤處理

### `to()`

消除 try/catch 巢狀，將 Promise 轉為 `[error, data]` 元組：

```ts
import { to } from '@vh5/utils';

const [err, data] = await to(getProductList());
if (err) {
  console.error('請求失敗', err);
  return;
}
console.log(data);
```

## 進度條

```ts
import { startProgress, stopProgress } from '@vh5/utils';

router.beforeEach(() => startProgress());
router.afterEach(() => stopProgress());
```

## 全域 Loading

### `unmountGlobalLoading()`

移除 HTML 中注入的全域骨架屏 loading，帶 fade-out 過渡：

```ts
import { unmountGlobalLoading } from '@vh5/utils';
unmountGlobalLoading();
```

## 日期格式化

```ts
import { formatDate, formatDateTime } from '@vh5/utils';

formatDate(new Date()); // '2024-01-01'
formatDate(new Date(), 'YYYY-MM-DD HH:mm'); // '2024-01-01 12:00'
formatDateTime(new Date()); // '2024-01-01 12:00:00'
```

## 快取管理

### `StorageManager`

帶前綴和過期時間的 localStorage 封裝：

```ts
import { StorageManager } from '@vh5/utils';

const storage = new StorageManager({ prefix: 'my-app-' });
storage.setItem('token', 'xxx', 7 * 24 * 60 * 60 * 1000);
const token = storage.getItem('token');

// 清除所有過期項目
storage.clearExpiredItems();
```

## 檔案下載

```ts
import {
  downloadFileFromUrl,
  downloadFileFromBase64,
  downloadFileFromBlob,
} from '@vh5/utils';

// 透過 URL 下載
await downloadFileFromUrl({
  source: 'https://example.com/file.pdf',
  fileName: 'report.pdf',
});

// 透過 Blob 下載
downloadFileFromBlob({ source: blob, fileName: 'export.xlsx' });

// 透過 Base64 下載
downloadFileFromBase64({ source: base64String, fileName: 'image.png' });
```

## 其他工具

| 函式              | 說明                             |
| ----------------- | -------------------------------- |
| `cloneDeep()`     | 深拷貝（lodash.clonedeep）       |
| `get()` / `set()` | 物件路徑讀寫（es-toolkit）       |
| `isEqual()`       | 深比較（es-toolkit）             |
| `cn()`            | 合併 CSS 類名（clsx + tailwind） |
| `openWindow()`    | 安全開啟新視窗                   |
| `generateTree()`  | 陣列轉樹狀結構                   |
| `flatTree()`      | 樹狀結構展平                     |
| `diffObj()`       | 物件差異比較                     |
| `isUrl()`         | URL 格式校驗                     |
| `unmountGlobalLoading()` | 移除全域骨架屏             |
