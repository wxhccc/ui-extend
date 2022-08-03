## Loading 加载组件

加载组件，渲染时会在父组件内生成一个显示加载中状态的遮层，也可选择生成全屏遮层。

::: tip 说明
目前组件是Element的Loading指令的服务封装，支持服务的大部分配置项。Loading文档参照 <element-link component="Loading"></element-link>

封装的目的是本项目后期多UI库的兼容。用户项目内建议遵循对应UI库文档
:::

### 基础用法

:::demo Base
@[code](../.vuepress/demo/loading/Base.vue)
:::

### 更多样的配置

可以自定义加载文案，图标和背景色，也可以控制是否全屏

:::demo props-control
@[code](../.vuepress/demo/loading/props-control.vue)
:::

### Attributes

| 参数       | 类型    | 说明                               | 可选值 | 默认值 |
| :--------- | :------ | :--------------------------------- | :----- | :----- |
| body       | boolean | 是否将遮层添加到body               | --     | false  |
| lock       | boolean | `body`为true时，是否锁住body的滚动 | --     | --     |
| text       | string  | 显示在加载图标下方的加载文案       | --     | --     |
| spinner    | string  | 自定义加载图标类名                 | --     | --     |
| background | string  | 遮层背景色                         | --     | --     |

