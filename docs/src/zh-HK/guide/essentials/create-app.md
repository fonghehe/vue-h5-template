# 建立應用

揀 UI 框架同輸入應用名稱。例如輸入 `h5-my-app`，就會喺 `apps/h5-my-app` 建立名為 `@vh5/h5-my-app` 嘅套件。

```bash
pnpm create-app
```

## 腳手架選項

CLI 會複製揀咗嘅參考應用，包括共用業務頁、Mock 同配套服務模式。生成嘅模式設定檔會定義應用名稱同獨立嘅儲存命名空間。

| UI 框架 | 開發連接埠 |
| --- | --- |
| NutUI | 5780 |
| Vant | 5781 |
| Varlet | 5782 |
| TDesign Mobile Vue | 5785 |
| Ionic Vue | 5786 |

## 安裝同驗證

喺 workspace 根目錄安裝依賴，檢查新應用嘅型別，再啟動開發伺服器。

```bash
pnpm install
pnpm -F @vh5/h5-my-app type-check
pnpm -F @vh5/h5-my-app dev
```

用 `pnpm run build --filter=@vh5/h5-my-app` 構建應用。所有生成嘅應用都提供 `pnpm -F @vh5/h5-my-app dev:services`，記得先啟動配套服務。根目錄嘅快捷指令可以按需要加入。 [後端模式](./server.md)
