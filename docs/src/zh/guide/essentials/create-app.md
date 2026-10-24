# 创建应用

选择 UI 框架并输入应用名称。例如输入 `h5-my-app`，会在 `apps/h5-my-app` 下创建名为 `@vh5/h5-my-app` 的包。

```bash
pnpm create-app
```

## 脚手架选项

CLI 复制所选参考应用，包含共享业务页、Mock 和配套服务模式。生成的模式配置文件定义应用名称和独立的存储命名空间。

| UI 框架 | 开发端口 |
| --- | --- |
| NutUI | 5780 |
| Vant | 5781 |
| Varlet | 5782 |
| TDesign Mobile Vue | 5785 |
| Ionic Vue | 5786 |

## 安装与验证

在工作区根目录安装依赖，检查生成应用的类型，然后启动开发服务器。

```bash
pnpm install
pnpm -F @vh5/h5-my-app type-check
pnpm -F @vh5/h5-my-app dev
```

用 `pnpm run build --filter=@vh5/h5-my-app` 构建应用。所有生成的应用均可运行 `pnpm -F @vh5/h5-my-app dev:services`，请先启动配套服务。根目录的快捷脚本可按需添加。 [后端模式](./server.md)
