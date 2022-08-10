## MultiAlert 多模块警告

Alert组件扩展，以支持组件内多组信息的显示。

### 基础用法

::: demo Base
@[code](../.vuepress/demo/multi-alert/Base.vue)
:::

### 透传属性和事件绑定给原始组件
::: warning 警告
请勿透传title和description属性
:::

::: demo alert-props 显示图标属性虽然能生效，但不太适合多模块场景
@[code](../.vuepress/demo/multi-alert/alert-props.vue)
:::

::: tip 提示
Alert组件文档参照 <ui-lib-link component="Alert"></ui-lib-link>
:::


!!!include(multi-alert/index.zh-CN.md)!!!