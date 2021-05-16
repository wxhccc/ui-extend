## DataTable 数据表格

基于Table组件封装的表格组件，采用columns配置列，让table可以数据化驱动。

::: warning 提示
组件会透传Table组件支持的所有属性和事件绑定，部分属性设置了默认值，你可以选择覆盖。
组件放弃了插槽的透传，毕竟组件的目的是数据化驱动Table，而插槽写法会妨碍数据化，需要插槽定制的需求可以通过传入组件实现（组件也是数据的一种）。
:::

### 基础用法

只需要`columns`就可以渲染出表格，传入`data`即可显示数据。

:::demo Base
@[code vue](@demo/data-table/Base.vue)
:::

### 配置原始Table组件的各项参数

::: tip 说明 
如无特殊说明，组件支持透传Table组件的所有方法和绝大部分参数，`columns`配置项支持TableColumn组件的绝大部分属性。插槽请按本组件文档描述使用。
:::

本例设置了Table组件`size`，高度，配置了TableColumn组件的`formatter`, `type`数据，监听了Table组件的`selection-change`事件。可调用Table实例的方法

:::demo table-props
@[code vue](@demo/data-table/table-props.vue)
:::

### 空格填充

:::demo empty-cell 设置`set-empty-cell`为true即可让空白格填充'--'
@[code vue](@demo/data-table/empty-cell.vue)
:::

### 自带多(单)选数值绑定

多选功能是基于`Table`组件的多选实现，单选是组件内部实现。
多选值绑定支持翻页表格，通过选择列对象的`reserveSelection`属性实现。
单选值可以通过维护分页和选择值来实现页内单选，具体见示例代码。

:::demo selection-values 通过设置`selection`来控制单选或多选。 
@[code vue](@demo/data-table/selection-values.vue)
:::

### 基础操作按钮

本例同时也演示了如何利用计算属性来动态设置`columns`属性

:::demo action-btns
@[code vue](@demo/data-table/action-btns.vue)
:::

### 操作按钮异步请求和表格列自定义组件渲染

:::demo async-action
@[code vue](@demo/data-table/async-action.vue)
:::

::: tip 提示
Table组件文档参照 <element-link component="Table"></element-link>
:::


!!!include(data-table/index.zh-CN.md)!!!