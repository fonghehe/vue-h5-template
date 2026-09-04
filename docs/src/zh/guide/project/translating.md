# 多语言文档与翻译

文档站点基于 VitePress 构建，并提供了五种语言。本指南说明目录结构以及多语言之间如何保持同步。

## 语言

| Locale key | 名称 | `lang` |
| ---------- | ---- | ------ |
| `root` | English | `en-US` |
| `zh` | 简体中文 | `zh-CN` |
| `ja` | 日本語 | `ja` |
| `zh-TW` | 繁體中文(台) | `zh-TW` |
| `zh-HK` | 繁體中文(港) | `zh-HK` |

语言元信息与语言切换器位于 `docs/.vitepress/config/`。每种语言都有独立的配置文件：`index.mts` 负责合并，而 `en.mts` / `zh.mts` / `ja.mts` / `zh-TW.mts` / `zh-HK.mts` 各自持有对应语言的 `nav` 与 `sidebar`。

## 目录结构

所有文档都位于 `docs/src/` 下。英文（root）页面在顶层，其余每种语言各占一个独立文件夹：

```
docs/src/
├── guide/            # 英文（root）页面
├── zh/guide/         # 简体中文
├── ja/guide/         # 日本語
├── zh-TW/guide/      # 繁體中文(台)
└── zh-HK/guide/      # 繁體中文(港)
```

`apps/` 与 `packages/` 同样遵循该结构。

## 新增一个翻译页

1. **镜像路径。** 若英文页为 `docs/src/guide/project/architecture.md`，其简体中文版应放在 `docs/src/zh/guide/project/architecture.md` —— 即语言文件夹之后的路径保持一致。VitePress 会依据镜像路径在语言切换器中关联二者，翻译页只需一键即可到达。
2. **注册到侧边栏。** 打开 `docs/.vitepress/config/<locale>.mts`，将该页加入对应的侧边栏分组（例如 *工程* 分组）。缺少这一步，页面虽存在却不会出现在导航中。
3. **翻译内容**，保持标题、代码块与 `meta.title` 与原文一致，使各语言读者获得相同的结构。

## 保持语言同步

目前没有自动同步工具 —— 多语言一致靠约定维持：

- **每页单一事实来源。** 修改英文页时，应在同一个 PR 中同步更新其余四种翻译。
- **侧边栏顺序一致。** 五种语言的侧边栏条目顺序应保持一致，使导航体验统一。
- **标题 / 锚点一致。** 标题应相互对应，以便交叉链接与目录对齐。
- **本地预览。** 运行 `pnpm dev:docs`，用切换器切换语言，确认渲染与链接均正确。

## 新增一种语言

1. 参照 `zh.mts` 创建 `docs/.vitepress/config/<lang>.mts`（设置 `label`、`lang`、`link: '/<lang>/'`，以及完整的 `nav` / `sidebar`）。
2. 在 `docs/.vitepress/config/index.mts` 的 `locales` 下注册（例如 `'<lang>': { ...<lang> }`）。
3. 创建 `docs/src/<lang>/`，从已有语言完整复制页面树，再进行翻译。
4. 如需本地化搜索界面文案，在 `docs/.vitepress/config/shared.mts` 的 `search.locales` 块中加入新语言。

线上站点部署在 GitHub Pages 的 `/vue-h5-template/` 路径下（详见 `.github/workflows/docs.yml`）。
