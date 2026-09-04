# Quick Start

Use Node.js **22.18+ within 22.x, or 24.x**, and **pnpm 11** (`packageManager: pnpm@11.10.0`). The exact constraints are in root `package.json`; older Node 20/pnpm 10 instructions no longer apply.

Clone the repository, enter its root and run the commands below as needed. `pnpm install` also runs workspace `stub` scripts to prepare internal build packages.

```bash
pnpm install
pnpm dev:vant
# alternatives: pnpm dev:nutui / pnpm dev:varlet
pnpm check
pnpm test:e2e
pnpm build:vant
pnpm -F @vh5/h5-vant preview
```

`pnpm dev` interactively selects one package, not all apps. Default ports are NutUI 5777, Vant 5778, Varlet 5779, Nitro 5320. Mock credentials are `user / 123456` and `admin / 123456` (Nitro only).

Pages start in English; Member offers Chinese/Japanese switching. All apps have the same product tabs and floating AI entry. For real backend integration use [service mode](../essentials/server.md); those commands do not start the two companion services for you.

Copy needed values from the app's `.env.example` into local environment files without overwriting existing settings. After adding workspace dependencies, run `pnpm install` and restart the dev server. Vant refuses an occupied port; check the URL printed in your terminal.

`pnpm build` includes workspace builds and docs; app output is `apps/h5-<ui>/dist`. Preview is a static preview, not a Mock backend. Use `pnpm dev:docs` / `pnpm build:docs` for this site. `pnpm create-app` launches the repository CLI; see [Create App](../essentials/create-app.md).
