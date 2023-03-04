## MediaContainer 媒体文件展示容器

用于在给定元素中以原比例展示图片或视频内容。适用于需要在图片上叠加可操作区域或可拖拽元素拖拽时保持比例。

::: tip 说明
媒体元素设置css属性object-fit也可以实现维持比例居中显示，但是拖拽时的影像会变形。
:::

### 基础用法

本示例裁剪后将在新窗口打开裁剪后的图片, 获取的数据可在控制台查看

::: demo base no-limit-lib
@[code](@demo/media-container/base.vue)
:::

### props和插槽的使用

::: demo props-and-slots
@[code](@demo/media-container/$LIB_DIR/props-and-slots.vue)
:::


!!!include(media-container/index.zh-CN.md)!!!