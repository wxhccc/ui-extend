---
title CommonField 通用表单域组件
---
## CommonField 通用表单域组件

组件的目的是用标准格式的数据来生成表单域，最终来实现更高阶的表单组件。

组件支持所有实现了v-model/value+input的组件，所以可以用于生成自定义表单域。对于引用类型的value值（例如Array, Object）,组件会进行深拷贝传入表单域组件，故使用组件时请严格遵循单向数据流方式修改数据。

### 基础用法

组件对`ElRadioGroup`, `ElCheckboxGroup`组件内的子组件的参数进行了修正，使其**value**，**label**的表现与`Select`一致。

::: demo Base
@[code vue](@demo/common-field/Base.vue) 
:::

### 绑定值转Number类型

通过设置`field.isNumber`为true可以修改绑定值为数字，对于无法转换的内容会返回空字符串。

::: demo number-value
@[code vue](@demo/common-field/number-value.vue)
:::

### 使用组件或渲染函数来渲染数据项组件内容

示例用组件渲染了`Options`组件插槽内容，用渲染函数自定义了`Radio`组件插槽内容。

ps: codepen可能不支持这部分的代码。

::: demo custom-child
@[code vue](@demo/common-field/custom-child.vue)
:::

### 使用表单域组件具名插槽

示例使用渲染函数生成了`Input`组件的append插槽内容，用组件传入了`Select`组件的empty插槽内容。

::: demo named-slot 设置`slots`值为VNode渲染函数来定制数据项组件的默认插槽内容
@[code vue](@demo/common-field/named-slot.vue)
:::

::: warning 提示
传递了`data`参数的表单域组件会使用默认插槽渲染子组件列表。你仍可以通过`slots`传入默认作用域插槽，但会有两部分内容。
:::

### 调用表单域组件示例上的方法

::: demo call-method 示例方法必须在组件渲染完后调用
@[code vue](@demo/common-field/call-method.vue)
:::



!!!include(common-field/index.zh-CN.md)!!! 