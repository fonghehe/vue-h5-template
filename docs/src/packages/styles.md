# Styles

`packages/styles` 提供全局样式和各 UI 库的样式入口。

## 导出

```json
{
  ".": "src/index.ts",
  "./nutui": "src/nutui/index.css",
  "./vant": "src/vant/index.css",
  "./varlet": "src/varlet/index.css",
  "./global": "src/global/index.scss"
}
```

## 使用

```ts
// 导入全局样式
import '@vh5/styles';

// 导入特定 UI 库样式
import '@vh5/styles/nutui';
import '@vh5/styles/vant';
import '@vh5/styles/varlet';
```

## 设计系统

基于 `@vh5-core/design`，使用 BEM 命名规范管理样式。
