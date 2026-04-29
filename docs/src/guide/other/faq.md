# FAQ

## Installation Issues

### `pnpm install` fails

Make sure you are using the correct versions:

- Node.js >= 20.12.0
- pnpm >= 10.0.0

```bash
node -v
pnpm -v
```

If using an older version, upgrade:

```bash
npm i -g corepack
corepack enable
corepack prepare pnpm@latest --activate
```

### Port already in use

If the default port is occupied, you can modify the `VITE_PORT` in the corresponding app's `.env.development` file, or set it directly:

```bash
VITE_PORT=3000 pnpm dev:nutui
```

## Development Issues

### Mock server not working

Ensure `VITE_NITRO_MOCK=true` is set in `.env.development`. The mock server runs on port `5320` by default.

### Auto-import not working

Run `pnpm dev` once to generate the auto-import type declarations. The generated files (`auto-imports.d.ts`, `components.d.ts`) should be committed to version control.

### How to add a new page?

1. Create a `.vue` file in `src/views/`
2. Add the route in `src/router/`
3. If the page needs a tabbar entry, update the layout configuration

### How to add a new API endpoint?

1. Create the API function in `src/api/`
2. If using mock data, add the mock handler in `apps/backend-mock/api/`

## Build Issues

### Build out of memory

The root `package.json` already sets `NODE_OPTIONS=--max-old-space-size=8192`. If it's still not enough, increase the value.

### How to deploy to a subdirectory?

Set `VITE_BASE` in `.env.production`:

```bash
VITE_BASE=/my-app/
```

## Other

### How to remove an unused UI framework app?

1. Delete the app directory (e.g., `apps/h5-varlet/`)
2. Remove the corresponding scripts from root `package.json`
3. Run `pnpm install` to update the workspace

### How to add a new shared package?

1. Create a new directory under `packages/`
2. Add `package.json` with the `@vh5/` scope
3. Reference it in apps via `"@vh5/my-package": "workspace:*"`
