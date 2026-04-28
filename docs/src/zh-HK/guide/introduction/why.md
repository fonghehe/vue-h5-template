# 為什麼選擇 Vue H5 Template？

## 背景

在行動端 H5 開發中，開發者在啟動新專案時常常面臨類似的挑戰：

- 選擇合適的 UI 框架（NutUI、Vant、Varlet）並正確設定
- 從零開始設定建置工具和開發環境
- 在團隊中建立統一的程式碼規範
- 實現常見功能如登入認證、狀態管理、國際化等
- 管理多個應用之間的共享程式碼和設定

Vue H5 Template 旨在通過一個結構良好、生產就緒的 Monorepo 範本來解決這些問題。

## 為什麼選擇 Monorepo？

### 程式碼複用

共享套件通過 workspace 引用直接連結，無需發佈和管理內部套件的版本。

### 統一規範

所有應用共享相同的 ESLint、Prettier、Stylelint、TypeScript 設定。

### 多 UI 框架支援

| 應用      | UI 框架    | 預設埠號 |
| --------- | ---------- | -------- |
| h5-nutui  | NutUI 4.x  | 5777     |
| h5-vant   | Vant 4.x   | 5778     |
| h5-varlet | Varlet 3.x | 5779     |
