## InfoTable 信息表格

组件是使用`Row`组件和`Col`组件生成的类表格组件。用于展示label-value格式的信息。

::: warning 提示
因为使用了`Row`的flex模式，请注意浏览器兼容性。
:::

### 基础用法

只需要`cells`就可以渲染出表格，传入`data`即可显示数据。

:::demo base
@[code](@demo/info-table/$LIB_DIR/base.vue)
:::

### 响应式单元格和设置固定值

响应式是通过`Col`组件实现的，具体见文档

:::demo table-props no-limit-lib
@[code](@demo/info-table/table-props.vue)
:::

### 空格填充

当单元格没有有效值(最终值为假值但不包括数字0)用于填充时，组件会默认使用'--'填充。也可以通过函数自行决定如何填充。

:::demo empty-cell no-limit-lib 设置`set-empty-cell`为false可以关闭填充。
@[code](@demo/data-table/empty-cell.vue)
:::

### 作用域插槽

单元格设置`slotName`就可以通过指导名称的插槽自定义内容，插槽会传入数据data。

:::demo scope-slots no-limit-lib
@[code](@demo/info-table/scope-slots.vue)
:::

### 单元格属性设置

可以设置单元格为响应式属性

:::demo table-props no-limit-lib
@[code](@demo/info-table/table-props.vue)
:::

### 自带特定模式单元格

:::demo cell-config
@[code](@demo/info-table/$LIB_DIR/cell-config.vue)
:::

### 编辑模式

信息表格可以开启编辑模式，因为编辑组件使用了[FormFieldItem组件](./form-field-item)，故编辑模式的表格必须放置于`Form`组件中。

:::demo edit-table 通过设置cell对象的`fieldProps`参数来配置编辑项，设置`canEdit`来控制单元格在编辑模式下是否可编辑。 
@[code](@demo/info-table/$LIB_DIR/edit-table.vue)
:::


::: tip 提示
Layout组件文档参照 <ui-lib-link component="Layout"></ui-lib-link>
:::


!!!include(info-table/index.zh-CN.md)!!!