# Styles

`packages/styles` はグローバルスタイルと各 UI ライブラリのスタイルエントリを提供します。

## エクスポート

```json
{
  ".": "src/index.ts",
  "./nutui": "src/nutui/index.css",
  "./vant": "src/vant/index.css",
  "./varlet": "src/varlet/index.css",
  "./global": "src/global/index.scss"
}
```

## 使用方法

```ts
import '@vh5/styles';
import '@vh5/styles/nutui';
import '@vh5/styles/vant';
import '@vh5/styles/varlet';
```
