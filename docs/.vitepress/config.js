const path = require('path')
const containers = require('./utils/md-containers')
const { updateVerFile, verNavCreator } = require('./utils/versions')
const mdInclude = require('markdown-it-include')
let base = '/ui-extend/'
let dest = path.resolve(__dirname, 'dist')
let needPrefetch = true
// add version to base if build version docs
if (process.env.PUB_VERSION) {
  const version = process.env.PUB_VERSION
  if (version.indexOf('.') > 0) {
    const docVersion = version.split('.').slice(0, 2).join('.')
    base = `/${docVersion}/`
    needPrefetch = false
    dest = path.resolve(__dirname, '../../version-docs/dist/', docVersion)
    updateVerFile(docVersion, version)
  }
}

module.exports = {
  base,
  title: 'ui-extend',
  // dest,
  description: '',
  shouldPrefetch () {
    return needPrefetch
  },
  themeConfig: {
    sidebarDepth: 0,
    nav: [
      { text: '组件', link: '/component/' },
      { text: '文档', link: '/wiki/' },
      verNavCreator()
    ],
    sidebar: {
      '/component/': [
        {
          title: '开发指南',
          collapsable: false,
          children: [
            ['', '安装'],
            ['quickstart', '快速上手']
          ]
        },
        {
          title: '组件',
          collapsable: false,
          children: [
            {
              title: 'Basic',
              collapsable: false,
              children: [
                ['action-btns', 'ActionBtns 操作按钮组'],
                ['ticker', 'Ticker 倒计时器'],
                ['loading', 'Loading 加载组件'],
                ['drawer', 'Drawer 抽屉']
              ]
            },
            {
              title: 'Form',
              collapsable: false,
              children: [
                ['search-input', 'SearchInput 搜索输入框'],
                ['tree-field', 'TreeField 树表单域'],
                ['form-btns', 'FormBtns 表单操作按钮'],
                ['common-field', 'CommonField 通用表单域'],
                ['form-field-item', 'FormFieldItem 表单项'],
                ['form-fields', 'FormFields 表单项组'],
                ['remote-cascader', 'RemoteCascader 异步级联'],
              ]
            },
            {
              title: 'Data',
              collapsable: false,
              children: [
                ['data-table', 'DataTable 数据表格'],
                ['info-table', 'InfoTable 信息表格'],
                ['paged-list', 'PagedList 分页列表'],
                ['paged-table', 'PagedTable 分页表格'],
              ]
            },
            {
              title: 'Notice',
              collapsable: false,
              children: [
                ['multi-alert', 'MultiAlert 多模块警告'],
              ]
            },
            {
              title: 'Plugins',
              collapsable: false,
              children: [
                ['cropper', 'Cropper 图片裁剪'],
                ['viewer', 'Viewer 图片查看器'],
                ['video-player', 'VideoPlayer 视频播放器']
              ]
            },
            {
              title: 'Higher',
              collapsable: false,
              children: [
                ['waterfall-pane', 'WaterfallPane 瀑布流容器'],
                ['search-form', 'SearchForm 搜索表单'],
                ['common-list-page', 'CommonListPage 通用列表页模版'],
              ]
            }
          ]
        }
      ],
      '/wiki/': [
        {
          title: 'Mixins',
          collapsable: false,
          children: [
            ['mixins/', '基础混入']
          ]
        },
        ['utils/', 'Utils'],
        ['optionals/', 'Optionals'],
        ['data/', '数据结构']
      ],
      '/': [
        ''
      ]
    },
    repo: 'wxhccc/ui-extend'
  },
  evergreen: true,
  // markdown: {
  //   extendMarkdown: md => {
  //     md.use(mdInclude, path.resolve(__dirname, '../../components/'));
  //     containers(md);
  //   }
  // }
}