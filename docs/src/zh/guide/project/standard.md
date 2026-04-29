# 代码规范

## Lint 工具链

| 工具        | 用途           | 配置包                  |
| ----------- | -------------- | ----------------------- |
| ESLint      | JS/TS/Vue 规范 | `@vh5/eslint-config`    |
| Prettier    | 代码格式化     | `@vh5/prettier-config`  |
| Stylelint   | CSS/SCSS 规范  | `@vh5/stylelint-config` |
| OXLint      | 快速 Lint 检查 | `@vh5/oxlint-config`    |
| Commitlint  | 提交信息规范   | `@vh5/commitlint-config`|

## 运行 Lint

```bash
# ESLint
pnpm lint

# 格式化
pnpm format
```

## Git 提交规范

使用 `cz-git` 进行规范化提交：

```bash
pnpm cz
```

提交格式：`type(scope): message`

| type     | 说明     |
| -------- | -------- |
| feat     | 新功能   |
| fix      | 修复     |
| docs     | 文档     |
| style    | 样式     |
| refactor | 重构     |
| perf     | 性能优化 |
| test     | 测试     |
| chore    | 构建相关 |

## TypeScript

共享 TypeScript 配置位于 `internal/tsconfig/`，各应用通过 `extends` 继承：

```json
{
  "extends": "@vh5/tsconfig/web-app.json"
}
```
