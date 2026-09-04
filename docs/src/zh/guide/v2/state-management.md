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
