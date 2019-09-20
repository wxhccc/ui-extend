import Mixin from './utils/base-mixin'
import 'element-ui/lib/theme-chalk/index.css'
import { version } from 'element-ui/package.json'

export default ({ Vue, options, siteData, isServer }) => {
  Promise.all([import('element-ui'), import('../../lib/index.docs')]).then(([Element, UiExtends]) => {
    Vue.use(Element)
    Vue.use(UiExtends)
    Vue.prototype.$ueVersion = UiExtends.version
  })
  Vue.prototype.$elVersion = version
  Vue.mixin(Mixin)
}