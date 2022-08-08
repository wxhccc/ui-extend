import { defineUserConfig, UserConfig } from 'vuepress'
import path from 'path'
import { defaultTheme } from '@vuepress/theme-default'
import mdInclude from 'markdown-it-include'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import containers from './utils/md-containers'
import { updateVerFile } from './utils/versions'
import { navbar, sidebar } from './theme-config'

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
    navbar: navbar(),
    sidebar: sidebar(),
    repo: 'wxhccc/ui-extend'
  }),
  extendsMarkdown: md => {
    md.use(mdInclude, path.resolve(__dirname, '../../src/components/'))
  },
  plugins: [
    containers,
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './demo')
    }),
    docsearchPlugin({
      appId: '',
      apiKey: '',
      indexName: ''
    })
  ]
})
