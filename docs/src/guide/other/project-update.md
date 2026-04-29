# Project Update

## Syncing Latest Code

```bash
# Fetch latest changes
git fetch origin
git pull origin main

# Reinstall dependencies (in case of lockfile changes)
pnpm install
```

## Dependency Updates

```bash
# Check outdated dependencies
pnpm outdated -r

# Update all dependencies interactively
pnpm update -r --interactive --latest
```

## Cleaning Cache

If you encounter build issues after updating, try cleaning the cache:

```bash
# Clean all caches, node_modules, and dist
pnpm clean

# Full reinstall
pnpm reinstall
```

## Handling Breaking Changes

When updating major versions of dependencies:

1. Check the UI framework migration guide (NutUI / Vant / Varlet)
2. Review Vite release notes for breaking changes
3. Test all three app variants after updating
4. Update shared Vite config if plugin APIs changed
