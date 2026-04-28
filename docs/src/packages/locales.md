# Locales

`packages/locales` 提供基于 `vue-i18n` 的国际化核心模块。

## 安装

已作为 workspace 依赖：

```json
{
  "dependencies": {
    "@vh5/locales": "workspace:*"
  }
}
```

## 导出

```ts
export { $t, $te, i18n, loadLocaleMessages, loadLocalesMap, loadLocalesMapFromDir, setupI18n };
export type { ImportLocaleFn, LocaleSetupOptions, SupportedLanguagesType };
```

## 支持的语言

```ts
type SupportedLanguagesType = 'en-US' | 'ja-JP' | 'zh-CN';
```

## 语言包结构

```
src/langs/
├── zh-CN/
│   ├── app.json            # H5 应用通用文案
│   ├── common.json         # 通用文案（返回、确认、取消等）
│   ├── authentication.json # 登录认证文案
│   ├── preferences.json    # 偏好设置文案
│   ├── profile.json        # 个人信息文案
│   └── ui.json             # UI 组件文案
├── en-US/                  # 同 zh-CN 结构
└── ja-JP/
    ├── app.json
    └── common.json
```

## 在应用中使用

各应用在 `src/locales/index.ts` 中初始化 i18n，并可通过 `loadMessages` 回调注入应用特有的翻译和第三方 UI 库的 Locale。
