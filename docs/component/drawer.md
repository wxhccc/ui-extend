## Drawer 抽屉

从屏幕边缘划出的弹框面板

### 基础用法

::: demo Base 点击触发按钮后从右侧滑出，点击遮罩区或关闭按钮可关闭
<<< @/docs/.vuepress/components/demo/drawer/Base.vue
:::

### 自定义弹出位置

::: demo Placement 
<<< @/docs/.vuepress/components/demo/drawer/Placement.vue
:::

### 抽屉表单

::: demo Form 可通过`body-size`属性修改抽屉容器的宽度/高度
<<< @/docs/.vuepress/components/demo/drawer/Form.vue
:::

### 作为普通组件渲染

`container`为falsy值时，组件会作为普通组件被渲染，这时抽屉打开时会使用绝对定位，相对于父级中第一个使用了定位属性的容器定位。适合不想要全屏覆盖的场景。

::: demo Absolute
<<< @/docs/.vuepress/components/demo/drawer/Absolute.vue
:::

!!!include(drawer/index.zh-CN.md)!!!