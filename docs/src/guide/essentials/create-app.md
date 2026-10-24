# Create App

Choose a UI framework and an app name. For example, `h5-my-app` creates `apps/h5-my-app` with the package name `@vh5/h5-my-app`.

```bash
pnpm create-app
```

## Scaffold options

The CLI copies the selected reference app with its shared product pages, Mock and service modes. The generated mode files define the app name and its own storage namespace.

| UI framework | Dev port |
| --- | --- |
| NutUI | 5780 |
| Vant | 5781 |
| Varlet | 5782 |
| TDesign Mobile Vue | 5785 |
| Ionic Vue | 5786 |

## Install and verify

From the workspace root, install dependencies, run the generated package’s type check and start its development server.

```bash
pnpm install
pnpm -F @vh5/h5-my-app type-check
pnpm -F @vh5/h5-my-app dev
```

Build the app with `pnpm run build --filter=@vh5/h5-my-app`. All scaffolds also expose `pnpm -F @vh5/h5-my-app dev:services`. Start the companion services first. Root shortcuts are optional. [Backend modes](./server.md)
