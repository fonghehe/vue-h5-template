# @vh5/vsh

Vue H5 專案的命令行工具集，基於 [cac](https://github.com/cacjs/cac) 構建，封裝了程式碼檢查、依賴檢查、腳手架與 workspace 管理。

## 使用方式

本包是 workspace 內部包，二進制名為 `vsh`。在倉庫根目錄可直接透過 pnpm 呼叫：

```bash
# 通用呼叫方式
pnpm exec vsh <command>

# 根 package.json 中已封裝的常用腳本
pnpm lint        # vsh lint
pnpm format      # vsh lint --format
pnpm publint     # vsh publint
pnpm create-app  # vsh create-app
```

`pnpm exec vsh --help` 可列出所有命令，`pnpm exec vsh <command> --help` 可查看單一命令的選項。

## 命令列表

| 命令 | 說明 |
| ---- | ---- |
| `vsh lint` | 執行程式碼檢查（oxfmt / oxlint / eslint / stylelint）；`--format` 自動修復 |
| `vsh publint` | 檢查各套件 `package.json` 是否符合發佈規範 |
| `vsh create-app` | 互動式建立一個新的 H5 應用（NutUI / Vant / Varlet） |
| `vsh check-circular` | 掃描循環依賴（基於 `circular-dependency-scanner`） |
| `vsh check-dep` | 檢查缺失 / 未使用的依賴（基於 `depcheck`） |
| `vsh code-workspace` | 依 workspace 套件重新生成 `vh5.code-workspace` |

各命令的詳細用法與選項請參閱文件站的 [CLI（vsh）](https://fonghehe.github.io/vue-h5-template/guide/project/cli) 頁面。
