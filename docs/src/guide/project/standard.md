# Code Standards

> `lefthook.yml` calls the supported `pnpm typecheck` command. It checks the workspace, all three app configurations and test tooling; CI independently runs lint, type checks, unit coverage and builds.

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
- **typecheck** — a full TypeScript type check (`pnpm typecheck`)

All lint jobs auto-fix and re-stage their changes. The `commit-msg` hook runs `commitlint` to enforce the commit-message format above. After a merge, `pnpm install` runs automatically via the `post-merge` hook.

Because the hooks run automatically, just commit normally — you do not need to run the linters by hand first (though `pnpm lint` / `pnpm format` are available for local checks).

## Local AI assistant files

`.gitignore` excludes local memories, histories, sessions and credentials for common assistants (including `.workbuddy/memory/`). Shared instructions, rules and skills remain trackable: `AGENTS.md`, `.cursor/rules/`, `.claude/skills/` and `.codex/skills/`. Personal data is not deleted. For another tool, add a narrow artifact rule and validate it with `git check-ignore --no-index`; the regression test also checks that shared rules remain visible.
