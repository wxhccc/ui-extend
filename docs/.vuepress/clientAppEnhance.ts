import { defineClientAppEnhance } from '@vuepress/client'
import ElementUI from 'element-plus'
import UiExtend from '../../es'
import '../../es/index.css'
import 'element-plus/lib/theme-chalk/index.css'

export default defineClientAppEnhance(({ app, siteData }) => {
  app.use(ElementUI as any)
  app.use(UiExtend)
  app.config.globalProperties.$ueVersion = UiExtend.version
  app.config.globalProperties.$uiVersion = ElementUI.version
})
