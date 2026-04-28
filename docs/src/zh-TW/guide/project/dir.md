# 專案結構

## 目錄說明

```
vue-h5-template/
├── apps/                     # 應用目錄
│   ├── h5-nutui/             # NutUI 版 H5
│   ├── h5-vant/              # Vant 版 H5
│   ├── h5-varlet/            # Varlet 版 H5
│   └── backend-mock/         # Nitro Mock 後端
├── packages/                 # 共享套件
│   ├── @core/                # 核心套件
│   ├── stores/               # Pinia 狀態管理
│   ├── locales/              # 國際化語言包
│   ├── styles/               # 全域樣式
│   └── utils/                # 工具函式
├── internal/                 # 內部設定
│   ├── vite-config/          # 共享 Vite 設定
│   ├── tsconfig/             # 共享 TypeScript 設定
│   └── lint-configs/         # Lint 設定
├── scripts/                  # 指令碼
└── docs/                     # VitePress 文件
```
