# AGENTS.md

This file is the source of truth for AI coding agents working in this repository.

## Architecture

- This is a pnpm + Turborepo monorepo. Use pnpm only.
- Vant, NutUI and Varlet expose the same Home / List / Member / Examples tabs.
- Framework-neutral product views live in `packages/mobile-ui`; app views are lazy wrappers. Native navigation and component showcases stay app-specific.
- A production app selects one UI framework; never import all three into one app.
- `apps/backend-mock` is a Nitro development backend. Production builds must not start it.
- `pnpm dev:<ui>` uses Nitro mock data; `pnpm dev:services:<ui>` proxies AI traffic to port 8001 and business traffic to port 8002.
- Shared browser API concerns live in `packages/api-client`; streaming AI concerns live in `packages/ai-chat`.
- Routes are handwritten intentionally. Route records stay explicit in each app so layout, auth, title and KeepAlive behavior remain visible.

## Where code belongs

| Concern | Location |
| --- | --- |
| Product route wrappers | `apps/<app>/src/views` |
| Shared product pages, chat UI, cart | `packages/mobile-ui/src` |
| App-only components | `apps/<app>/src/components` |
| REST endpoint functions | `packages/api-client/src/modules` |
| Generated backend contracts | `packages/api-client/src/generated` |
| Streaming providers/composable | `packages/ai-chat/src` |
| Browser lifecycle composables | `packages/@core/composables/src` |
| Client state | app Pinia store or `packages/stores` |
| Server state | TanStack Query hooks in `packages/mobile-ui/src/queries.ts` |
| Cross-app pure helpers | `packages/utils` or `packages/@core/base/shared` |
| Build conventions | `internal/vite-config` |
| Mock endpoints | `apps/backend-mock/api` |

Do not add empty layers, placeholder directories, or speculative abstractions.

## Coding style

- TypeScript strict mode is expected. Use `unknown` at error boundaries and narrow it.
- Do not use `any` in product code. A compatibility cast must include a reason.
- Prefer small domain modules over large composables or page-level business logic.
- Keep Vue SFCs focused on view state and interaction; network protocols belong in packages/services.
- Use scoped CSS for substantial components and UnoCSS shortcuts for repeated layout primitives.
- Preserve user changes in a dirty worktree. Do not rewrite unrelated files.

## API rules

- Update `openapi/schema.yaml`, run `pnpm api:generate`, then update API modules and tests.
- Pages consume unwrapped typed data; they do not inspect `ApiResponse.code`.
- `ApiError` is the public error type. Never write `catch (error: any)`.
- Authentication and request IDs are configured once in app bootstrap.
- A 401 must clear client auth and route through the centralized callback.
- Never put secrets or provider API keys in `VITE_*` variables.

## State rules

- Pinia owns client/session/preferences state.
- User-owned cart quantity and selection are client state and may live in Pinia.
- TanStack Query owns remote data, retries, cache, pagination and mutations.
- Do not mirror query results into Pinia.
- Chat conversation state is protocol-oriented local state owned by `useStreamingChat`.

## Security and UI rules

- Treat Markdown and AI output as untrusted. `v-html` is allowed only after DOMPurify sanitization.
- Validate redirects with `getSafeRedirect`.
- Do not cache `/api/**` in the service worker.
- Keep touch targets at least 44 CSS pixels where practical and preserve safe-area padding.
- Prefer `100dvh`, contained scrolling and lazy routes for mobile WebViews.
- Default to English. User-facing text belongs in `packages/locales/src/langs/{en-US,zh-CN,ja-JP}`; translate pages, accessibility labels and route titles together.
- Locale-aware queries include locale in their cache keys. REST requests send the current `Accept-Language`; never translate real backend content using hardcoded product IDs.
- Shared mobile UI CSS is excluded from px-to-vw conversion to preserve actual 44px touch targets.
- App-specific SVG assets belong in `apps/h5-vant/src/assets/icons`; shared example icons live in `packages/mobile-ui/src/assets/icons`. Use `<SvgIcon>`, not copied inline markup.

## Testing rules

- Public utilities, request normalization, stores and composables need unit tests.
- Interaction-heavy components need Vue Test Utils tests.
- Critical user paths belong in Playwright.
- Test behavior and boundaries, not implementation trivia.

## Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm test:e2e
pnpm build
pnpm check
pnpm api:generate
pnpm audit:prod
pnpm build:analyze
pnpm dev:services:vant
pnpm dev:services:nutui
pnpm dev:services:varlet
```

`pnpm check` intentionally excludes E2E because it starts browsers and local servers; CI runs E2E as a dependent job.

## Pull request checklist

- [ ] Change is in the correct app/package boundary.
- [ ] Types and OpenAPI output are synchronized.
- [ ] Auth, redirects, Markdown and URLs were reviewed for security impact.
- [ ] Mobile keyboard, safe area, loading, error and empty states were considered.
- [ ] Tests cover meaningful behavior.
- [ ] English and Chinese documentation are synchronized.
- [ ] `pnpm check` passes; relevant E2E passes.
- [ ] A changeset exists for user-visible public-package changes.
