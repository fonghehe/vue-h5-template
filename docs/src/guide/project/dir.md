# Project Structure

## Directory Overview

```
vue-h5-template/
├── apps/                     # Applications
│   ├── h5-nutui/             # NutUI H5
│   │   ├── src/
│   │   │   ├── bootstrap.ts  # App bootstrap (init store, router, dynamic title)
│   │   │   ├── main.ts       # Entry file
│   │   │   ├── App.vue       # Root component
│   │   │   ├── router/       # Route config
│   │   │   ├── store/        # Pinia user store
│   │   │   ├── layout/       # Layout (navbar + tabbar)
│   │   │   └── views/        # Page components
│   │   ├── vite.config.mts   # Vite config
│   │   └── package.json
│   ├── h5-vant/              # Vant version (same structure)
│   ├── h5-varlet/            # Varlet version (same structure)
│   └── backend-mock/         # Nitro mock backend
│       ├── api/              # API routes
│       │   ├── auth/         # Auth (login/logout/refresh)
│       │   ├── user/         # User info
│       │   └── product/      # Product list/detail
│       ├── middleware/        # Middleware (CORS)
│       ├── utils/            # Utils (JWT, response, mock data)
│       └── routes/           # Fallback route
├── packages/                 # Shared packages
│   ├── @core/                # Core packages
│   ├── stores/               # Pinia init + persistence
│   ├── locales/              # i18n locale messages
│   ├── styles/               # Global styles + UI lib style entries
│   └── utils/                # Utility functions
├── internal/                 # Internal configs
│   ├── vite-config/          # Shared Vite config generator
│   ├── tsconfig/             # Shared TypeScript config
│   └── lint-configs/         # Lint configs
├── scripts/                  # Scripts
└── docs/                     # VitePress docs
```

## H5 App Pages

Each H5 app includes the following pages:

| Route          | Page    | Description                       |
| -------------- | ------- | --------------------------------- |
| `/home`        | Home    | Project intro and tech stack      |
| `/list`        | List    | Product list (from Mock API)      |
| `/details?id=` | Detail  | Product detail (from Mock API)    |
| `/mine`        | Profile | User info, login/logout           |
| `/example`     | Example | UI component examples             |
| `/login`       | Login   | Form login (connects to Mock API) |

## Shared Vite Config

`internal/vite-config` provides a `defineConfig()` factory. Apps just declare the UI library:

```ts
import { defineConfig } from '@vh5/vite-config';

export default defineConfig(async () => ({
  application: { uiLibrary: 'nut' },
  vite: {
    /* custom config */
  },
}));
```

Supported `uiLibrary`: `nut`, `vant`, `varlet`
