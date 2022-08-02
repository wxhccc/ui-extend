## VideoPlayer 视频播放器

简单的视频播放器，基于video.js的vue版本基础封装。后续会进行更精细得组件化。

### 基础用法

本示例裁剪后将在新窗口打开裁剪后的图片

::: demo Base
<<< @/docs/.vuepress/demo/video-player/Base.vue
:::

<!-- ### 使用视频指定帧作为预览图

::: demo frame-poster
<<< @/docs/.vuepress/demo/video-player/frame-poster.vue
::: -->

::: tip 说明
此组件是基于[video.js](https://www.npmjs.com/package/video.js)的封装，并预留了足够的接口让你可到达核心插件，关于插件的详细文档可参阅[docs](https://docs.videojs.com/). 在此感谢原作者。
:::


!!!include(video-player/index.zh-CN.md)!!!