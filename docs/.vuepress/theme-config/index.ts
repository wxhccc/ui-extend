import { NavbarConfig, SidebarConfig } from 'vuepress'
import { verNavCreator } from '../utils/versions'

export const navbar = (lib: 'antd-vue' | 'element'): NavbarConfig => {
  const [curLib, otherLib] = lib === 'antd-vue' ? ['ant-design-vue', 'element-plus'] : ['element-plus', 'ant-design-vue']
  return [
    {
      text: curLib,
      children: [
        {
          text: otherLib,
          target: '__blank',
          link: `https://wxhccc.github.io/ui-extend/${lib === 'antd-vue' ? 'element' : 'antd-vue'}/`
        }
      ]
    },
    { text: '组件', link: '/component/' },
    { text: '文档', link: '/wiki/' },
    verNavCreator()
  ]
}

export const sidebar = (lib: 'antd-vue' | 'element'): SidebarConfig => ({
  '/component/': [
    {
      text: '开发指南',
      children: [
        { text: '安装', link: './' },
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
            { text: 'Loading 加载组件', link: 'loading' },
            { text: 'CopyClipboard 复制板', link: 'copy-clipboard' },
            { text: 'MediaContainer 多媒体容器', link: 'media-container' },
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
            ...(lib === 'element' ? [{ text: 'DataTable 数据表格', link: 'data-table' }] : []),
            { text: 'InfoTable 信息表格', link: 'info-table' },
            { text: 'TreeTransfer 树型穿梭框', link: 'tree-transfer' },
            { text: 'PagedList 分页列表', link: 'paged-list' },
            { text: 'PagedTable 分页表格', link: 'paged-table' }
          ]
        },
        {
          text: 'Notice',
          children: [{ text: 'MultiAlert 多模块警告', link: 'multi-alert' }]
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
            { text: 'CommonListPage 通用列表页模版', link: 'common-list-page' }
          ]
        }
      ]
    }
  ],
  '/wiki/': [
    { text: 'Utils', link: 'utils' },
    { text: 'Optionals', link: 'optionals' },
    { text: '数据结构', link: 'data' }
  ],
  '/': ['']
})
