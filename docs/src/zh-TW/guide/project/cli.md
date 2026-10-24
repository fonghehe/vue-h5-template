# 命令行工具（vsh）

專案內建一款命令行工具 `@vh5/vsh`（命令名 `vsh`），基於 [cac](https://github.com/cacjs/cac) 構建。它封裝了程式碼檢查、依賴檢查、腳手架與 workspace 管理，讓貢獻者無須記憶冗長的命令鏈。

## 執行命令

此 CLI 是一個 workspace 套件，二進制名為 `vsh`。有兩種呼叫方式：

```bash
# 透過 pnpm 呼叫（推薦）
pnpm exec vsh <command>

# 或透過根目錄已封裝好的 package.json 指令
pnpm lint        # vsh lint
pnpm format      # vsh lint --format
pnpm publint     # vsh publint
pnpm create-app  # vsh create-app
```

執行 `pnpm exec vsh --help` 可列出所有命令，執行 `pnpm exec vsh <command> --help` 可檢視單一命令的選項。

## 命令

### `vsh lint`

執行完整的檢查 / 格式化套件。工具會依照 CPU 核心數自動選擇串行或平行執行（≤ 4 核時串行，避免低配機器記憶體飆升）。

```bash
pnpm exec vsh lint
pnpm exec vsh lint --threads 4   # 顯式指定 oxfmt / oxlint 的執行緒數
```

檢查項目如下。邏輯 CPU 不超過四個時，依表格順序執行。

| 工具 | 命令 |
| ---- | ---- |
| Oxfmt（檢查） | `oxfmt --check --threads=N` |
| OxLint | `oxlint --type-aware --threads=N` |
| ESLint | `eslint . --cache` |
| Stylelint | `stylelint "**/*.{vue,css,less,scss}" --cache` |

加上 `--format` 會自動修復問題，而非僅報告：

```bash
pnpm format
# 檢查項目如下。邏輯 CPU 不超過四個時，依表格順序執行。stylelint --fix、oxfmt、oxlint --fix --type-aware、eslint --fix
```

### `vsh publint`

使用 [publint](https://github.com/bloomberg/publint) 檢查每個套件的 `package.json` 是否符合發布規範。

```bash
pnpm publint
```

### `vsh create-app`

精靈會將選取的參考應用複製到 `apps/`，共有五種選項。

```bash
pnpm create-app
```

預設連接埠、整合需求與驗證指令請參閱[建立應用](../essentials/create-app.md)。

### `vsh check-circular`

使用 `circular-dependency-scanner` 掃描 workspace 中的循環（匯入）依賴。結果以 **警告** 形式輸出，不會導致建置失敗。

```bash
pnpm exec vsh check-circular
pnpm exec vsh check-circular --staged             # 僅掃描暫存區檔案
pnpm exec vsh check-circular --verbose            # 顯示詳情（預設開啟）
pnpm exec vsh check-circular --threshold 2        # 最小環長度
pnpm exec vsh check-circular --ignore-dirs dist,node_modules
```

預設忽略 `dist`、`.turbo`、`output`、`.cache`、`scripts`、`internal` 以及部分體積較大的 UI-kit 套件。

### `vsh check-dep`

使用 [depcheck](https://github.com/depcheck/depcheck) 檢查所有 workspace 套件中缺失或未使用的依賴。

```bash
pnpm exec vsh check-dep
pnpm exec vsh check-dep --ignore-packages @vh5/foo,@vh5/bar
pnpm exec vsh check-dep --ignore-matches vite,vitest
pnpm exec vsh check-dep --ignore-patterns dist,public
```

預設會忽略一組僅用於建置的套件（如 `@vh5/tsconfig`、`@vh5/vite-config`）。

### `vsh code-workspace`

根據目前 workspace 下的所有套件重新產生 `vh5.code-workspace` 檔案，使 VS Code 的多根 workspace 保持同步。

```bash
pnpm exec vsh code-workspace
pnpm exec oxfmt --write vh5.code-workspace
```

`vsh lint` 所驅動的檢查工具鏈詳見 [程式碼規範](./standard)。
