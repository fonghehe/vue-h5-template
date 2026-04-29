# Quick Start

## Requirements

- **Node.js** >= 20.12.0
- **pnpm** >= 10.0.0

## Installation

```bash
# Clone the project
git clone https://github.com/fonghehe/vue-h5-template.git
cd vue-h5-template

# Install dependencies
pnpm install
```

## Development

```bash
# Start all apps (interactive selection)
pnpm dev

# Start a specific app
pnpm dev:nutui    # NutUI version
pnpm dev:vant     # Vant version
pnpm dev:varlet   # Varlet version
```

The mock server starts automatically at `http://localhost:5320` via Nitro, and the frontend proxies `/api` requests to it.

## Build

```bash
# Build all apps
pnpm build

# Build a specific app
pnpm build:nutui
pnpm build:vant
pnpm build:varlet
```

## Preview

```bash
cd apps/h5-nutui
pnpm preview
```

## Cleanup

```bash
# Clean all node_modules, dist, .turbo cache
pnpm clean

# Also delete lock file
pnpm clean --del-lock
```

## Create New App

```bash
# Interactively create a new H5 app via CLI
pnpm create-app
```

Supports Varlet / Vant / NutUI, auto-generates a complete project structure. See [Create App](/guide/essentials/create-app).

## Test Accounts

The mock server provides these test accounts:

| Username | Password | Role         |
| -------- | -------- | ------------ |
| user     | 123456   | Regular user |
| admin    | 123456   | Admin        |
