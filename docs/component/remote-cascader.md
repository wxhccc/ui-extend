## RemoteCascader 异步级联选择器

基于Cascader组件的动态加载封装的表单域组件。简化异步请求逻辑，支持数据回填。

### 基础用法

:::demo Base
<<< @/docs/.vuepress/components/demo/remote-cascader/Base.vue
:::

### 数据回填

采用数据传入方式的组件回填时不会禁用组件，而resolve方式的为了避免回填时影响操作产生的数据将会暂时禁用组件

:::demo set-values
<<< @/docs/.vuepress/components/demo/remote-cascader/set-values.vue
:::

::: tip 提示
组件会透传Cascader组件支持的绝大部分属性和事件绑定以及插槽，但关于动态加载部分的可能无法覆盖。

Tree组件文档参照 <element-link component="Tree"></element-link>
:::

::: warning 警告
Element库2.8和2.9版本的Cascader组件Api不一致。2.9版本的需要设置本组件的`is-resolve`，且回填体验不佳。
:::


!!!include(remote-cascader/index.zh-CN.md)!!!