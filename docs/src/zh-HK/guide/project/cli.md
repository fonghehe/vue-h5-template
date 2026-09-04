# 命令行工具（vsh）

> CLI 生成基本頁再複製 layout/locales/API/stores，唔係已驗證嘅 v2 完整副本；依賴同 bootstrap 仲要對齊 mobile UI/Query。請參考現有應用，生成後跑型別、build 同 browser tests。

專案內置一款命令行工具 `@vh5/vsh`（命令名 `vsh`），基於 [cac](https://github.com/cacjs/cac) 構建。佢封裝咗程式碼檢查、依賴檢查、腳手架同 workspace 管理，等貢獻者唔使記住冗長嘅命令鏈。

## 執行命令

呢個 CLI 係一個 workspace 套件，二進制名為 `vsh`。有兩種呼叫方式：

```bash
# 經由 pnpm 呼叫（推薦）
pnpm exec vsh <command>

# 或者經由根目錄已封裝好嘅 npm 腳本
pnpm lint        # vsh lint
pnpm format      # vsh lint --format
pnpm publint     # vsh publint
pnpm create-app  # vsh create-app
```

執行 `pnpm exec vsh --help` 可以列出所有命令，執行 `pnpm exec vsh <command> --help` 可以睇單一命令嘅選項。

## 命令

### `vsh lint`

執行完整嘅檢查 / 格式化套件。工具會按 CPU 核心數自動揀串行定係並行執行（≤ 4 核時串行，避免低配機器記憶體飆升）。

```bash
pnpm exec vsh lint
pnpm exec vsh lint --threads 4   # 顯式指定 oxfmt / oxlint 嘅執行緒數
```

依序執行：

| 工具 | 命令 |
| ---- | ---- |
| Oxfmt（檢查） | `oxfmt --check --threads=N` |
| OxLint | `oxlint --type-aware --threads=N` |
| ESLint | `eslint . --cache` |
| Stylelint | `stylelint "**/*.{vue,css,less,scss}" --cache` |

加 `--format` 會自動修復問題，而唔係淨係報告：

```bash
pnpm format
# 依序執行：stylelint --fix、oxfmt、oxlint --fix --type-aware、eslint --fix
```

### `vsh publint`

使用 [publint](https://github.com/bloomberg/publint) 檢查每個套件嘅 `package.json` 係咪符合發佈規範。

```bash
pnpm publint
```

### `vsh create-app`

互動式咁喺 `apps/` 下生成一個新嘅 H5 應用。佢會先問 UI 框架（Varlet / Vant / NutUI）同應用名稱，跟住生成完整腳手架（`package.json`、`vite.config.ts`、路由、頁面、國際化、stores），並且從對應嘅參考應用複製 `layout/`、`locales/`、`api/`、`stores/`。

```bash
pnpm create-app
```

生成完成之後，請跟住輸出嘅後續步驟操作：執行 `pnpm install`，並喺根 `package.json` 入面加 `dev:<name>` / `build:<name>` 腳本。

### `vsh check-circular`

使用 `circular-dependency-scanner` 掃描 workspace 入面嘅循環（匯入）依賴。結果以 **警告** 形式輸出，唔會搞到構建失敗。

```bash
pnpm exec vsh check-circular
pnpm exec vsh check-circular --staged             # 淨係掃描暫存區檔案
pnpm exec vsh check-circular --verbose            # 顯示詳情（預設開啟）
pnpm exec vsh check-circular --threshold 2        # 最細環長度
pnpm exec vsh check-circular --ignore-dirs dist,node_modules
```

預設忽略 `dist`、`.turbo`、`output`、`.cache`、`scripts`、`internal` 同埋部分體積較大嘅 UI-kit 套件。

### `vsh check-dep`

使用 [depcheck](https://github.com/depcheck/depcheck) 檢查所有 workspace 套件入面缺失或者未使用嘅依賴。

```bash
pnpm exec vsh check-dep
pnpm exec vsh check-dep --ignore-packages @vh5/foo,@vh5/bar
pnpm exec vsh check-dep --ignore-matches vite,vitest
pnpm exec vsh check-dep --ignore-patterns dist,public
```

預設會忽略一組淨係用嚟構建嘅套件（例如 `@vh5/tsconfig`、`@vh5/vite-config`）。

### `vsh code-workspace`

根據目前 workspace 入面所有套件重新生成 `vh5.code-workspace` 檔案，等 VS Code 嘅多根 workspace 保持同步。

```bash
pnpm exec vsh code-workspace
pnpm exec vsh code-workspace --spaces 4
pnpm exec vsh code-workspace --auto-commit   # 自動 git add 結果
```

`vsh lint` 所驅動嘅檢查工具鏈詳見 [代碼規範](./standard)。
