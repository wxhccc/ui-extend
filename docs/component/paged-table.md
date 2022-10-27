## PagedTable 分页表格

[PagedList](./paged-list)组件和[DataTable](./data-table)组件的高阶封装，集成两组件功能，可用于生成通用分页表格。

### 基础用法

需要传入`columns`来生成表格列，需要传入`data`来显示数据和分页组件，需要传入`get-paged-data`回调函数来响应组件内数据变化。

:::demo base
@[code](@demo/paged-table/$LIB_DIR/base.vue)
:::


### 复杂功能

本例模拟了常见场景下的列表页面的基础要素，包括搜索条件，分页，单一条件排序（后端排序）

:::demo full
@[code](@demo/paged-table/$LIB_DIR/full.vue)
:::


::: tip 使用提示
<libs-content>
  <template #element>
    组件透传了对应参数以及事件绑定给`PagedList`组件和`DataTable`组件
  </template>
</libs-content>

:::

 !!!include(paged-table/index.zh-CN.md)!!!