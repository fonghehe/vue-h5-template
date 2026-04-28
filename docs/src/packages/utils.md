# Utils

`packages/utils` 提供各 H5 应用共享的工具函数，内部聚合了 `@vh5-core/shared` 的缓存和工具模块。

## 安装

已作为 workspace 依赖，在 H5 应用的 `package.json` 中引用：

```json
{
  "dependencies": {
    "@vh5/utils": "workspace:*"
  }
}
```

## 异步错误处理

### `to()`

消除 try/catch 嵌套，将 Promise 转为 `[error, data]` 元组，使异步错误处理更简洁。

```ts
import { to } from "@vh5/utils";

// 替代 try/catch
const [err, data] = await to(getProductList());
if (err) {
  console.error("请求失败", err);
  return;
}
console.log(data);
```

项目中所有列表页和详情页均使用此模式：

```ts
// apps/h5-vant/src/views/list/index.vue
const [err, data] = await to(getProductList());
if (err) {
  console.error("获取商品列表失败", err);
  return;
}
if (data.code === 0) {
  list.value = data.data;
}
```

## 进度条

### `startProgress()` / `stopProgress()`

动态加载 NProgress，在路由导航时显示顶部进度条。

```ts
import { startProgress, stopProgress } from "@vh5/utils";

router.beforeEach(() => startProgress());
router.afterEach(() => stopProgress());
```

## 全局 Loading

### `unmountGlobalLoading()`

移除 HTML 中注入的全局骨架屏 loading，带 fade-out 过渡。在应用挂载后调用：

```ts
import { unmountGlobalLoading } from "@vh5/utils";

// main.ts
unmountGlobalLoading();
```

## 日期格式化

### `formatDate()` / `formatDateTime()`

基于 dayjs，支持时区处理：

```ts
import { formatDate, formatDateTime } from "@vh5/utils";

formatDate(new Date()); // '2024-01-01'
formatDate(new Date(), "YYYY-MM-DD HH:mm"); // '2024-01-01 12:00'
formatDateTime(new Date()); // '2024-01-01 12:00:00'
```

## 缓存管理

### `StorageManager`

带前缀和过期时间的 localStorage/sessionStorage 封装：

```ts
import { StorageManager } from "@vh5/utils";

const storage = new StorageManager({ prefix: "my-app-" });

// 设置（带过期时间，单位毫秒）
storage.setItem("token", "xxx", 7 * 24 * 60 * 60 * 1000);

// 获取（过期自动返回 null）
const token = storage.getItem("token");

// 清除所有带前缀的 key
storage.clear();

// 清除所有过期项
storage.clearExpiredItems();
```

## 文件下载

```ts
import { downloadFileFromUrl, downloadFileFromBase64, downloadFileFromBlob } from "@vh5/utils";

// 通过 URL 下载
await downloadFileFromUrl({ source: "https://example.com/file.pdf", fileName: "report.pdf" });

// 通过 Blob 下载
downloadFileFromBlob({ source: blob, fileName: "export.xlsx" });

// 通过 Base64 下载
downloadFileFromBase64({ source: base64String, fileName: "image.png" });
```

## 其他工具

| 函数                     | 说明                                   |
| ------------------------ | -------------------------------------- |
| `cloneDeep()`            | 深拷贝（lodash.clonedeep）             |
| `get()` / `set()`        | 对象路径读写（es-toolkit）             |
| `isEqual()`              | 深比较（es-toolkit）                   |
| `diffObj()`              | 对象差异比较                           |
| `generateTree()`         | 数组转树形结构                         |
| `flatTree()`             | 树形结构展平                           |
| `cn()`                   | 合并 CSS 类名（clsx + tailwind-merge） |
| `openWindow()`           | 安全打开新窗口                         |
| `isUrl()`                | URL 格式校验                           |
| `unmountGlobalLoading()` | 移除全局骨架屏                         |
