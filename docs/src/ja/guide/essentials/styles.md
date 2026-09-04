# スタイルとモバイルテーマ

各アプリは `@vh5/styles/global` と 1 つのテーマ（vant / nutui / varlet）のみ読み込みます。3 テーマを一緒に使わないでください。`packages/styles/src/<ui>/index.css` に Vant 青 `#1989fa`、NutUI 赤 `#fa2c19`、Varlet 紫 `#6750a4` を定義します。

```ts
// Vant bootstrap; choose only the current app's theme.
import '@vh5/styles/global';
import '@vh5/styles/vant';
```

```css
/* packages/styles/src/vant/index.css */
.van-nav-bar {
  --van-nav-bar-background: var(--app-primary);
  --van-nav-bar-title-text-color: #fff;
  --van-nav-bar-icon-color: #fff;
  --van-nav-bar-text-color: #fff;
}
```

Vant の変数を `:root` だけでなくコンポーネントに設定し、後から読み込む CSS による白背景への上書きを防ぎます。背景は `--app-primary`、タイトル・戻るアイコン・テキスト操作は白です。resolver が UI を必要時に読み込みます。NutUI の関数型 Toast/Notify/Dialog/ImagePreview は bootstrap で CSS を明示し、SCSS 変数注入はアプリ内のみです。

共有 CSS は `packages/mobile-ui/src/surface.css` と scoped SFC。320px でグリッド、折り返し、44px タッチ領域を保ちます。共有パッケージは px-to-vw の対象外、他は設計幅 375px、最大表示幅 600px です。

UnoCSS はルートではなく `internal/vite-config/src/plugins/unocss.ts` にあります。presetUno/attributify/icons、Varlet のみ専用 preset。shortcut は `mobile-card`、`page-shell`、`tap-target`。rule は `safe-area-pt/pb/px`、`h-safe-screen`。ブレークポイントは 375/600/768px。複雑な画面は scoped CSS を使います。

ビルド設定変更後は `pnpm -F @vh5/vite-config stub`。共有 SVG は `packages/mobile-ui/src/assets/icons`、Vant 固有アイコンも残ります。[UI 戦略](../v2/ui-framework.md)を参照してください。
