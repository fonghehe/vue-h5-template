# 状态管理

v2 按“谁拥有状态”划分职责：

| 状态 | 管理者 | 示例 |
| --- | --- | --- |
| Client State | Pinia | Token、偏好、购物车选择 |
| Server State | TanStack Query | 商品、缓存、重试、分页、Mutation |
| 局部交互 | Vue refs | 表单草稿、Tab、弹窗 |
| 流式会话 | `useStreamingChat` | 消息、AbortController、状态、重试 |

不要把 Query 数据复制到 Pinia，否则会形成两套缓存和失效规则。Query Key 必须包含所有影响响应的参数；Mutation 只失效或更新最小范围的 Key。

`/examples/query` 包含普通分页 Query、Mutation 和 Infinite Query。移动网络下默认使用短 `staleTime` 与一次重试。

购物车 Store 只保存用户拥有的商品行、数量与选中状态，可以本地持久化；商品列表的远程数据、Loading 和 Retry 不进入该 Store。

语言偏好由 Vue I18n 与 localStorage 管理，不存入 Pinia。

## 商品路由与请求取消

详情链接只接受单个正整数十进制 ID，数值须在 JavaScript 安全整数范围内。缺失、重复、格式错误或超范围的 ID 会显示恢复指引，不发送详情请求。复用页面查看另一个商品时，会清除之前的“已加入购物车”提示。

目录、分页和无限列表 Query 将 TanStack Query 的 `AbortSignal` 经 `getProductList(params, signal)` 传到 HTTP 客户端。切换语言、页码或卸载最后一个观察者时会取消过时请求。迟到结果不能写入另一个语言的当前页面，缓存仍由 Query Key 隔离。

## 会话与请求生命周期

各应用通过 `@vh5/stores/user` 的 `defineUserStore` 创建会话 store，注入类型明确的 API 函数、登录响应映射及取消错误工厂。stores 包只依赖底层基础能力，不导入 `@vh5/api-client` 或生成的后端契约。只持久化令牌和身份快照，请求句柄及版本保护不放入 Pinia 状态。过期登录结果不能恢复已清理的会话，切换会话或销毁 store 会取消资料请求，旧退出请求不能清除新登录。远程缓存仍由 TanStack Query 管理。

Query 示例与商品详情复用 `FavoriteButton`。应用包装页传入当前会话，私有读取、写入与迟到响应按会话隔离；访客看到登录入口。
