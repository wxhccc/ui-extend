## TreeField 树表单域

基于Tree组件封装的表单域组件，可通过v-model绑定值。内置单向级联逻辑

::: warning 提示
组件会透传Tree组件支持的绝大部分属性和事件绑定以及插槽，部分属性设置了默认值，此外还有少数属性外部无法覆盖。具体见[Tree Attributes](#tree-attributes)
:::

### 基础用法

:::demo Base
@[code vue](@demo/tree-field/Base.vue)
:::

### 在Form中使用

本例演示如何作为表单域使用，包括设置初始值，只读模式等。

:::demo form-field
@[code vue](@demo/tree-field/form-field.vue)
:::

### 自定义节点内容

:::demo scope-slot
@[code vue](@demo/tree-field/scope-slot.vue)
:::


::: tip 提示
Tree组件文档参照 <element-link component="Tree"></element-link>
:::


!!!include(tree-field/index.zh-CN.md)!!!