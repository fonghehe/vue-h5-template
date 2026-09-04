# 代码规范

> 当前限制：`lefthook.yml` 类型检查任务仍调用已移除的 `pnpm check:type`，正确命令是 `pnpm typecheck`。依赖 hook 前需更新配置；本轮文档修改不会顺带更改 Git hook。CI 独立执行 `pnpm check`。

## Lint 工具链

| 工具       | 用途           | 配置包                   |
| ---------- | -------------- | ------------------------ |
| ESLint     | JS/TS/Vue 规范 | `@vh5/eslint-config`     |
| Oxfmt      | 代码格式化     | `@vh5/oxfmt-config`      |
| Stylelint  | CSS/SCSS 规范  | `@vh5/stylelint-config`  |
| OXLint     | 快速 Lint 检查 | `@vh5/oxlint-config`     |
| Commitlint | 提交信息规范   | `@vh5/commitlint-config` |

## 运行 Lint

```bash
# ESLint
pnpm lint

# 格式化
pnpm format
```

## Git 提交规范

使用 `czg`（cz-git）进行规范化提交：

```bash
pnpm exec czg
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

## Git 钩子（lefthook）

本仓库使用 [lefthook](https://github.com/evilmartians/lefthook) 管理 Git 钩子。每次 `git commit` 时，pre-commit 钩子会自动运行（串行执行，以避免低配机器内存 / CPU 瞬时飙升）：

- **oxlint** —— 对暂存文件执行 `oxlint --fix --type-aware`
- **oxfmt** —— 格式化暂存文件
- **eslint** —— 对暂存文件执行 `eslint --fix`
- **stylelint** —— 对暂存 Vue / CSS / SCSS 文件执行 `stylelint --fix`
- **check:type** —— 全量 TypeScript 类型检查（`pnpm check:type`）

所有 lint 任务都会自动修复并重新暂存改动。`commit-msg` 钩子运行 `commitlint`，强制校验上述提交信息格式。合并（merge）之后，`post-merge` 钩子会自动执行 `pnpm install`。

由于钩子会自动运行，正常提交即可，无需手动先跑 lint（当然也可使用 `pnpm lint` / `pnpm format` 在本地自查）。
