# NutUI

3 アプリ共通の Home/List/Member/Examples は `/home`、`/list`、`/member`、`/examples` です。業務画面は `packages/mobile-ui`、ネイティブナビと `/examples/components` はアプリ固有です。英語既定で Home/Member に中日切替があります。テーマ付き AI ボタンは `/ai/chat` を開き、Chat/Login/Cart/Details では隠れます。

NutUI 4 は `NutUIResolver` と `@nutui/icons-vue` を使用、テーマは赤 `#fa2c19`。`NutNavbar` と `NutTabbarItem.to` でナビゲーションします。日本語は `src/locales/nutui-ja.ts`。関数型 Toast/Notify/Dialog/ImagePreview CSS は bootstrap で明示、SCSS 変数はアプリ内のみです。

```bash
pnpm dev:nutui
pnpm dev:services:nutui
pnpm build:nutui
pnpm -F @vh5/h5-nutui preview
```

Port: `5777`.

[バックエンドモード](../guide/essentials/server.md) · [テーマ](../guide/essentials/styles.md) · [ルート動作](../guide/essentials/route.md)
