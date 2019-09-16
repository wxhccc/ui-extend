import Mixin from './utils/base-mixin'
import 'element-ui/lib/theme-chalk/index.css'
import { version } from 'element-ui/package.json'

export default ({ Vue, options, siteData, isServer }) => {
  if (!isServer) {
    Promise.all([import('element-ui'), import('../../lib/index.docs')]).then(([Element, UiExtend]) => {
      Vue.use(Element)
      Vue.use(UiExtend)
      Vue.prototype.$ueVersion = UiExtend.version
    })
  }
  Vue.prototype.$elVersion = version
  Vue.mixin(Mixin)
}