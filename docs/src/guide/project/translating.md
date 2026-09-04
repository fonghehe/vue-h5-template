# Translating & Multi-language Docs

The documentation site is built with VitePress and ships in five languages. This guide explains the directory layout and how to keep the languages in sync.

## Languages

| Locale key | Label | `lang` |
| ---------- | ----- | ------ |
| `root` | English | `en-US` |
| `zh` | 简体中文 | `zh-CN` |
| `ja` | 日本語 | `ja` |
| `zh-TW` | 繁體中文(台) | `zh-TW` |
| `zh-HK` | 繁體中文(港) | `zh-HK` |

Locale metadata and the language switcher live in `docs/.vitepress/config/`. Each language has its own config file; `index.mts` merges them, and `en.mts` / `zh.mts` / `ja.mts` / `zh-TW.mts` / `zh-HK.mts` hold that language's `nav` and `sidebar`.

## Directory layout

All docs live under `docs/src/`. The root (English) pages sit at the top level; every other language has its own folder:

```
docs/src/
├── guide/            # English (root) pages
├── zh/guide/         # 简体中文
├── ja/guide/         # 日本語
├── zh-TW/guide/      # 繁體中文(台)
└── zh-HK/guide/      # 繁體中文(港)
```

The same structure applies to `apps/` and `packages/`.

## Adding a translated page

1. **Mirror the path.** If the English page is `docs/src/guide/project/architecture.md`, its Simplified-Chinese version goes to `docs/src/zh/guide/project/architecture.md` — the same path *after* the locale folder. VitePress uses the mirrored path to connect the two in the language switcher, so the translation is one click away.
2. **Register it in the sidebar.** Open `docs/.vitepress/config/<locale>.mts` and add the page under the matching sidebar group (e.g. the *Project* group). Without this step the page exists but will not appear in navigation.
3. **Translate the content**, keeping headings, code blocks, and `meta.title` values aligned with the source so readers get the same structure in every language.

## Keeping languages in sync

There is no automated sync tool — parity is maintained by convention:

- **One source of truth per page.** When you change an English page, update the other four translations in the same PR.
- **Same sidebar order.** Keep the sidebar item order identical across all five locale configs so navigation feels consistent.
- **Same headings/anchors.** Headings should match so cross-links and the table of contents line up.
- **Preview locally.** Run `pnpm dev:docs` and switch languages with the switcher to confirm everything renders and links correctly.

## Adding a new language

1. Create `docs/.vitepress/config/<lang>.mts` following the shape of `zh.mts` (set `label`, `lang`, `link: '/<lang>/'`, and the full `nav` / `sidebar`).
2. Register it in `docs/.vitepress/config/index.mts` under `locales` (e.g. `'<lang>': { ...<lang> }`).
3. Create `docs/src/<lang>/` and copy the full page tree from an existing language, then translate.
4. Add the new language to the `search.locales` block in `docs/.vitepress/config/shared.mts` if you want localized search UI strings.

The live site is deployed to GitHub Pages under `/vue-h5-template/` (see `.github/workflows/docs.yml`).
