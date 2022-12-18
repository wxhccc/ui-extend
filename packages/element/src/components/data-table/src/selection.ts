import { defineComponent, computed, h, inject } from 'vue'
import { AnyFunction, StrOrNum, vueTypeProp } from '@wxhccc/ue-shared'
import { UeRadio, UeRadioProps } from '@/ui-comps'
import { DataTableColumn } from '../types'

export default defineComponent({
  props: {
    column: vueTypeProp<DataTableColumn>(Object),
    scope: vueTypeProp<{ row: any; $index: number }>(Object),
    data: vueTypeProp<any>(null)
  },
  setup(props) {
    const selectionValue = computed(() => (props.data ? props.data.selectionValue : ''))

    const row = computed(() => props.scope.row)

    const getSelectItemValue = inject('getSelectItemValue') as AnyFunction<StrOrNum>
    const handleRadioChange = inject('handleRadioChange') as AnyFunction

    const selectValue = computed(() => getSelectItemValue(row.value))

    const handleBindProps = computed(() => {
      const { selectable } = props.column as any
      const disabled = typeof selectable === 'function' && !selectable(row, props.scope.$index)
      return {
        key: selectValue,
        disabled,
        label: selectValue.value,
        modelValue: selectionValue.value,
        'onUpdate:modelValue': handleRadioChange
      } as Partial<UeRadioProps>
    })

    return () => h(UeRadio, handleBindProps.value, { default: () => h('span') })
  }
})