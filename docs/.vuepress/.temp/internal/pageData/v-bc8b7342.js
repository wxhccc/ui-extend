export const data = {
  "key": "v-bc8b7342",
  "path": "/wiki/data/",
  "title": "",
  "lang": "zh-CN",
  "frontmatter": {
    "sidebarDepth": 3
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "数据结构",
      "slug": "数据结构",
      "children": [
        {
          "level": 3,
          "title": "数据级联",
          "slug": "数据级联",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "wiki/data/README.md",
  "git": {
    "updatedTime": 1568624224000,
    "contributors": [
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
