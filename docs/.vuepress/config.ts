
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
                'ticker.md'
              ]
            },
            {
              text: 'Form',
              isGroup: true,
              children: [
                'search-input.md',
                'tree-field.md',
                'form-btns.md',
                'common-field.md',
                'form-field-item.md',
                'form-fields.md',
                'remote-cascader.md'
              ]
            },
            {
              text: 'Data',
              isGroup: true,
              children: [
                'data-table.md',
                'info-table.md',
                'paged-list.md',
                'paged-table.md',
              ]
            },
            {
              text: 'Notice',
              isGroup: true,
              children: [
                'multi-alert.md'
              ]
            },
            {
              text: 'Plugins',
              isGroup: true,
              children: [
                'cropper.md',
                'viewer.md',
                'video-player.md'
              ]
            },
            {
              text: 'Higher',
              isGroup: true,
              children: [
                'waterfall-pane.md',
                'search-form.md',
                'common-list-page.md'
              ]
            }
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
        componentsDir: path.resolve(__dirname, 'components'),
        componentsPatterns: ['**/*.vue', '**/*.ts', '**/*.tsx']
      },
    ]
  ]
})