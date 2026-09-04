# 程式碼規範

> 目前限制：`lefthook.yml` 仍呼叫已移除的 `pnpm check:type`，正確為 `pnpm typecheck`。需先更新 hook 配置，本輪文檔不修改 Git hook；CI 獨立執行 `pnpm check`。

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

本專案使用 [lefthook](https://github.com/evilmartians/lefthook) 管理 Git 鉤子。每次 `git commit` 時，pre-commit 鉤子會自動執行（串行執行，避免低配機器記憶體 / CPU 瞬時飆升）：

- **oxlint** —— 對暫存檔案執行 `oxlint --fix --type-aware`
- **oxfmt** —— 格式化暫存檔案
- **eslint** —— 對暫存檔案執行 `eslint --fix`
- **stylelint** —— 對暫存 Vue / CSS / SCSS 檔案執行 `stylelint --fix`
- **check:type** —— 全量 TypeScript 型別檢查（`pnpm check:type`）

所有 lint 任務都會自動修復並重新暫存變更。`commit-msg` 鉤子執行 `commitlint`，強制校驗上述提交資訊格式。合併（merge）之後，`post-merge` 鉤子會自動執行 `pnpm install`。

由於鉤子會自動執行，正常提交即可，無須手動先跑 lint（當然也可使用 `pnpm lint` / `pnpm format` 在本地自查）。
