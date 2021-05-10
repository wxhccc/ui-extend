
import path from 'path'
import { defineUserConfig, DefaultThemeOptions } from 'vuepress'
import demoContainers from './utils/md-containers'
// import { updateVerFile, verNavCreator } from './utils/versions'
import mdInclude from 'markdown-it-include'


let base = '/ui-extend/'
// let dest = path.resolve(__dirname, 'dist')
let needPrefetch = true
// add version to base if build version docs
// if (process.env.PUB_VERSION) {
//   const version = process.env.PUB_VERSION
//   if (version.indexOf('.') > 0) {
//     const docVersion = version.split('.').slice(0, 2).join('.')
//     base = `/${docVersion}/`
//     needPrefetch = false
//     dest = path.resolve(__dirname, '../../version-docs/dist/', docVersion)
//     updateVerFile(docVersion, version)
//   }
// }

export default defineUserConfig<DefaultThemeOptions>({
  // base,
  title: 'ui-extend',
  lang: 'zh-CN',
  // dest,
  description: '',
  shouldPrefetch: false,
  themeConfig: {
    sidebarDepth: 0,
    navbar: [
      { text: '组件', link: '/component/' },
      { text: '文档', link: '/wiki/' },
      // verNavCreator()
    ],
    repo: 'wxhccc/ui-extend',
    sidebar: {
      '/component/': [
        {
          text: '开发指南',
          isGroup: true,
          children: ['README.md', 'quickstart.md']
        },
        {
          text: '组件',
          isGroup: true,
          children: [
            {
              text: 'Basic',
              isGroup: true,
              children: [
                'action-btns.md',
                'ticker.md',
                'drawer.md'
              ]
            },
            // {
            //   text: 'Form',
              
            //   children: [
            //     ['search-input', 'SearchInput 搜索输入框'],
            //     ['tree-field', 'TreeField 树表单域'],
            //     ['form-btns', 'FormBtns 表单操作按钮'],
            //     ['common-field', 'CommonField 通用表单域'],
            //     ['form-field-item', 'FormFieldItem 表单项'],
            //     ['form-fields', 'FormFields 表单项组'],
            //     ['remote-cascader', 'RemoteCascader 异步级联'],
            //   ]
            // },
            // {
            //   text: 'Data',
              
            //   children: [
            //     ['data-table', 'DataTable 数据表格'],
            //     ['info-table', 'InfoTable 信息表格'],
            //     ['paged-list', 'PagedList 分页列表'],
            //     ['paged-table', 'PagedTable 分页表格'],
            //   ]
            // },
            // {
            //   text: 'Notice',
              
            //   children: [
            //     ['multi-alert', 'MultiAlert 多模块警告'],
            //   ]
            // },
            // {
            //   text: 'Plugins',
              
            //   children: [
            //     ['cropper', 'Cropper 图片裁剪'],
            //     ['viewer', 'Viewer 图片查看器'],
            //     ['video-player', 'VideoPlayer 视频播放器']
            //   ]
            // },
            // {
            //   text: 'Higher',
              
            //   children: [
            //     ['waterfall-pane', 'WaterfallPane 瀑布流容器'],
            //     ['search-form', 'SearchForm 搜索表单'],
            //     ['common-list-page', 'CommonListPage 通用列表页模版'],
            //   ]
            // }
          ]
        }
      ],
      '/wiki/': [
        'mixins/README.md',
        'utils/README.md',
        'optionals/README.md',
        'data/README.md'
      ]
    },
    editLink: false
  },
  markdown: {
    importCode: {
      handleImportPath: (str) => str.replace(/^@demo/, path.resolve(__dirname, 'components/demo')),
    }
  },
  extendsMarkdown: (md) => {
    md.use(mdInclude, path.resolve(__dirname, '../../components/'));
    demoContainers(md)
  },
  bundler: '@vuepress/vite',
  bundlerConfig: {

  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, 'components')
      },
    ]
  ]
})