# 构建与部署

```bash
pnpm build:vant
pnpm -F @vh5/h5-vant preview
pnpm build:docs
pnpm -F @vh5/docs preview
```

其他应用把 `vant` 替换为 `nutui` 或 `varlet`。`pnpm build` 调度所有 workspace build（含文档）。部署所选 `apps/h5-<ui>/dist` 为 history SPA，preview 不启动 Nitro 或配套服务。

产物不包含 Vite 开发代理。生产把 `/api/ai/**` 先转发 AI 服务，其余 `/api/**` 转业务服务，并关闭 SSE 缓冲。生产设 `VITE_NITRO_MOCK=false`，禁止在前端 env 放模型密钥/JWT secret。

`VITE_BASE` 配置资源和 router base；子目录还需匹配托管 fallback，并检查 PWA start URL、导航回退和应用根路径链接，不能宣称只改一个变量就完成子目录部署。

`VITE_PWA_ENABLED=true` 可开启静态预缓存/SPA fallback，不缓存 API。`VITE_IMAGE_OPTIMIZE=true` 只在构建优化图片，Vant 生产配置已开启。

现有 `scripts/deploy/Dockerfile` 复制的是 **playground/dist**，不是三套 H5 应用；Nginx 模板也未配置双后端。使用前需调整，不是可直接部署 H5 的完整命令。

文档产物为 `docs/.vitepress/dist`，base 是 `/vue-h5-template/`。docs workflow 在 main 的相关文件变化或手动触发时发布。release workflow 使用 Changesets，公开包发布需仓库/token 配置。参见[部署细节](../v2/deployment.md)。
