## PagedTable 分页表格

[PagedList](./paged-list)组件和[DataTable](./data-table)组件的高阶封装，集成两组件功能，可用于生成通用分页表格。

### 基础用法

需要传入`columns`来生成表格列，需要传入`data`来显示数据和分页组件，需要传入`get-paged-data`回调函数来响应组件内数据变化。

:::demo Base
<<< @/docs/.vuepress/components/demo/paged-table/Base.vue
:::


### 复杂功能

本例模拟了常见场景下的列表页面的基础要素，包括搜索条件，分页，单一条件排序（后端排序）

:::demo Full
<<< @/docs/.vuepress/components/demo/paged-table/Full.vue
:::

::: tip 使用提示
组件透传了对应参数以及事件绑定给`PagedList`组件和`DataTable`组件。如果出现两组件参数同名情况，组件接受的是`PagedList`组件的参数，为了解决这类问题，可以使用`data-table-props`和`data-table-events`传入`DataTable`组件的参数以及绑定事件。如果需要对组件参数进行归类也可以使用这两个参数。
:::

 !!!include(paged-table/index.zh-CN.md)!!!