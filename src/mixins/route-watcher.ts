// watch the route change and refresh data
import { cloneDeep } from '../utils/lodash';

export default function () {
  let initData = null
  return {
    watch: {
      '$route': '_ue_refreshRoute'
    },
    methods: {
      $_mixin_initData (constData, dynamicData) {
        if (typeof constData !== 'object') return {};
        initData = constData;
        return Object.assign({}, cloneDeep(initData), dynamicData);
      },
      _ue_resetVueData () {
        initData && Object.assign(this.$data, cloneDeep(initData));
      },
      _ue_refreshRoute (to, from) {
        this._ue_resetVueData();
        typeof this.initRouteState === 'function' && this.initRouteState();
      }
    }
  }
}
