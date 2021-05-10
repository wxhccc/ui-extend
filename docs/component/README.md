---
title: 安装
sidebarDepth: 1
---

## 前置准备

本组件库是基于多个npm库封装的，并且这些npm库可能在你的项目里是本身就已经安装了或者您期望自行安装的。

基于这方面考虑，本组件库默认提供的是不包含这些第三方npm库的代码，同时以[Peer dependencies](https://docs.npmjs.com/files/package.json#peerdependencies)的形式将这些第三库列举出来。

如果你按需引入时需要使用特定组件，可按以下列表对应关系安装npm库。 

**ps: npm方式全局引入时都是必须安装的。cdn方式引入文件包含除element-ui均已包含**

| npm库      | 按需引入时是否必需 | 安装指令              | 相关组件      |
| :--------- | :----------------- | :-------------------- | :------------ |
| element-ui | 是                 | `npm i element-ui -S` | --            |
| lodash     | 是                 | `npm i lodash -S`     | --            |
| cropperjs  | 否                 | `npm i cropperjs -S`  | `Cropper`     |
| video.js   | 否                 | `npm i video.js -S`   | `VideoPlayer` |
| viewerjs   | 否                 | `npm i viewerjs -S`   | `Viewer`      |


## npm 安装

推荐使用 npm 的方式安装，它能更好地和[webpack](https://webpack.js.org)打包工具配合使用。

```
npm i @wxhccc/ui-extend -S
```

## CDN

可以通过推[unpkg.com/@wxhccc/ui-extend](https://unpkg.com/@wxhccc/ui-extend)获取到cdn资源，在页面上引入即可开始使用。

``` html
<!-- 必须先引入element-ui组件库 -->
<!-- 引入组件库 -->
<script src="https://unpkg.com/@wxhccc/ui-extend/lib/index.js"></script>
```

::: tip 友情提示
建议用cdn引入方式时在链接地址上锁定版本，以避免组件库升级时带来的兼容性方面的影响。锁定版本的方法见[unpkg.com](https://unpkg.com)
:::
