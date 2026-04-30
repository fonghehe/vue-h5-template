# Create App

Quickly scaffold a new H5 app using the CLI tool.

## Usage

```bash
pnpm create-app
```

The CLI will interactively guide you through:

1. **Select UI Framework** — Varlet / Vant / NutUI
2. **Enter App Name** — e.g. `h5-my-app`

### Default dev ports

| Framework | Default port |
| --------- | ------------ |
| NutUI     | 5780         |
| Vant      | 5781         |
| Varlet    | 5782         |

## Generated Content

A complete app structure will be created under the `apps/` directory:

```
apps/h5-my-app/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── env.d.ts
├── .env
├── .env.development
├── public/
├── types/
└── src/
    ├── main.ts
    ├── bootstrap.ts
    ├── App.vue
    ├── assets/
    ├── components/
    ├── router/
    │   └── index.ts
    ├── views/
    │   ├── home/index.vue
    │   ├── list/index.vue
    │   ├── mine/index.vue
    │   └── login/index.vue
    ├── layout/index.vue    (copied from reference app)
    ├── locales/             (copied from reference app)
    ├── api/                 (copied from reference app)
    └── stores/              (copied from reference app)
```

## Next Steps

After creation:

1. Run `pnpm install` to install dependencies
2. Add scripts to root `package.json`:

```json
{
  "scripts": {
    "dev:h5-my-app": "pnpm -F @vh5/h5-my-app run dev",
    "build:h5-my-app": "pnpm run build --filter=@vh5/h5-my-app"
  }
}
```

3. Run `pnpm dev:h5-my-app` to start development

## Auto Configuration

The generated app comes pre-configured with:

- **Vite Proxy** — `/api` proxied to Mock server at `localhost:5320`
- **Shared Styles** — Imports `virtual:uno.css` (UnoCSS) and `@vh5/styles/global`
- **State Management** — Uses `@vh5/stores` (Pinia + persistence); namespace is derived from `VITE_APP_NAMESPACE` + version + env
- **Internationalization** — Uses `@vh5/locales`
- **Route Progress** — NProgress from `@vh5/utils`
- **UI Components** — Tree-shaken via `unplugin-vue-components`; framework-specific behaviour:
  - **NutUI**: full CSS for Toast / Notify / Dialog / ImagePreview injected in `bootstrap.ts`; other components are loaded on-demand
  - **Vant**: component CSS injected on-demand via `VantResolver`; no full bundle import needed
  - **Varlet**: component CSS loaded on-demand via `VarletImportResolver`; functional components (e.g. `Snackbar`) must be imported manually at the call site
