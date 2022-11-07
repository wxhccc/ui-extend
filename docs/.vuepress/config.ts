import { defineUserConfig, defaultTheme, UserConfig } from 'vuepress'
import path from 'path'
import minimist from 'minimist'
import mdInclude from 'markdown-it-include'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import docsearchPlugin from '@vuepress/plugin-docsearch'
import containers from './utils/md-containers'
import { navbar, sidebar } from './theme-config'

const { p: port, d: dist = 'dist/antd-vue' } = minimist(process.argv.slice(2))

const lib = (port === 8081 || dist === 'dist/antd-vue') ? 'antd-vue' : 'element'

export default defineUserConfig({
  base: `/ui-extend/${lib}/`,
  port,
  title: 'ui-extend',
  dest: path.resolve(__dirname, `dist/${lib}`),
  cache: path.resolve(__dirname, `.cache/${lib}`),
  temp: path.resolve(__dirname, `.temp/${lib}`),
  theme: defaultTheme({
    sidebarDepth: 0,
    navbar: navbar(lib),
    sidebar: sidebar(lib),
    repo: 'wxhccc/ui-extend',
    editLink: false
  }),
  define: {
    __CURRENT_LIB__: lib
  },
  markdown: {
    importCode: {
      handleImportPath: (str) => str.replace(/^@demo/, path.resolve(__dirname, 'demo')).replace('$LIB_DIR', lib)
    }
  },
  extendsMarkdown: md => {
    md.use(mdInclude, {
      root: path.resolve(__dirname, `../../packages/${lib}/src/components/`),
      throwError: false
    })
  },
  plugins: [
    containers,
    docsearchPlugin({
      appId: 'Y1JKGCLRU1',
      apiKey: 'ecacc7ad727dac935636340f33435d7e',
      indexName: 'ui-extend'
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './demo')
    })
  ]
})
