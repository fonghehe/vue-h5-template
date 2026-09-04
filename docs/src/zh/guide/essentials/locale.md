# 国际化

页面默认英文 `en-US`。Member 提供 English、简体中文 `zh-CN`、日本語 `ja-JP`。启动时优先使用 `vh5:locale` 中保存的受支持语言，并同步 `<html lang>`。文档的五种语言与应用默认三语选择是两回事。

共享文案在 `packages/locales/src/langs/{en-US,zh-CN,ja-JP}/{app,mobile,demo}.json`，页面、无障碍标签、错误及路由标题的键要同步。保留的 `zh-TW` 字典用于自定义集成，不包含全部新增 mobile/demo 文案，也不在默认选择器中。

各应用 `src/locales/index.ts` 同步加载应用与组件库语言。NutUI 日文使用本地 `nutui-ja.ts` 适配；Varlet 先注册再选择语言；Vant 加载原生语言包。共享组件用 `useI18n()`，应用组件用 `@/locales` 的 `t`。

`await loadLocaleMessages('ja-JP')` 加载共享、应用和原生语言后切换，共享文案以英文回退。新增语言须同步修改 supported type、字典、持久化白名单、LanguageSelect、原生适配及测试。

REST 与 AI 请求发送 `Accept-Language`。Nitro 翻译商品 fixture，真实后端与 AI 内容由后端负责；Query key 包含语言。不要仅删除 i18n 文件，共享页面与 Query hook 仍依赖该包。
