# Testing

## Type checks and development startup

`pnpm typecheck` independently checks the three apps, shared runtime packages (`utils`, `stores`, `locales`, core packages, UI/API/AI), the Mock backend, Vite configuration and workspace CLI tools. Each app checks both its source and `tsconfig.node.json`; `tsconfig.tools.json` covers root Vitest/Playwright configuration and E2E code. Package tests are type-checked too. Every new source-bearing package needs a `type-check` script so the recursive command discovers it. For focused checks, use `pnpm -F @vh5/utils type-check` or `pnpm -F @vh5/mobile-ui type-check`.

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

## Core regression coverage

Tests cover SSE split CRLF and multibyte UTF-8, malformed events, fetch headers and failures, reactive chunk updates, stop/clear/retry races, Axios timeout/network/HTTP errors, query pagination and locale cache isolation, cart quantity/currency boundaries, user session behavior and pull-to-refresh failure recovery.

`MarkdownContent` uses a file-level `jsdom` environment and the real DOMPurify sanitizer. Do not mock sanitization or validate it with happy-dom; other DOM component tests still use happy-dom. jsdom stays on the compatible 29.x line because 30.x requires a higher Node minimum than this repository declares.

`vitest.config.ts` explicitly includes core API/AI, utility/composable logic, selected mobile components/stores and backend helpers, including files not yet imported by tests. The 60% branch/function/line/statement thresholds apply to that scope, not the entire app. Run `pnpm test:coverage` for the current report; `pnpm test packages/ai-chat/src/__tests__` runs a focused suite. CI runs coverage in the quality job.
