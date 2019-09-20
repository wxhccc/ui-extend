import Mixin from './utils/base-mixin'
import 'element-ui/lib/theme-chalk/index.css'
import { version } from 'element-ui/package.json'

export default ({ Vue, options, siteData, isServer }) => {
  Vue.prototype.$ElemPromise = Promise.all([import('element-ui'), import('../../lib/index.docs')]).then(([Element, UiExtend]) => {
    Vue.use(Element.default)
    Vue.use(UiExtend.default)
    Vue.prototype.$ueVersion = UiExtend.version
    return true
  })
  Vue.prototype.$elVersion = version
  Vue.mixin(Mixin)
}