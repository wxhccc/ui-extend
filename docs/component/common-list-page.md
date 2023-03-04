## CommonListPage 通用列表页模版

基于`PagedTable`组件和`SearchForm`组件封装的高阶组件，用于生成通用场景下的列表页面。

### 基础用法

::: demo base
@[code](@demo/common-list-page/$LIB_DIR/base.vue)
:::

### 带操作行的表格

操作行可以使用表单项组件来做简单的查询，复杂表单还是建议使用`searchForms`。

::: demo operation
@[code](@demo/common-list-page/$LIB_DIR/operation.vue)
:::

### 列表页数据缓存及恢复

本例会用两个会销毁的tab容器模拟页面间的切换，数据恢复只有本组件创建时才会生效，如果同页面内希望恢复，可以通过修改组件的key让组件重新渲染。 

::: demo page-restore 恢复必须要设置`created-auto-send`为true，才会在组件创建时将记录数据传递给请求接口
@[code](@demo/common-list-page/$LIB_DIR/page-restore.vue)
:::

::: tip 使用提示
组件透传了对应参数以及事件绑定给`PagedTable`组件。具见组件文档。
:::

!!!include(common-list-page/index.zh-CN.md)!!!