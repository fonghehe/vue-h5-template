# Testing

## Type checks and development startup

`pnpm typecheck` checks `mobile-ui`, `api-client`, `ai-chat` and `vite-config` independently as well as the apps. Vant checks both application code and `tsconfig.node.json`; an app build alone can hide missing package-level type augmentations. For focused checks, run `pnpm -F @vh5/h5-vant type-check` and `pnpm -F @vh5/mobile-ui type-check`.

After adding workspace packages or changing their exports, run `pnpm install` and restart the development server. Vant fails if its port is occupied instead of silently switching ports. If an old server reports `Failed to resolve import @vh5/mobile-ui/...`, stop that server and run `pnpm dev:vant` again, then reload the browser. E2E also checks direct route loads for module HTTP errors and uncaught browser errors.

The default `pnpm test:e2e` runs the shared behavioral suite on Vant, NutUI and Varlet sequentially. It covers tab parity, English/Chinese/Japanese switching and persistence, 320px catalog touch targets, the floating AI entry, Query pagination/mutation, login, Mock API and 401 handling. Dedicated app ports are 15778/15777/15779; tests wait for the Nitro API. Use `pnpm test:e2e:nutui` or `pnpm test:e2e:varlet` for one target.

The test pyramid is intentionally small and behavior-focused.

- Vitest + happy-dom: utilities, request normalization, stores and composables.
- Vue Test Utils: login form, AI chat input and application error boundary interactions.
- Playwright mobile emulation: home, login, mock API, 401 handling and real SSE chat.

```bash
pnpm test
pnpm test:coverage
pnpm test:e2e
pnpm check
```

Coverage thresholds start at 60% for branches, functions, lines and statements. Coverage is a guardrail, not a target for trivial tests. `pnpm check` runs lint, typecheck, unit tests and production build. E2E is separate locally and a dependent CI job because it installs/starts a browser and two development servers.

Network, Visual Viewport and pull-to-refresh lifecycle behavior is tested at the composable boundary. The cart test covers quantity caps, selection and derived totals.
