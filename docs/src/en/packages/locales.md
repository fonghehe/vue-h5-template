# Locales

`packages/locales` provides the `vue-i18n` based internationalization core module.

## Supported Languages

```ts
type SupportedLanguagesType = 'en-US' | 'ja-JP' | 'zh-CN';
```

## Exports

```ts
export { $t, $te, i18n, loadLocaleMessages, setupI18n };
```

## Usage

Each app initializes i18n in `src/locales/index.ts` and can inject app-specific translations and UI library locales via the `loadMessages` callback.
