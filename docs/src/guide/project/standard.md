# Code Standards

> Current limitation: `lefthook.yml` still calls the removed `pnpm check:type` command in its type-check job. The supported command is `pnpm typecheck`. The hook configuration must be updated before relying on it; this documentation update does not silently change Git hooks. CI uses `pnpm check` and is the independent gate.

## Lint Tools

| Tool       | Purpose        | Config Package           |
| ---------- | -------------- | ------------------------ |
| ESLint     | JS/TS/Vue lint | `@vh5/eslint-config`     |
| oxfmt      | Code format    | `@vh5/oxfmt-config`      |
| Stylelint  | CSS/SCSS lint  | `@vh5/stylelint-config`  |
| oxlint     | Fast lint      | `@vh5/oxlint-config`     |
| Commitlint | Commit message | `@vh5/commitlint-config` |

## Run Lint

```bash
pnpm lint
pnpm format
```

## Git Commit Convention

Uses `czg` for conventional commits: `type(scope): message`

## Git Hooks (lefthook)

This repo uses [lefthook](https://github.com/evilmartians/lefthook) for Git hooks. On every `git commit`, the pre-commit hook runs automatically (serially, to avoid memory spikes on low-end machines):

- **oxlint** — `oxlint --fix --type-aware` on staged files
- **oxfmt** — formats staged files
- **eslint** — `eslint --fix` on staged files
- **stylelint** — `stylelint --fix` on staged Vue / CSS / SCSS files
- **check:type** — a full TypeScript type check (`pnpm check:type`)

All lint jobs auto-fix and re-stage their changes. The `commit-msg` hook runs `commitlint` to enforce the commit-message format above. After a merge, `pnpm install` runs automatically via the `post-merge` hook.

Because the hooks run automatically, just commit normally — you do not need to run the linters by hand first (though `pnpm lint` / `pnpm format` are available for local checks).
