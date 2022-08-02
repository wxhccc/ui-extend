export const data = {
  "key": "v-15814726",
  "path": "/wiki/",
  "title": "",
  "lang": "zh-CN",
  "frontmatter": {
    "sidebarDepth": 1
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "文档说明",
      "slug": "文档说明",
      "children": []
    }
  ],
  "filePathRelative": "wiki/README.md",
  "git": {
    "updatedTime": 1620607200000,
    "contributors": [
      {
        "name": "wxhccc",
        "email": "wxhccche@163.com",
        "commits": 2
      },
      {
        "name": "wxhccc",
        "email": "wxhccche@sina.com",
        "commits": 1
      }
    ]
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
