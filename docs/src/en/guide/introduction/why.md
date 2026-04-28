# Why Vue H5 Template?

## Background

In mobile H5 development, developers often face similar challenges when starting a new project:

- Choosing the right UI framework (NutUI, Vant, Varlet) and setting it up properly
- Configuring the build tool and development environment from scratch
- Setting up code standards, linting, and formatting across the team
- Implementing common features like authentication, state management, and internationalization
- Managing multiple apps with shared code and configurations

Vue H5 Template was created to solve these problems with a well-structured, production-ready Monorepo template.

## Why Monorepo?

### Code Reuse

In traditional multi-repo setups, shared code (utils, stores, styles, configs) must be maintained separately and published as packages. In a Monorepo:

- Shared packages are linked directly via workspace references
- Changes to shared code are immediately available to all apps
- No need to publish and version internal packages

### Unified Standards

With Monorepo, all apps share the same:

- ESLint, Prettier, Stylelint configurations
- TypeScript configuration
- Commit conventions and CI/CD pipelines
- Dependency versions via pnpm catalog

### Multi-UI Framework Support

Different teams or projects may prefer different UI frameworks. Vue H5 Template provides three ready-to-use app templates:

| App       | UI Framework | Default Port |
| --------- | ------------ | ------------ |
| h5-nutui  | NutUI 4.x    | 5777         |
| h5-vant   | Vant 4.x     | 5778         |
| h5-varlet | Varlet 3.x   | 5779         |

You can choose one or use multiple simultaneously.

## Quality & Standards

The project adopts strict quality standards:

- **Type Safety**: Full TypeScript coverage
- **Code Style**: ESLint + Prettier + Stylelint with shared configs
- **Commit Convention**: Commitlint with Conventional Commits
- **Git Hooks**: Lefthook for pre-commit and commit-msg checks
- **Spell Checking**: CSpell for catching typos
