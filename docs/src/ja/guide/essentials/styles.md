# スタイル

## グローバルスタイル

`packages/styles` がグローバル基本スタイルと各 UI ライブラリのスタイルエントリを提供します：

```ts
import "@vh5/styles/global"; // グローバル基本スタイル
import "@vh5/styles/nutui"; // NutUI テーマスタイル（オプション）
import "@vh5/styles/vant"; // Vant テーマスタイル（オプション）
import "@vh5/styles/varlet"; // Varlet テーマスタイル（オプション）
```

## オンデマンドロード戦略

### Vant

- `VantResolver({ importStyle: true })` で完全オンデマンドロード、`app.use(Vant)` 不要
- `vant/lib/index.css` の別途インポート不要（Resolver に CSS 注入順序を任せる）

```ts
// bootstrap.ts (vant)
import "@vh5/styles/global";
// ✅ Vant コンポーネント CSS は VantResolver が自動注入
// ❌ app.use(Vant) 不要
```

### Varlet

- `VarletImportResolver` で完全オンデマンドロード
- **Snackbar（関数式）**：Snackbar を使用するファイルで手動インポートが必要

```ts
import { Snackbar } from "@varlet/ui";
import "@varlet/ui/es/snackbar/style/index.mjs";
```

### NutUI

- `NutUIResolver` で完全オンデマンドロード
- **関数式コンポーネント**（Toast/Notify/Dialog/ImagePreview）：`bootstrap.ts` で手動インポート

```ts
import "@nutui/nutui/dist/packages/toast/style/css";
import "@nutui/nutui/dist/packages/notify/style/css";
import "@nutui/nutui/dist/packages/dialog/style/css";
import "@nutui/nutui/dist/packages/imagepreview/style/css";
```

## NutUI SCSS 変数

NutUI のグローバル変数は Vite SCSS `additionalData` 関数式注入で、アプリ自身の SCSS ファイルにのみ適用されます。

## モバイル対応

`postcss-mobile-forever` で px を viewport 単位に自動変換（デザイン幅 375px、最大表示幅 600px）。

## UnoCSS

[UnoCSS](https://unocss.dev/) をアトミック CSS エンジンとして使用。設定ファイルはプロジェクトルートの `uno.config.ts`。

### 内蔵ショートカット

| ショートカット    | 相当するクラス                              |
| ----------------- | ------------------------------------------- |
| `flex-center`     | `flex items-center justify-center`          |
| `flex-between`    | `flex items-center justify-between`         |
| `flex-col-center` | `flex flex-col items-center justify-center` |

### 使用例

```vue
<template>
  <div class="flex-center h-full text-lg text-gray-600">Hello UnoCSS</div>
</template>
```

Attributify モードもサポート：

```vue
<div flex items-center justify-center text-lg>
  Hello UnoCSS
</div>
```

## BEM 命名

`@vh5-core/design` デザイントークンに基づく BEM 命名規則。
