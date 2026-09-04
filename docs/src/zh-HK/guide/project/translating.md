# 多語言文件同翻譯

文件站點基於 VitePress 構建，並提供五種語言。呢份指南講解目錄結構，以及多語言之間點樣保持同步。

## 語言

| Locale key | 名稱 | `lang` |
| ---------- | ---- | ------ |
| `root` | English | `en-US` |
| `zh` | 简体中文 | `zh-CN` |
| `ja` | 日本語 | `ja` |
| `zh-TW` | 繁體中文(台) | `zh-TW` |
| `zh-HK` | 繁體中文(港) | `zh-HK` |

語言元資訊同語言切換器位於 `docs/.vitepress/config/`。每種語言都有獨立嘅設定檔：`index.mts` 負責合併，而 `en.mts` / `zh.mts` / `ja.mts` / `zh-TW.mts` / `zh-HK.mts` 各自持有對應語言嘅 `nav` 同 `sidebar`。

## 目錄結構

所有文件都喺 `docs/src/` 下面。英文（root）頁面喺最頂層，其餘每種語言各佔一個獨立資料夾：

```
docs/src/
├── guide/            # 英文（root）頁面
├── zh/guide/         # 简体中文
├── ja/guide/         # 日本語
├── zh-TW/guide/      # 繁體中文(台)
└── zh-HK/guide/      # 繁體中文(港)
```

`apps/` 同 `packages/` 都係跟呢個結構。

## 新增一個翻譯頁

1. **鏡像路徑。** 如果英文頁係 `docs/src/guide/project/architecture.md`，佢嘅繁體中文（港）版就應該放喺 `docs/src/zh-HK/guide/project/architecture.md` —— 即係語言資料夾之後嘅路徑保持一致。VitePress 會根據鏡像路徑喺語言切換器入面關聯兩者，翻譯頁一 click 就到。
2. **註冊到側邊欄。** 開啟 `docs/.vitepress/config/<locale>.mts`，將呢一頁加進對應嘅側邊欄分組（例如 *工程* 分組）。如果唔做呢一步，頁面雖然存在但唔會出現喺導覽入面。
3. **翻譯內容**，保持標題、程式碼區塊同 `meta.title` 同原文一致，等各語言讀者得到相同嘅結構。

## 保持語言同步

目前冇自動同步工具 —— 多語言一致係靠約定維持：

- **每頁單一事實來源。** 改英文頁嗰陣，應該喺同一個 PR 入面同步更新其餘四種翻譯。
- **側邊欄順序一致。** 五種語言嘅側邊欄條目順序要保持一致，等導覽體驗統一。
- **標題 / 錨點一致。** 標題要互相对应，方便交叉連結同目錄對齊。
- **本地預覽。** 執行 `pnpm dev:docs`，用切換器切換語言，確認渲染同連結都正確。

## 新增一種語言

1. 參照 `zh.mts` 建立 `docs/.vitepress/config/<lang>.mts`（設定 `label`、`lang`、`link: '/<lang>/'`，以及完整嘅 `nav` / `sidebar`）。
2. 喺 `docs/.vitepress/config/index.mts` 嘅 `locales` 下面註冊（例如 `'<lang>': { ...<lang> }`）。
3. 建立 `docs/src/<lang>/`，從已有語言完整複製頁面樹，再進行翻譯。
4. 如果想本地化搜尋介面文案，喺 `docs/.vitepress/config/shared.mts` 嘅 `search.locales` 區塊入面加新語言。

線上站點部署喺 GitHub Pages 嘅 `/vue-h5-template/` 路徑下面（詳情見 `.github/workflows/docs.yml`）。
