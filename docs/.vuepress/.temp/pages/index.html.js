export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"description\":\"常用UI库的扩展库\",\"actionText\":\"快速上手 ->\",\"actionLink\":\"/component/\",\"features\":[{\"title\":\"组件组合\",\"details\":\"基于主流MVVM框架UI库的基础组件的组合封装，提取通用业务组件。\"},{\"title\":\"数据驱动\",\"details\":\"对于常用组件，例如Table，FormItem。提供数据驱动方式，减少重复书写组件模版代码。\"},{\"title\":\"通用且允许差异\",\"details\":\"统一化不同UI库组件公用API，来提供统一的使用方式。但保留各组件的非公用API\"}],\"footer\":\"MIT Licensed\"},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1568624224000,\"contributors\":[{\"name\":\"wxhccc\",\"email\":\"wxhccche@sina.com\",\"commits\":1}]},\"filePathRelative\":\"README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
