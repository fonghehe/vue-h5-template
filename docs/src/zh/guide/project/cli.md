# 命令行工具（vsh）

> CLI 目前生成基础页面并复制参考布局/语言/API/store，不是已验证的 v2 完整应用副本；生成的依赖及 bootstrap 仍需与共享 mobile UI、Query 对齐。以现有 H5 应用为准，生成后务必执行类型检查、构建与浏览器测试。

项目内置了一款命令行工具 `@vh5/vsh`（命令名 `vsh`），基于 [cac](https://github.com/cacjs/cac) 构建。它封装了代码检查、依赖检查、脚手架与 workspace 管理，让贡献者无需记忆冗长的命令链。

## 运行命令

该 CLI 是一个 workspace 包，二进制名为 `vsh`。有两种调用方式：

```bash
# 通过 pnpm 调用（推荐）
pnpm exec vsh <command>

# 或通过根目录已封装好的 npm 脚本
pnpm lint        # vsh lint
pnpm format      # vsh lint --format
pnpm publint     # vsh publint
pnpm create-app  # vsh create-app
```

运行 `pnpm exec vsh --help` 可列出所有命令，运行 `pnpm exec vsh <command> --help` 可查看单个命令的选项。

## 命令

### `vsh lint`

运行完整的检查 / 格式化套件。工具会根据 CPU 核心数自动选择串行或并行执行（≤ 4 核时串行，避免低配机器内存飙升）。

```bash
pnpm exec vsh lint
pnpm exec vsh lint --threads 4   # 显式指定 oxfmt / oxlint 的线程数
```

按顺序执行：

| 工具 | 命令 |
| ---- | ---- |
| Oxfmt（检查） | `oxfmt --check --threads=N` |
| OxLint | `oxlint --type-aware --threads=N` |
| ESLint | `eslint . --cache` |
| Stylelint | `stylelint "**/*.{vue,css,less,scss}" --cache` |

加上 `--format` 会自动修复问题，而非仅报告：

```bash
pnpm format
# 依次执行：stylelint --fix、oxfmt、oxlint --fix --type-aware、eslint --fix
```

### `vsh publint`

使用 [publint](https://github.com/bloomberg/publint) 检查每个包的 `package.json` 是否符合发布规范。

```bash
pnpm publint
```

### `vsh create-app`

交互式地在 `apps/` 下生成一个新 H5 应用。它会先询问 UI 框架（Varlet / Vant / NutUI）和应用名称，然后生成完整脚手架（`package.json`、`vite.config.ts`、路由、页面、国际化、stores），并从对应的参考应用复制 `layout/`、`locales/`、`api/`、`stores/`。

```bash
pnpm create-app
```

生成完成后，请按输出的后续步骤操作：运行 `pnpm install`，并在根 `package.json` 中添加 `dev:<name>` / `build:<name>` 脚本。

### `vsh check-circular`

使用 `circular-dependency-scanner` 扫描 workspace 中的循环（导入）依赖。结果以 **警告** 形式输出，不会导致构建失败。

```bash
pnpm exec vsh check-circular
pnpm exec vsh check-circular --staged            # 仅扫描暂存区文件
pnpm exec vsh check-circular --verbose           # 显示详情（默认开启）
pnpm exec vsh check-circular --threshold 2       # 最小环长度
pnpm exec vsh check-circular --ignore-dirs dist,node_modules
```

默认忽略 `dist`、`.turbo`、`output`、`.cache`、`scripts`、`internal` 以及部分体积较大的 UI-kit 包。

### `vsh check-dep`

使用 [depcheck](https://github.com/depcheck/depcheck) 检查所有 workspace 包中缺失或未使用的依赖。

```bash
pnpm exec vsh check-dep
pnpm exec vsh check-dep --ignore-packages @vh5/foo,@vh5/bar
pnpm exec vsh check-dep --ignore-matches vite,vitest
pnpm exec vsh check-dep --ignore-patterns dist,public
```

默认会忽略一组仅用于构建的包（如 `@vh5/tsconfig`、`@vh5/vite-config`）。

### `vsh code-workspace`

根据当前 workspace 下的所有包重新生成 `vh5.code-workspace` 文件，使 VS Code 的多根 workspace 保持同步。

```bash
pnpm exec vsh code-workspace
pnpm exec vsh code-workspace --spaces 4
pnpm exec vsh code-workspace --auto-commit   # 自动 git add 结果
```

`vsh lint` 所驱动的检查工具链详见 [代码规范](./standard)。
