import { defineClientAppEnhance } from '@vuepress/client'
// import Antd from 'ant-design-vue'
// import UiExtend from '../../../lib/index.docs'
// import Mixin from '../utils/base-mixin'
// import 'ant-design-vue/dist/antd.css'


export default defineClientAppEnhance(({ app, siteData }) => {
  // import('ant-design-vue').then(data => {
  //   console.log(data)
  // })
  console.log(app)
  // app.use(Antd)
  // app.use(UiExtend)
  // Vue.prototype.$ueVersion = UiExtend.version
  // Vue.prototype.$elVersion = version
  // app.mixin(Mixin)
})