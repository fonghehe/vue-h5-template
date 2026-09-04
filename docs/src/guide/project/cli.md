# CLI — vsh

> The CLI currently generates basic pages and copies reference layout/locales/API/stores. It is not a verified clone of the current v2 product apps: generated dependencies/bootstrap still need alignment with shared mobile UI and Query integration. Use an existing H5 app as the reference and run type checks, build and browser tests before using a generated app.

The project bundles a small command-line tool, `@vh5/vsh` (invoked as `vsh`), built on [cac](https://github.com/cacjs/cac). It wraps linting, dependency checks, scaffolding, and workspace management so contributors don't have to memorize long command chains.

## Running commands

The CLI is a workspace package whose binary is `vsh`. You can invoke it in two ways:

```bash
# Via pnpm (preferred)
pnpm exec vsh <command>

# Or through the root npm scripts that already wrap the common commands
pnpm lint        # vsh lint
pnpm format      # vsh lint --format
pnpm publint     # vsh publint
pnpm create-app  # vsh create-app
```

Run `pnpm exec vsh --help` to list all commands, or `pnpm exec vsh <command> --help` for a single command's options.

## Commands

### `vsh lint`

Runs the full lint/format check suite. The tool picks serial or parallel execution based on CPU cores (≤ 4 cores → serial, to avoid memory spikes on low-end machines).

```bash
pnpm exec vsh lint
pnpm exec vsh lint --threads 4   # explicit thread count for oxfmt / oxlint
```

It runs, in order:

| Tool | Command |
| ---- | ------- |
| Oxfmt (check) | `oxfmt --check --threads=N` |
| OxLint | `oxlint --type-aware --threads=N` |
| ESLint | `eslint . --cache` |
| Stylelint | `stylelint "**/*.{vue,css,less,scss}" --cache` |

Add `--format` to auto-fix issues instead of only reporting them:

```bash
pnpm format
# runs: stylelint --fix, oxfmt, oxlint --fix --type-aware, eslint --fix
```

### `vsh publint`

Checks every package's `package.json` against [publint](https://github.com/bloomberg/publint) publishing standards.

```bash
pnpm publint
```

### `vsh create-app`

Interactively scaffolds a new H5 app under `apps/`. It prompts for a UI framework (Varlet / Vant / NutUI) and an app name, then generates a full boilerplate (`package.json`, `vite.config.ts`, router, views, i18n, stores) and copies `layout/`, `locales/`, `api/`, and `stores/` from the matching reference app.

```bash
pnpm create-app
```

After it finishes, follow the printed next steps: run `pnpm install`, then add `dev:<name>` / `build:<name>` scripts to the root `package.json`.

### `vsh check-circular`

Scans the workspace for circular (import) dependencies using `circular-dependency-scanner`. Findings are reported as a **warning** and do not fail the build.

```bash
pnpm exec vsh check-circular
pnpm exec vsh check-circular --staged           # only scan staged files
pnpm exec vsh check-circular --verbose          # show detail (on by default)
pnpm exec vsh check-circular --threshold 2      # minimum cycle length
pnpm exec vsh check-circular --ignore-dirs dist,node_modules
```

By default it ignores `dist`, `.turbo`, `output`, `.cache`, `scripts`, `internal`, and a few heavy UI-kit packages.

### `vsh check-dep`

Uses [depcheck](https://github.com/depcheck/depcheck) to find missing or unused dependencies across all workspace packages.

```bash
pnpm exec vsh check-dep
pnpm exec vsh check-dep --ignore-packages @vh5/foo,@vh5/bar
pnpm exec vsh check-dep --ignore-matches vite,vitest
pnpm exec vsh check-dep --ignore-patterns dist,public
```

A curated set of build-only packages (e.g. `@vh5/tsconfig`, `@vh5/vite-config`) is ignored by default.

### `vsh code-workspace`

Regenerates the `vh5.code-workspace` file from the current workspace packages so VS Code's multi-root workspace stays in sync.

```bash
pnpm exec vsh code-workspace
pnpm exec vsh code-workspace --spaces 4
pnpm exec vsh code-workspace --auto-commit   # git add the result
```

See [Code Standards](./standard) for the lint toolchain that `vsh lint` drives.
