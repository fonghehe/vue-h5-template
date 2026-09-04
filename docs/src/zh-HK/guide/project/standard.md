# 程式碼規範

> `lefthook.yml` 已用正確嘅 `pnpm typecheck`，涵蓋 workspace、三個應用設定同測試工具。CI 獨立跑 lint、型別檢查、單元測試覆蓋率同 build。

## Lint 工具鏈

| 工具       | 用途           | 設定套件                 |
| ---------- | -------------- | ------------------------ |
| ESLint     | JS/TS/Vue 規範 | `@vh5/eslint-config`     |
| Oxfmt      | 程式碼格式化   | `@vh5/oxfmt-config`      |
| Stylelint  | CSS/SCSS 規範  | `@vh5/stylelint-config`  |
| OXLint     | 快速 Lint 檢查 | `@vh5/oxlint-config`     |
| Commitlint | 提交訊息規範   | `@vh5/commitlint-config` |

## Git 提交規範

使用 `czg` 進行規範化提交：

```bash
pnpm exec czg
```

提交格式：`type(scope): message`

## Git 鉤子（lefthook）

專案使用 [lefthook](https://github.com/evilmartians/lefthook) 管理 Git 鉤子。每次 `git commit` 嗰陣，pre-commit 鉤子會自動執行（串行執行，避免低配機器記憶體 / CPU 瞬時飆升）：

- **oxlint** —— 對暫存檔案執行 `oxlint --fix --type-aware`
- **oxfmt** —— 格式化暫存檔案
- **eslint** —— 對暫存檔案執行 `eslint --fix`
- **stylelint** —— 對暫存 Vue / CSS / SCSS 檔案執行 `stylelint --fix`
- **typecheck** —— 全量 TypeScript 型別檢查（`pnpm typecheck`）

所有 lint 任務都會自動修復並重新暫存變更。`commit-msg` 鉤子執行 `commitlint`，強制校驗上述提交資訊格式。合併（merge）之後，`post-merge` 鉤子會自動執行 `pnpm install`。

由於鉤子會自動執行，正常提交就得，無須手動先跑 lint（當然亦可以用 `pnpm lint` / `pnpm format` 喺本地自查）。

## AI 助手本機檔案

`.gitignore` 排除常見 AI 助手嘅本機記憶、歷史、session 同憑證（包括 `.workbuddy/memory/`）。共享指令、規則同 skills 照樣可以提交，例如 `AGENTS.md`、`.cursor/rules/`、`.claude/skills/` 同 `.codex/skills/`，唔會刪個人資料。加其他工具時只忽略具體本機產物，再用 `git check-ignore --no-index` 驗證；回歸測試亦會確認共享規則冇被誤忽略。
