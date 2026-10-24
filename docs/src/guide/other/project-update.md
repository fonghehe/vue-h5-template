# Project maintenance

## Update the checkout

From a clean checkout tracking the upstream branch, pull with `git pull --ff-only`, then run `pnpm install --frozen-lockfile`. Restart running dev servers after changing workspace packages or build configuration.

## Update dependencies

Inspect candidates with `pnpm outdated -r`. Change the relevant catalog entries in `pnpm-workspace.yaml`, run `pnpm install`, and review the catalog and lockfile together. Keep workspace-local references on `workspace:*`.

## Verify changes

Run `pnpm check`. Run `pnpm test:e2e` for changes to runtime dependencies, navigation, requests or build integration. Check the five UI apps when changing shared dependencies.

## Rebuild local artifacts

`pnpm clean` removes installed modules, build outputs and Turbo caches. Run `pnpm install --frozen-lockfile` afterward to reproduce the locked dependency graph.
