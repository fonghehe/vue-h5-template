# 專案結構

詳見 [系統架構](./architecture.md) 瞭解分層規則。

## 1. 頂層概覽

```
vue-h5-template/
├── apps/                # 運行時應用（UI 適配器 + Mock 後端）
├── packages/            # 可複用庫，按層組織
├── internal/            # 構建時工具（配置、Lint、TS、Vite）
├── scripts/             # CLI 工具
└── docs/                # VitePress 文件
```

## 2. `apps/` — UI 適配層

```
apps/
├── h5-nutui/            # NutUI 適配器           （端口 5777）
├── h5-vant/             # Vant 適配器            （端口 5778）
├── h5-varlet/           # Varlet 適配器          （端口 5779）
└── backend-mock/        # Nitro Mock 服務器      （端口 5320）
```

適配應用**唔應包含**視圖、Store、API 調用或路由——呢啲都喺特性套件同外殼入面。

## 3. `packages/` — 分層庫

```
packages/
├── @core/
│   ├── base/            # @vh5/core-base    — 純工具（tree、date、to…）
│   └── composables/     # @vh5/composables  — Vue Composable
├── api/                 # @vh5/api          — 接口聲明 + DTO
├── request/             # @vh5/request      — 類型化 fetch 客戶端 + 攔截器
├── services/            # @vh5/services     — 領域模型 & 業務規則
├── stores/              # @vh5/stores       — Pinia 初始化 + 持久化
├── locales/             # @vh5/locales      — i18n 初始化 + 共享字串
├── styles/              # @vh5/styles       — 全局 CSS & 設計 Token
├── utils/               # @vh5/utils        — 路由輔助工具
├── app-shell/           # @vh5/app-shell    — 啟動、佈局、路由、守衛
└── features/
    ├── auth/            # @vh5/feature-auth
    ├── user/            # @vh5/feature-user
    ├── product/         # @vh5/feature-product
    └── home/            # @vh5/feature-home
```

## 4. 快速查找表

| 我想添加……              | 放喺……                                                          |
| ----------------------- | --------------------------------------------------------------- |
| 新頁面                  | `packages/features/<feature>/src/views/`                        |
| 新 API 接口             | `packages/api/src/<domain>.ts` + `services/<domain>.service.ts` |
| 新 Pinia Store          | `packages/features/<feature>/src/store.ts`                      |
| 新共享 Composable       | `packages/@core/composables/src/`                               |
| 新語言字串              | `packages/features/<feature>/src/locales/<lang>.json`           |
| 新全局樣式 / 設計 Token | `packages/styles/src/global/`                                   |
