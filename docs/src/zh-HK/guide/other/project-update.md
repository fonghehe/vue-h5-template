# 專案維護

## 同步程式碼

確認工作區乾淨同分支追蹤上游之後，執行 `git pull --ff-only` 同 `pnpm install --frozen-lockfile`。工作區套件或者構建設定有變更之後，重啟開發伺服器。

## 更新依賴

用 `pnpm outdated -r` 睇可更新嘅套件。修改 `pnpm-workspace.yaml` 嘅相關 catalog 項目，執行 `pnpm install`，再一齊檢查 catalog 同鎖定檔。工作區內部依賴用 `workspace:*`。

## 驗證變更

執行 `pnpm check`。執行時依賴、導覽、請求或者構建整合有變更時，執行 `pnpm test:e2e`。共用依賴有變更時，驗證五個 UI 應用程式。

## 重建本機產物

`pnpm clean` 會移除已安裝嘅模組、構建產物同 Turbo 快取。之後執行 `pnpm install --frozen-lockfile` 還原鎖定嘅依賴。
