// watch the route change and refresh data
import { defineComponent } from 'vue'
import { cloneDeep } from 'lodash-es'

export default () => {
  let initData: any = null
  return defineComponent({
    watch: {
      $route: '_ue_refreshRoute'
    },
    methods: {
      $_mixin_initData(
        constData: Record<string, any>,
        dynamicData?: Record<string, any>
      ) {
        if (typeof constData !== 'object') return {}
        initData = constData
        return Object.assign({}, cloneDeep(initData), dynamicData)
      },
      _ue_resetVueData() {
        initData && Object.assign(this.$data, cloneDeep(initData))
      },
      _ue_refreshRoute() {
        this._ue_resetVueData()
        ;(this as any).initRouteState instanceof Function &&
          (this as any).initRouteState()
      }
    }
  })
}
