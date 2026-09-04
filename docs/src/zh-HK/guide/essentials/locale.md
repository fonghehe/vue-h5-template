# 國際化

頁面預設英文 `en-US`，Home 同 Member 可揀英文、簡體中文 `zh-CN`、日文 `ja-JP`。啟動優先用 `vh5:locale` 保存嘅受支援語言，同步 `<html lang>`。文檔五語同應用三語選項唔同。

共享文案喺 `packages/locales/src/langs/{en-US,zh-CN,ja-JP}/{app,mobile,demo}.json`，包括無障礙、錯誤同路由標題。`zh-TW` 字典保留畀自訂整合，未有全部 mobile/demo 新鍵，亦唔喺預設選單。

各 `src/locales/index.ts` 載入應用同 UI 語言；NutUI 日文用 `nutui-ja.ts`，Varlet 先註冊再選擇，Vant 用原生語言包。共享元件用 `useI18n()`，應用用 `@/locales` 嘅 `t`。

用 `await loadLocaleMessages('ja-JP')`，載入好先切換，英文係共享 fallback。新增語言要改型別、字典、保存白名單、LanguageSelect、原生適配同測試。

REST/AI 送出 `Accept-Language`；Nitro 翻譯商品 fixture，真實內容由後端負責，Query key 包含語言。共享頁面同 Query hook 依賴呢個套件，唔可以淨係刪字典。
