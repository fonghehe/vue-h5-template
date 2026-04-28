# 程式碼規範

## Lint 工具鏈

| 工具       | 用途           | 設定套件                 |
| ---------- | -------------- | ------------------------ |
| ESLint     | JS/TS/Vue 規範 | `@vh5/eslint-config`     |
| Prettier   | 程式碼格式化   | `@vh5/prettier-config`   |
| Stylelint  | CSS/SCSS 規範  | `@vh5/stylelint-config`  |
| OXLint     | 快速 Lint 檢查 | `@vh5/oxlint-config`     |
| Commitlint | 提交訊息規範   | `@vh5/commitlint-config` |

## Git 提交規範

使用 `cz-git` 進行規範化提交：

```bash
pnpm cz
```

提交格式：`type(scope): message`
