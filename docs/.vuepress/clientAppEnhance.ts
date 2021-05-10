import { defineClientAppEnhance } from '@vuepress/client'
import Antd from 'ant-design-vue'
import UiExtend from '../../es'
import Mixin from './utils/base-mixin'
import 'ant-design-vue/dist/antd.css'


export default defineClientAppEnhance(({ app, siteData }) => {
  console.log(app)
  app.use(Antd)
  app.use(UiExtend)
  app.mixin(Mixin)
  app.config.globalProperties.$uiVersion = UiExtend.version
  // app.config.globalProperties.$uiVersion = version
})