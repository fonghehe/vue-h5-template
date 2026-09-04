# Contributing to vue-h5-template

Thank you for your interest in contributing! This project is an open-source Vue 3 + TypeScript H5 template Monorepo. The quickest path is:

1. Read **[Code Standards](./docs/src/guide/project/standard.md)** — toolchain, formatting, and the commit-message convention.
2. Read **[Adding Pages & Features](./docs/src/guide/essentials/contributing-features.md)** — how to add pages, APIs, stores, and i18n inside an H5 app.
3. Follow the workflow below.

## Prerequisites

| Tool  | Version              |
| ----- | -------------------- |
| Node  | `>= 22.18.0`         |
| pnpm  | `>= 11.0.0`          |

Install dependencies once you have the correct versions:

```bash
pnpm install
```

## Development Workflow

1. **Fork & clone** the repository, then create a feature branch off `main`:

   ```bash
   git checkout -b feat/your-feature
   ```

2. **Run the dev server** for the app you are working on (NutUI / Vant / Varlet):

   ```bash
   pnpm dev:nutui      # apps/h5-nutui
   pnpm dev:vant       # apps/h5-vant
   pnpm dev:varlet     # apps/h5-varlet
   ```

3. **Commit with `czg`** (cz-git). Do not use plain `git commit` — commit messages are linted:

   ```bash
   pnpm exec czg
   ```

   Format: `type(scope): message`

   | type     | meaning            |
   | -------- | ------------------ |
   | feat     | new feature        |
   | fix      | bug fix            |
   | docs     | documentation      |
   | style    | formatting only    |
   | refactor | code restructuring |
   | perf     | performance        |
   | test     | tests              |
   | chore    | build / tooling    |

4. **Pre-commit hooks** (via `lefthook`) run automatically on `git commit`: OxLint, Oxfmt, ESLint, Stylelint, and a TypeScript type check. All must pass before the commit is accepted.

5. **Open a Pull Request** against `main` with a clear description of the change and the motivation.

## Documentation

The documentation site is built with VitePress and ships in five languages (English, 简体中文, 日本語, 繁體中文 — Taiwan, 繁體中文 — Hong Kong). Source files live under `docs/src/`. When you change behavior that affects contributors or users, please update the relevant docs and keep all language variants in sync.

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).
