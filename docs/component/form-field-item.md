## FormFieldItem 表单项

基于`FormItem`组件和`CommonField`组件封装的表单项组件。用于通过数据生成带验证功能的表单项。

::: warning 提醒
因为使用了`FormItem`组件，所以组件必须放置于`Form`组件内部。
:::

### 基础用法

:::demo Base field对象的`isNumber`表现类似于v-model.number修饰符。一般对必填项且有类型判断规则有很好的类型转换作用。其他场景需要自己对数据进行处理。
@[code](../.vuepress/demo/form-field-item/Base.vue)
:::

### 纯文本展示

通过设置`text`参数为boolean，function，(string/number)类型可以让表单域展示/隐藏，显示函数返回内容，显示给定内容。

:::demo show-text
@[code](../.vuepress/demo/form-field-item/show-text.vue)
:::

### 多表单域组件

设置`children`参数为包含多个子表单项对象的数组时，可以构建出适用于特定场景的表单项。

::: warning 注意！
此结构仅允许一层。设置子表单项对象的`children`无效。此类场景建议自定义表单域组件然后传入本组件。
:::

:::demo mult-fields
@[code](../.vuepress/demo/form-field-item/mult-fields.vue)
:::

### 使用FormItem组件插槽

组件支持设置`FormItem`组件的具名插槽和作用域插槽。具名插槽中的`default`不会覆盖表单域内容，而是作为额外内容放置于表单域区域。

:::demo all-slots
@[code](../.vuepress/demo/form-field-item/all-slots.vue)
:::

### 调用FormItem组件上的方法

组件代理了根层级的`FormItem`组件上的方法，对于子层级的`FormItem`组件，请使用`$refs`获取后调用

:::demo call-method
@[code](../.vuepress/demo/form-field-item/call-method.vue)
:::

::: tip 提示
FormItem组件文档参照 <element-link component="FormItem"></element-link>
:::


!!!include(form-field-item/index.zh-CN.md)!!!