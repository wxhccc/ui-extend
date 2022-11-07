---
sidebarDepth: 1
---

## 前置准备

本组件库依赖多个npm库，并且这些npm库可能在你的项目里是本身就已经安装了或者推荐用户期望自行安装的。

基于这方面考虑，本组件库默认提供的是不包含这些第三方npm库的代码，同时以[Peer dependencies](https://docs.npmjs.com/files/package.json#peerdependencies)的形式将这些第三库列举出来。

如果你按需引入时需要使用特定组件，可按以下列表对应关系安装npm库。 

**ps: npm方式全局引入时都是必须安装的。cdn方式引入文件包含除element-ui均已包含**

| npm库            | 按需引入时是否必需 | 相关组件      |
| :--------------- | :----------------- | :------------ |
| {{ UI_LIB }}     | 是                 | --            |
| lodash/lodash-es | 是                 | --            |
| cropperjs        | 否                 | `Cropper`     |
| video.js         | 否                 | `VideoPlayer` |


## 安装

推荐使用 npm 的方式安装，它能更好地和webpack/vite等打包工具配合使用。


<CodeGroup>
  <CodeGroupItem title="YARN" active>
<libs-content>
  <template #antd-vue>

```bash
yarn add @wxhccc/ue-antd-vue
```

  </template>
  <template #element>

```bash
yarn add @wxhccc/ue-element
```

  </template>
</libs-content>

  </CodeGroupItem>
  <CodeGroupItem title="NPM" >

<libs-content>
  <template #antd-vue>

```bash
npm i @wxhccc/ue-antd-vue
```

  </template>
  <template #element>

```bash
npm i @wxhccc/ue-element
```

  </template>
</libs-content>

  </CodeGroupItem>
</CodeGroup>

