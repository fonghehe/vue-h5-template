# CLI — vsh

The project bundles a small command-line tool, `@vh5/vsh` (invoked as `vsh`), built on [cac](https://github.com/cacjs/cac). It wraps linting, dependency checks, scaffolding, and workspace management so contributors don't have to memorize long command chains.

## Running commands

The CLI is a workspace package whose binary is `vsh`. You can invoke it in two ways:

```bash
# Via pnpm (preferred)
pnpm exec vsh <command>

# Or through the root package scripts that already wrap the common commands
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

The suite runs these checks. On machines with up to four logical CPUs, the checks run in the order shown.

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

The wizard copies one of the five reference apps into `apps/`.

```bash
pnpm create-app
```

See [Create App](../essentials/create-app.md) for default ports, integration requirements and validation commands.

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
pnpm exec oxfmt --write vh5.code-workspace
```

See [Code Standards](./standard) for the lint toolchain that `vsh lint` drives.
