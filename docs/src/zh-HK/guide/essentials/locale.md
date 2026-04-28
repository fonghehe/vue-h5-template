# 國際化

## 概述

專案使用 `vue-i18n` 實現國際化，支援簡體中文、繁體中文、英文、日語四種語言。

## 共享語言套件

`packages/locales` 提供通用語言套件，各應用共享使用。

## 應用特有語言套件

每個應用可在 `src/locales/langs/` 目錄下定義自己的語言套件。

## 使用方式

```vue
<template>
  <div>{{ t("app.home") }}</div>
</template>

<script setup>
import { t } from "@/locales";
</script>
```

## 切換語言

```ts
import { loadLocaleMessages } from "@vh5/locales";

await loadLocaleMessages("zh-TW");
```

在「我的」頁面中已內建語言切換功能，使用者可以直接在應用內切換語言。

## 如何去掉國際化

如果您的專案不需要國際化功能，可以按照以下步驟移除：

### 1. 移除語言套件檔案

```bash
rm -rf packages/locales/src/langs/
rm -rf apps/h5-nutui/src/locales/langs/
rm -rf apps/h5-vant/src/locales/langs/
rm -rf apps/h5-varlet/src/locales/langs/
```

### 2. 簡化 locales/index.ts

將各應用的 `src/locales/index.ts` 替換為直接匯出字串的簡單實現。

### 3. 移除 setupI18n 呼叫

在各應用的 `bootstrap.ts` 中刪除 `await setupI18n(app)` 呼叫。

### 4. 移除相依套件

```bash
pnpm remove vue-i18n @intlify/core-base -r
```

### 5. 清理元件

移除元件中語言切換相關的程式碼。
