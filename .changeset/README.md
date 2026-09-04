# Changesets

Run `pnpm changeset` for user-visible package changes. Choose the affected public
packages and explain the impact in release-note language. CI creates the version
PR; merging it publishes configured packages and creates GitHub releases when
`NPM_TOKEN` is available.
