# 快速開始

## 環境要求

- **Node.js** >= 20.12.0
- **pnpm** >= 10.0.0

## 安裝

```bash
# 複製專案
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template

# 安裝相依套件
pnpm install
```

## 開發

```bash
# 啟動所有應用（互動式選擇）
pnpm dev

# 啟動指定應用
pnpm dev:nutui    # NutUI 版
pnpm dev:vant     # Vant 版
pnpm dev:varlet   # Varlet 版
```

Mock 服務會在 `http://localhost:5320` 自動啟動。

## 建置

```bash
# 建置所有應用
pnpm build

# 建置指定應用
pnpm build:nutui
pnpm build:vant
pnpm build:varlet
```

## 建立新應用

```bash
# 透過 CLI 互動式建立新的 H5 應用
pnpm create-app
```

支援選擇 Varlet / Vant / NutUI，自動生成完整的專案結構。詳見[建立應用](/zh-HK/guide/essentials/create-app)。

## 測試帳號

| 使用者名稱 | 密碼   | 角色       |
| ---------- | ------ | ---------- |
| user       | 123456 | 一般使用者 |
| admin      | 123456 | 管理員     |
