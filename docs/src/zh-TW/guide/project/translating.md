# 多語言文件與翻譯

文件站點基於 VitePress 構建，並提供五種語言。本指南說明目錄結構以及多語言之間如何保持同步。

## 語言

| Locale key | 名稱 | `lang` |
| ---------- | ---- | ------ |
| `root` | English | `en-US` |
| `zh` | 简体中文 | `zh-CN` |
| `ja` | 日本語 | `ja` |
| `zh-TW` | 繁體中文(台) | `zh-TW` |
| `zh-HK` | 繁體中文(港) | `zh-HK` |

語言元資訊與語言切換器位於 `docs/.vitepress/config/`。每種語言都有獨立的設定檔：`index.mts` 負責合併，而 `en.mts` / `zh.mts` / `ja.mts` / `zh-TW.mts` / `zh-HK.mts` 各自持有對應語言的 `nav` 與 `sidebar`。

## 目錄結構

所有文件都位於 `docs/src/` 下。英文（root）頁面在頂層，其餘每種語言各佔一個獨立資料夾：

```
docs/src/
├── guide/            # 英文（root）頁面
├── zh/guide/         # 简体中文
├── ja/guide/         # 日本語
├── zh-TW/guide/      # 繁體中文(台)
└── zh-HK/guide/      # 繁體中文(港)
```

`apps/` 與 `packages/` 同樣遵循此結構。

## 新增一個翻譯頁

1. **鏡像路徑。** 若英文頁為 `docs/src/guide/project/architecture.md`，其繁體中文（台）版應放在 `docs/src/zh-TW/guide/project/architecture.md` —— 即語言資料夾之後的路徑保持一致。VitePress 會依據鏡像路徑在語言切換器中關聯二者，翻譯頁只需一鍵即可到達。
2. **註冊到側邊欄。** 開啟 `docs/.vitepress/config/<locale>.mts`，將該頁加入對應的側邊欄分組（例如 *工程* 分組）。缺少這一步，頁面雖存在卻不會出現在導覽中。
3. **翻譯內容**，保持標題、程式碼區塊與 `meta.title` 與原文一致，使各語言讀者獲得相同的結構。

## 保持語言同步

目前沒有自動同步工具 —— 多語言一致靠約定維持：

- **每頁單一事實來源。** 修改英文頁時，應在同日 PR 中同步更新其餘四種翻譯。
- **側邊欄順序一致。** 五種語言的側邊欄條目順序應保持一致，使導覽體驗統一。
- **標題 / 錨點一致。** 標題應相互對應，以便交叉連結與目錄對齊。
- **本地預覽。** 執行 `pnpm dev:docs`，用切換器切換語言，確認渲染與連結均正確。

## 新增一種語言

1. 參照 `zh.mts` 建立 `docs/.vitepress/config/<lang>.mts`（設定 `label`、`lang`、`link: '/<lang>/'`，以及完整的 `nav` / `sidebar`）。
2. 在 `docs/.vitepress/config/index.mts` 的 `locales` 下註冊（例如 `'<lang>': { ...<lang> }`）。
3. 建立 `docs/src/<lang>/`，從已有語言完整複製頁面樹，再進行翻譯。
4. 如需本地化搜尋介面文案，在 `docs/.vitepress/config/shared.mts` 的 `search.locales` 區塊中加入新語言。

線上站點部署在 GitHub Pages 的 `/vue-h5-template/` 路徑下（詳見 `.github/workflows/docs.yml`）。
