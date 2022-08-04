import { defineClientConfig } from '@vuepress/client'
import ElementPlus, { version } from 'element-plus'
import components from './components'
import UiExtend from '../../dist/index.mjs'
import '../../dist/style.css'

import 'element-plus/dist/index.css'

export default defineClientConfig({
  enhance: ({ app, siteData }) => {
    app.use(ElementPlus)
    components.forEach(item => app.component(item.name, item))
    app.use(UiExtend)
  }
})