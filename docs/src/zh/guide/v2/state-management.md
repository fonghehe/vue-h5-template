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
