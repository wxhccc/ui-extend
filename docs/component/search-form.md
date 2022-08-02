## SearchForm 搜索表单

基于[FormFields](./form-fields)组件和<element-link component="Form"></element-link>组件封装的搜索表单。用于列表的搜索条件。

### 基础用法

建议使用按钮触发数据变动，这样可以避免短时间内多次调用数据接口。

:::demo Base 
<<< @/docs/.vuepress/demo/search-form/Base.vue
:::

### 设置Form组件和搜索按钮的参数

组件会透传所有属性和事件给内部`Form`组件，并且代理了`Form`组件上的所有方法。

此例使用了`data.sync`来绑定数据。

:::demo more-props 此例设置了`Form`组件的size，label-width属性，还通过`buttonItemOptions`设置了搜索按钮的参数和其父级`FormItem`组件的属性。
<<< @/docs/.vuepress/demo/search-form/more-props.vue
:::

!!!include(search-form/index.zh-CN.md)!!!