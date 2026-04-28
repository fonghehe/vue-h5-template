# 國際化套件 (@vh5/locales)

基於 [vue-i18n](https://vue-i18n.intlify.dev/) 的共享國際化套件。

## 支援語言

```ts
type SupportedLanguagesType = "en-US" | "ja-JP" | "zh-CN" | "zh-TW";
```

## 目錄結構

```
packages/locales/src/langs/
├── en-US/
├── ja-JP/
├── zh-CN/
└── zh-TW/
```

## 新增語言

1. 在 `packages/locales/src/langs/` 下建立新的語言目錄
2. 新增 `SupportedLanguagesType` 型別
3. 在各應用的 `src/locales/` 中新增對應的 UI 庫語言套件載入邏輯
