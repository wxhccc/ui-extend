import { defineUserConfig, UserConfig } from 'vuepress'
import path from 'path'
import { defaultTheme } from '@vuepress/theme-default'
import mdInclude from 'markdown-it-include'
import containers from './utils/md-containers'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { updateVerFile, verNavCreator } from './utils/versions'

let base: UserConfig['base'] = '/ui-extend/'
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

export default defineUserConfig({
  base,
  title: 'ui-extend',
  dest,
  description: '',
  shouldPrefetch () {
    return needPrefetch
  },
  theme: defaultTheme({
    sidebarDepth: 0,
    navbar: [
      { text: '组件', link: '/component/' },
      { text: '文档', link: '/wiki/' },
      verNavCreator()
    ],
    sidebar: {
      '/component/': [
        {
          text: '开发指南',
          children: [
            { text: '安装' },
            { text: '快速上手', link: 'quickstart' }
          ]
        },
        {
          text: '组件',
          children: [
            {
              text: 'Basic',
              children: [
                { text: 'ActionBtns 操作按钮组', link: 'action-btns' },
                { text: 'Ticker 倒计时器', link: 'ticker' },
                { text: 'Loading 加载组件', link: 'loading' }
              ]
            },
            {
              text: 'Form',
              children: [
                { text: 'SearchInput 搜索输入框', link: 'search-input' },
                { text: 'TreeField 树表单域', link: 'tree-field' },
                { text: 'FormBtns 表单操作按钮', link: 'form-btns' },
                { text: 'CommonField 通用表单域', link: 'common-field' },
                { text: 'FormFieldItem 表单项', link: 'form-field-item' },
                { text: 'FormFields 表单项组', link: 'form-fields' },
                { text: 'RemoteCascader 异步级联', link: 'remote-cascader' }
              ]
            },
            {
              text: 'Data',
              children: [
                { text: 'DataTable 数据表格', link: 'data-table' },
                { text: 'InfoTable 信息表格', link: 'info-table' },
                { text: 'PagedList 分页列表', link: 'paged-list' },
                { text: 'PagedTable 分页表格', link: 'paged-table' }
              ]
            },
            {
              text: 'Notice',
              children: [
                { text: 'MultiAlert 多模块警告', link: 'multi-alert' }
              ]
            },
            {
              text: 'Plugins',
              children: [
                { text: 'Cropper 图片裁剪', link: 'cropper' },
                { text: 'VideoPlayer 视频播放器', link: 'video-player' }
              ]
            },
            {
              text: 'Higher',
              children: [
                { text: 'ScrollPane 瀑布流容器', link: 'scroll-pane' },
                { text: 'SearchForm 搜索表单', link: 'search-form' },
                { text: 'CommonListPage 通用列表页模版', link: 'common-list-page' },
              ]
            }
          ]
        }
      ],
      '/wiki/': [
        { text: 'Utils', link: '/wiki/utils/' },
        { text: 'Optionals', link: '/wiki/optionals/' },
        { text: '数据结构', link: '/wiki/data/' }
      ],
      '/': [
        ''
      ]
    },
    repo: 'wxhccc/ui-extend'
  }),
  extendsMarkdown: md => {
    md.use(mdInclude, path.resolve(__dirname, '../../src/components/'))
  },
  plugins: [
    containers,
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './demo')
    })
  ]
})
