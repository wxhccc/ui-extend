## Cropper 图片裁剪

对传入图片进行裁剪，可生成新的文件用于展示或保存。

### 基础用法

本示例裁剪后将在新窗口打开裁剪后的图片

::: demo Base
@[code vue](@demo/cropper/Base.vue)
:::

### 带预览框的头像裁剪

::: demo view-avatar
@[code vue](@demo/cropper/view-avatar.vue)
:::

::: tip 说明
此组件是基于[cropperjs](https://www.npmjs.com/package/cropperjs)的封装，并预留了足够的接口让你可到达核心插件，关于插件的详细文档可参阅[docs](https://fengyuanchen.github.io/cropperjs/). 在此感谢原作者。
:::


!!!include(cropper/index.zh-CN.md)!!!