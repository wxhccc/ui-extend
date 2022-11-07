import { defineClientConfig } from '@vuepress/client'
import ElementPlus from 'element-plus'
import Antd from 'ant-design-vue'
import UiExtendElement from '@wxhccc/ue-element'
import UiExtendAntdVue from '@wxhccc/ue-antd-vue'
import components from './components'

import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.css'

export default defineClientConfig({
  enhance: async ({ app, siteData }) => {
    app.use(ElementPlus)
    app.use(Antd)
    if (__CURRENT_LIB__ === 'antd-vue') {
      app.use(UiExtendAntdVue)
      await import('@wxhccc/ue-antd-vue/dist/style.css')
    } else if (__CURRENT_LIB__ === 'element') {
      app.use(UiExtendElement)
      await import('@wxhccc/ue-element/dist/style.css')
    }
    app.config.globalProperties.CUR_LIB_NAME = `@wxhccc/ue-${__CURRENT_LIB__}`
    app.config.globalProperties.UI_LIB = __CURRENT_LIB__ === 'antd-vue' ? 'ant-design-vue' : 'element-plus'
    components.forEach(item => app.component(item.name, item))
  }
})