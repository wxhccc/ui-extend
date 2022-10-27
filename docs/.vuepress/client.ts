import { defineClientConfig } from '@vuepress/client'
import ElementPlus from 'element-plus'
import Antd from 'ant-design-vue'
import components from './components'
import UiExtendElement from '@wxhccc/ue-element'
import UiExtendAntdVue from '@wxhccc/ue-antd-vue'
import '@wxhccc/ue-element/dist/style.css'
import '@wxhccc/ue-antd-vue/dist/style.css'

import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.css'

export default defineClientConfig({
  enhance: ({ app, siteData }) => {
    app.use(ElementPlus)
    app.use(Antd)
    if (__CURRENT_LIB__ === 'antd-vue') {
      app.use(UiExtendAntdVue)
    } else if (__CURRENT_LIB__ === 'element') {
      app.use(UiExtendElement)
    }
    components.forEach(item => app.component(item.name, item))
  }
})