# Quick Start

Use Node.js **24.x** and **pnpm 12 or later**. The root `package.json` pins the pnpm release.

Clone the repository, enter its root and run the commands below as needed. `pnpm install` also runs workspace `stub` scripts to prepare internal build packages.

```bash
pnpm install
pnpm dev:vant
```

`pnpm dev` interactively selects one package, not all apps. Default ports are NutUI 5777, Vant 5778, Varlet 5779, TDesign 5783, Ionic 5784, Nitro 5320. Mock credentials are `user / 123456` and `admin / 123456` (Nitro only).

Pages start in English; Member offers Chinese/Japanese switching. All apps have the same product tabs and floating AI entry. For real backend integration use [service mode](../essentials/server.md); those commands do not start the two companion services for you.

Copy needed values from the app's `.env.example` into local environment files without overwriting existing settings. After adding workspace dependencies, run `pnpm install` and restart the dev server. Vant refuses an occupied port; check the URL printed in your terminal.

`pnpm build` includes workspace builds and docs; app output is `apps/h5-<ui>/dist`. Preview is a static preview, not a Mock backend. Use `pnpm dev:docs` / `pnpm build:docs` for this site. `pnpm create-app` launches the repository CLI; see [Create App](../essentials/create-app.md).

## VS Code

Open the repository root in VS Code to load `.vscode/settings.json` and install the workspace recommendations. Use Vue (Official) for SFCs and Oxc for formatting, then select the workspace TypeScript version for editor diagnostics. The Testing view can run Vitest and Playwright suites after installing dependencies and the required Playwright browser.
