# Code Standards

## Lint Tools

| Tool        | Purpose        | Config Package          |
| ----------- | -------------- | ----------------------- |
| ESLint      | JS/TS/Vue lint | `@vh5/eslint-config`    |
| Prettier    | Code format    | `@vh5/prettier-config`  |
| Stylelint   | CSS/SCSS lint  | `@vh5/stylelint-config` |
| OXLint      | Fast lint      | `@vh5/oxlint-config`    |
| Commitlint  | Commit message | `@vh5/commitlint-config`|

## Run Lint

```bash
pnpm lint
pnpm format
```

## Git Commit Convention

Uses `cz-git` for conventional commits: `type(scope): message`
