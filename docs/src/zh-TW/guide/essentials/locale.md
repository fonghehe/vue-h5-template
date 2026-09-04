# 國際化

頁面預設英文 `en-US`，Member 可選英文、簡體中文 `zh-CN`、日文 `ja-JP`。啟動優先套用 `vh5:locale` 保存的受支援語言，同步 `<html lang>`。文檔五語與應用三語選項不同。

共享文案在 `packages/locales/src/langs/{en-US,zh-CN,ja-JP}/{app,mobile,demo}.json`，包含無障礙、錯誤及路由標題。`zh-TW` 字典保留供自訂整合，未含完整 mobile/demo 新鍵，也不在預設選單。

各 `src/locales/index.ts` 載入應用及 UI 語言；NutUI 日文用 `nutui-ja.ts`，Varlet 先註冊再選擇，Vant 用原生語言包。共用元件用 `useI18n()`，應用用 `@/locales` 的 `t`。

使用 `await loadLocaleMessages('ja-JP')`，載入完成才切換，英文為共享回退。新增語言須更新型別、字典、保存白名單、LanguageSelect、原生適配與測試。

REST/AI 發送 `Accept-Language`；Nitro 翻譯商品 fixture，真實內容由後端負責，Query key 包含語言。共享頁面與 Query hook 依賴此套件，不能只刪除字典。
