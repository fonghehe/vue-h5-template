# 機能の追加

1. 共有画面は `packages/mobile-ui/src`、各アプリに遅延ラッパーと明示ルートを追加。固有 UI はアプリ内です。

2. 英中日の文言と `meta.title` キーを同期。共通パス・テーマ・safe area を保ちます。

3. OpenAPI 更新と型生成後、`packages/api-client/src/modules` と Mock handler を追加。遠隔データは Query、クライアント状態は Pinia。

4. unit/component/共有 E2E を追加し `pnpm check` と関連 E2E を実行。共有パッケージを単独でも型チェックします。

5. 文書 5 言語と公開パッケージの changeset を更新し、`AGENTS.md` に従います。

既存の `CatalogPage.vue`、`queries.ts`、Request 例を参照。旧 `res.code`/`res.data` や Pinia にサーバー一覧を保存する例は使わないでください。

```vue
<!-- apps/h5-*/src/views/list/index.vue -->
<script setup lang="ts">
import CatalogPage from '@vh5/mobile-ui/CatalogPage.vue';
</script>

<template>
  <CatalogPage />
</template>
```
