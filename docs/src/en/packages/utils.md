# Utils

`packages/utils` provides shared utility functions for all H5 apps, aggregating the cache and utility modules from `@vh5-core/shared`.

## Installation

Already included as a workspace dependency:

```json
{
  "dependencies": {
    "@vh5/utils": "workspace:*"
  }
}
```

## Async Error Handling

### `to()`

Eliminate try/catch nesting by converting a Promise into a `[error, data]` tuple.

```ts
import { to } from "@vh5/utils";

const [err, data] = await to(getProductList());
if (err) {
  console.error("Request failed", err);
  return;
}
console.log(data);
```

## Progress Bar

### `startProgress()` / `stopProgress()`

Dynamically loads NProgress to show a top progress bar during route navigation.

```ts
import { startProgress, stopProgress } from "@vh5/utils";

router.beforeEach(() => startProgress());
router.afterEach(() => stopProgress());
```

## Global Loading

### `unmountGlobalLoading()`

Removes the injected skeleton screen loading with a fade-out transition. Call after app mount:

```ts
import { unmountGlobalLoading } from "@vh5/utils";
unmountGlobalLoading();
```

## Date Formatting

```ts
import { formatDate, formatDateTime } from "@vh5/utils";

formatDate(new Date()); // '2024-01-01'
formatDateTime(new Date()); // '2024-01-01 12:00:00'
```

## Cache Manager

### `StorageManager`

LocalStorage/sessionStorage wrapper with prefix and expiry support:

```ts
import { StorageManager } from "@vh5/utils";

const storage = new StorageManager({ prefix: "my-app-" });

// Set with expiry (ms)
storage.setItem("token", "xxx", 7 * 24 * 60 * 60 * 1000);

// Get (returns null if expired)
const token = storage.getItem("token");

// Clear all prefixed keys
storage.clear();
```

## File Download

```ts
import { downloadFileFromUrl, downloadFileFromBlob } from "@vh5/utils";

await downloadFileFromUrl({ source: "https://example.com/file.pdf", fileName: "report.pdf" });
downloadFileFromBlob({ source: blob, fileName: "export.xlsx" });
```

## Other Utilities

| Function          | Description                         |
| ----------------- | ----------------------------------- |
| `cloneDeep()`     | Deep clone (lodash.clonedeep)       |
| `get()` / `set()` | Object path read/write (es-toolkit) |
| `isEqual()`       | Deep comparison (es-toolkit)        |
| `cn()`            | Merge CSS class names (clsx + tw)   |
| `openWindow()`    | Safely open a new window            |
| `generateTree()`  | Convert array to tree structure     |
| `flatTree()`      | Flatten tree structure              |
