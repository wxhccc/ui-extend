import DefaultTheme from 'vitepress/theme'
// import Antd from 'ant-design-vue'
// import UiExtend from '../../../lib/index.docs'
// import Mixin from '../utils/base-mixin'
// import 'ant-design-vue/dist/antd.css'
console.log(Antd)

export default {
  ...DefaultTheme,
  enhanceApp({ app, siteData, isServer }) {
    import('ant-design-vue').then(data => {
      console.log(data)
    })
    // app.use(Antd)
    // app.use(UiExtend)
    // Vue.prototype.$ueVersion = UiExtend.version
    // Vue.prototype.$elVersion = version
    // app.mixin(Mixin)
  }
}