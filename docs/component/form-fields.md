## FormFields 表单项组

使用[FormFieldItem](./form-field-item)组件或者自定义组件来生成一组表单项，(多个)表单项组可以放置于`Form`组件中来渲染出完整表单。此外带data数据的表单项组件之间还可以设置联动。

::: warning 提醒
因为使用了`FormItem`组件，所以组件必须放置于`Form`组件内部。
:::

### 基础用法

本例表单项组包含常见表单域，比如输入框，选择器，开关，单选，多选，时间选择器。

:::demo Base
<<< @/docs/.vuepress/demo/form-fields/Base.vue
:::

### 表单项之间级联

级联适用于能使用data生成子选项的表单项，例如`Select`,`CheckboxGroup`,`RadioGroup`组件或其他自定义组件。
级联可以一对一，也可以多对一。

:::demo cascade-items 多个表单项的cascadeModel可以绑定到同一个表单项上。
<<< @/docs/.vuepress/demo/form-fields/cascade-items.vue
:::

### 使用自定义组件作为表单项

自定义组件可以和使用`FormFieldItem`组件的表单项混用。自定义组件需要实现v-model/value+input数据绑定模式，传入值为数据项的props对应的值。

:::demo custom-item 
<<< @/docs/.vuepress/demo/form-fields/custom-item.vue
:::

### 调用表单项组件上的方法

:::demo call-method
<<< @/docs/.vuepress/demo/form-fields/call-method.vue
:::

### 自定义组件表单项使用级联逻辑 <Badge text="高阶" type="warn"/>

自定义组件作为表单项时，只要实现了change事件即可作为级联触发源。但如果需要作为被触发项，则需要通过设置`cascadeHandler`来处理。

下面例子演示了自定义表单项如何即作为触发项，同时也作为被触发项。

:::demo custom-item-cascade 
<<< @/docs/.vuepress/demo/form-fields/custom-item-cascade.vue
:::

::: tip 级联工作原理说明
<p>组件支持对使用<code>data</code>数据生成子组件的表单项通过设置关联属性和级联数据来实现级联逻辑。</p>
<p>组件项可以分为监听项和被监听(触发源)项，同一个组件既可以是监听项又是被监听项。 </p>
<p>被监听项值发生改变时会触发<code>change</code>事件，从而调用监听项绑定的事件。</p>
<p>对于使用<code>field</code>字段来生成表单域的表单项，组件默认的处理逻辑是被监听表单项发生改变时，所有监听项会根据绑定值获取到对于级联数组，并替换到<code>field.data</code>数组中。默认从0索引开始替换。对于需要保留项的，可以设置<code>spliceStart</code>来从其他索引值开始替换。</p>
<p>此外被监听表单项发生改变时，所有监听项还会重置绑定值，默认会设置为undefined，如果需要可以通过<code>clearValue</code>设置成其他值。</p>
<p>自定义组件可以通过设置<code>cascadeHandler</code>参数作为监听项，但如果需要作为被监听项，则自定义组件内部需要在绑定值发生改变时触发<code>change</code>事件。</p>
:::

!!!include(form-fields/index.zh-CN.md)!!!