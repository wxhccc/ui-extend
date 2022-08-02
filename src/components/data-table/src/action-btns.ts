import { defineComponent, h } from 'vue'
import ActionBtns from '@/components/action-btns'
import { vueTypeProp } from '@/utils/component'
import { DataTableColumn } from '../types'

export default defineComponent({
  props: {
    column: vueTypeProp<DataTableColumn>(Object),
    scope: vueTypeProp<{ row: any }>(Object)
  },
  setup(props) {
    return () => {
      const {
        column: { action },
        scope
      } = props
      return h(ActionBtns, {
        props: {
          btns: action,
          loadingFlags: scope.row,
          data: scope.row,
          extraArgs: [scope]
        }
      })
    }
  }
})
