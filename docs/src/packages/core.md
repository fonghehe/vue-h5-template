# Core Packages (@vh5-core)

The `@vh5-core/*` packages under `packages/@core/` are the project's low-level foundation. Per `packages/@core/README.md`, this directory holds "relatively basic SDK and UI component libraries" that may later be extracted or published to npm — **do not place any business logic or business packages here.**

## Packages

### `@vh5-core/design`
Design tokens and BEM SCSS utilities.
- `.` — design CSS / token entry (`design.css`)
- `./bem` — BEM SCSS helpers (`bem.scss`)

### `@vh5-core/shared`
Framework-agnostic shared building blocks.
- `./constants` — shared constants
- `./utils` — shared utilities (built on `es-toolkit`, `dayjs`, `clsx`, `tailwind-merge`, …)
- `./cache` — caching helpers
- `./store` — lightweight store built on `@tanstack/vue-store`

### `@vh5-core/typings`
Shared TypeScript type definitions.
- `.` — core type definitions
- `./vue-router` — router-related type augmentations

### `@vh5-core/composables`
Reusable Vue 3 composables (depends on `@vueuse/core`, `sortablejs`, and `@vh5-core/shared`).

## Relationship to the other packages

The user-facing packages documented elsewhere — `@vh5/stores`, `@vh5/utils`, `@vh5/styles`, `@vh5/locales`, `@vh5/vite-config` — are built on top of `@vh5-core/*`. Applications normally import the higher-level packages; reach for `@vh5-core/*` only when you need a primitive that isn't exposed upstream.
