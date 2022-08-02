export const data = {
  "key": "v-05cab828",
  "path": "/README%20copy.html",
  "title": "",
  "lang": "zh-CN",
  "frontmatter": {
    "home": true,
    "lang": "zh-CN",
    "description": "常用UI库的扩展库",
    "actionText": "快速上手 ->",
    "actionLink": "/component/",
    "features": [
      {
        "title": "组件组合",
        "details": "基于主流MVVM框架UI库的基础组件的组合封装，提取通用业务组件。"
      },
      {
        "title": "数据驱动",
        "details": "对于常用组件，例如Table，FormItem。提供数据驱动方式，减少重复书写组件模版代码。"
      },
      {
        "title": "通用且允许差异",
        "details": "统一化不同UI库组件公用API，来提供统一的使用方式。但保留各组件的非公用API"
      }
    ],
    "footer": "MIT Licensed"
  },
  "excerpt": "",
  "headers": [],
  "filePathRelative": "README copy.md",
  "git": {
    "updatedTime": null,
    "contributors": []
  }
}

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
