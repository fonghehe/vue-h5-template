# 專案維護

## 同步程式碼

確認工作區乾淨且分支追蹤上游後，執行 `git pull --ff-only` 和 `pnpm install --frozen-lockfile`。工作區套件或建置設定變更後，重新啟動開發伺服器。

## 更新相依套件

以 `pnpm outdated -r` 查詢可更新的套件。修改 `pnpm-workspace.yaml` 的相關 catalog 項目，執行 `pnpm install`，並一併檢閱 catalog 與鎖定檔。工作區內的相依套件使用 `workspace:*`。

## 驗證變更

執行 `pnpm check`。執行階段相依套件、導覽、請求或建置整合有變更時，執行 `pnpm test:e2e`。共用相依套件有變更時，驗證五個 UI 應用程式。

## 重建本機成果

`pnpm clean` 會移除已安裝的模組、建置產物及 Turbo 快取。接著執行 `pnpm install --frozen-lockfile` 以還原鎖定的相依套件。
