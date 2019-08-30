import { version } from '../../package.json'
// import UiExtends from '../../lib/index.common'
import Mixin from './utils/base-mixin'
import 'element-ui/lib/theme-chalk/index.css'

export default ({ Vue, options, siteData, isServer }) => {
  if (!isServer) {
    Promise.all([import('element-ui'), import('../../lib/index.common')]).then(([Element, UiExtends]) => {
      console.log(Element, UiExtends)
      Vue.use(Element.default)
      Vue.use(UiExtends.default)
      Vue.prototype.$ueVersion = version
      Vue.prototype.$elVersion = Element.version
      Vue.mixin(Mixin)
    })
  }
}