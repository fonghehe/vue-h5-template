# Internationalization

## Overview

The project uses `vue-i18n` for internationalization, supporting Simplified Chinese, Traditional Chinese, English, and Japanese.

## Shared Locale Files

`packages/locales` provides shared locale files used across all apps:

```
packages/locales/src/langs/
├── zh-CN/    # Simplified Chinese
│   ├── app.json
│   └── common.json
├── zh-TW/    # Traditional Chinese
│   ├── app.json
│   └── common.json
├── en-US/    # English
│   ├── app.json
│   └── common.json
└── ja-JP/    # Japanese
    ├── app.json
    └── common.json
```

## App-specific Locale Files

Each app can define its own locale files in `src/locales/langs/`:

```
apps/h5-nutui/src/locales/
├── index.ts          # i18n initialization
└── langs/
    ├── zh-CN/nutui.json
    ├── zh-TW/nutui.json
    ├── en-US/nutui.json
    └── ja-JP/nutui.json
```

## Usage

```vue
<template>
  <div>{{ t("app.home") }}</div>
</template>

<script setup>
import { t } from "@/locales";
</script>
```

## Loading Mechanism

Each app's `locales/index.ts` dynamically loads locale files via `import.meta.glob` and integrates with `@vh5/locales`'s `setupI18n` via a `loadMessages` callback. It also loads the corresponding UI library locale (NutUI / Vant / Varlet).

## Switching Language

```ts
import { loadLocaleMessages } from "@vh5/locales";

await loadLocaleMessages("en-US");
```

A built-in language switcher is available on the "Mine" page.

## How to Remove Internationalization

If your project does not need i18n, follow these steps:

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
