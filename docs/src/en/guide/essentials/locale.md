# Internationalization

## Overview

The project uses `vue-i18n` for internationalization, supporting Simplified Chinese, Traditional Chinese, English, and Japanese.

## Shared Locale Files

`packages/locales` provides shared locale files used across all apps. Each app can also define its own locale files in `src/locales/langs/`.

## Usage

```vue
<template>
  <div>{{ t("app.home") }}</div>
</template>

<script setup>
import { t } from "@/locales";
</script>
```

## Switching Language

```ts
import { loadLocaleMessages } from "@vh5/locales";
await loadLocaleMessages("en-US");
```

A built-in language switcher is available on the "Mine" page, allowing users to switch languages directly within the app.

## How to Remove Internationalization

If your project does not need i18n, follow these steps to remove it:

### 1. Remove Locale Files

```bash
rm -rf packages/locales/src/langs/
rm -rf apps/h5-nutui/src/locales/langs/
rm -rf apps/h5-vant/src/locales/langs/
rm -rf apps/h5-varlet/src/locales/langs/
```

### 2. Simplify locales/index.ts

Replace each app's `src/locales/index.ts` with a simple string map:

```ts
const messages: Record<string, string> = {
  "app.home": "Home",
  "app.list": "List",
  "app.mine": "Mine",
  "app.example": "Example",
  // ... other keys
};

export function t(key: string): string {
  return messages[key] || key;
}

export const $t = t;
```

### 3. Remove setupI18n

Remove `await setupI18n(app)` from each app's `bootstrap.ts`.

### 4. Remove Dependencies

```bash
pnpm remove vue-i18n @intlify/core-base -r
```

### 5. Clean Up Components

Remove language switcher code from components (e.g., the language picker on the "Mine" page).
