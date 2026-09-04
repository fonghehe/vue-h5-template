# Internationalization

Pages default to English (`en-US`). Member exposes English, 简体中文 (`zh-CN`) and 日本語 (`ja-JP`). A saved supported choice in `vh5:locale` takes precedence on startup; `<html lang>` updates. The five documentation locales are separate from the three app switcher options.

Shared page copy is in `packages/locales/src/langs/{en-US,zh-CN,ja-JP}/{app,mobile,demo}.json`. Keep key sets aligned, including accessibility labels, errors and route titles. Existing `zh-TW` dictionaries remain for custom integration but do not contain all new mobile/demo keys and are not in the default selector.

Each app's `src/locales/index.ts` loads app messages and native UI language packs. NutUI uses the local `nutui-ja.ts` adapter for Japanese; Varlet registers then selects locale; Vant loads its locale pack. Use `useI18n()` in shared components, and `t` from `@/locales` in app components.

`await loadLocaleMessages('ja-JP')` switches language. It loads shared/app/native messages before applying the choice; English is the shared fallback. To add a language, update the supported type, messages, persistence allowlist, LanguageSelect, native adapters and tests together.

REST and AI requests send `Accept-Language`. Nitro localizes product fixtures; real backend and AI content remain the backend's responsibility. Query keys include locale. Do not remove i18n files alone: shared pages and Query hooks depend on the locale package.
