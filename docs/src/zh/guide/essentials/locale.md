# 国际化

## 概述

项目使用 `vue-i18n` 实现国际化，支持中文（简体/繁体）、英文、日语四种语言。

## 共享语言包

`packages/locales` 提供通用语言包，各应用共享使用：

```
packages/locales/src/langs/
├── zh-CN/    # 简体中文
│   ├── app.json
│   └── common.json
├── zh-TW/    # 繁体中文
│   ├── app.json
│   └── common.json
├── en-US/    # 英文
│   ├── app.json
│   └── common.json
└── ja-JP/    # 日语
    ├── app.json
    └── common.json
```

## 应用特有语言包

每个应用可在 `src/locales/langs/` 目录下定义自己的语言包：

```
apps/h5-nutui/src/locales/
├── index.ts          # i18n 初始化
└── langs/
    ├── zh-CN/nutui.json
    ├── zh-TW/nutui.json
    ├── en-US/nutui.json
    └── ja-JP/nutui.json
```

## 使用方式

在 Vue 组件中使用 `$t()` 或导入 `t` 函数：

```vue
<template>
  <div>{{ t("app.home") }}</div>
</template>

<script setup>
import { t } from "@/locales";
</script>
```

## 加载机制

各应用的 `locales/index.ts` 通过 `import.meta.glob` 动态加载本地语言包，并通过 `loadMessages` 回调与 `@vh5/locales` 的 `setupI18n` 集成。同时会加载对应 UI 框架的语言包（NutUI / Vant / Varlet）。

## 切换语言

```ts
import { loadLocaleMessages } from "@vh5/locales";

await loadLocaleMessages("en-US");
```

在"我的"页面中已内置语言切换功能，用户可以直接在应用内切换语言。

## 如何去掉国际化

如果你的项目不需要国际化功能，可以按照以下步骤移除：

### 1. 移除语言包文件

删除以下目录和文件：

```bash
# 删除共享语言包
rm -rf packages/locales/src/langs/

# 删除各应用的语言包
rm -rf apps/h5-nutui/src/locales/langs/
rm -rf apps/h5-vant/src/locales/langs/
rm -rf apps/h5-varlet/src/locales/langs/
```

### 2. 简化 locales/index.ts

将各应用的 `src/locales/index.ts` 替换为直接导出字符串的简单实现：

```ts
// src/locales/index.ts
const messages: Record<string, string> = {
  "app.home": "首页",
  "app.list": "列表",
  "app.mine": "我的",
  "app.example": "示例",
  // ... 其他文案
};

export function t(key: string): string {
  return messages[key] || key;
}

export const $t = t;
```

### 3. 移除 setupI18n 调用

在各应用的 `bootstrap.ts` 中删除 `await setupI18n(app)` 调用。

### 4. 移除依赖

```bash
# 在根目录执行
pnpm remove vue-i18n @intlify/core-base -r
```

### 5. 清理组件

移除组件中语言切换相关的代码（如"我的"页面中的语言选择器）。
