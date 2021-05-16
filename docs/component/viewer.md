## Viewer 图片查看器

对通过数据或者插槽传入的图片进行查看，支持缩略图渲染，图片选中，全屏查看等。

### 基础用法

::: demo Base
@[code vue](@demo/viewer/Base.vue)
:::

### 非inline模式且使用插槽

::: demo uninline-viewer
@[code vue](@demo/viewer/uninline-viewer.vue)
:::

### 动态修改配置

::: demo modify-props
@[code vue](@demo/viewer/modify-props.vue)
:::

::: tip 说明
此组件是基于[viewerjs](https://www.npmjs.com/package/viewerjs)的封装，并预留了足够的接口让你可到达核心插件，关于插件的详细文档可参阅[docs](https://fengyuanchen.github.io/viewerjs/). 在此感谢原作者。
:::


!!!include(viewer/index.zh-CN.md)!!!