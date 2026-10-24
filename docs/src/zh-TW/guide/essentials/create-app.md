# 建立應用

選擇 UI 框架並輸入應用名稱。例如輸入 `h5-my-app`，會在 `apps/h5-my-app` 建立名為 `@vh5/h5-my-app` 的套件。

```bash
pnpm create-app
```

## 鷹架選項

CLI 會複製選取的參考應用，包含共用業務頁面、Mock 與配套服務模式。產生的模式設定檔會定義應用名稱和獨立的儲存命名空間。

| UI 框架 | 開發連接埠 |
| --- | --- |
| NutUI | 5780 |
| Vant | 5781 |
| Varlet | 5782 |
| TDesign Mobile Vue | 5785 |
| Ionic Vue | 5786 |

## 安裝與驗證

在工作區根目錄安裝相依套件，檢查新應用的型別，再啟動開發伺服器。

```bash
pnpm install
pnpm -F @vh5/h5-my-app type-check
pnpm -F @vh5/h5-my-app dev
```

使用 `pnpm run build --filter=@vh5/h5-my-app` 建置應用。所有產生的應用都提供 `pnpm -F @vh5/h5-my-app dev:services`，請先啟動配套服務。根目錄的快捷指令可依需求加入。 [後端模式](./server.md)
