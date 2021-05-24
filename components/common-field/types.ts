import { DefineComponent, Slots, VNode } from 'vue'
import { AnyObject, FunctionalType } from '../utils/types'

export interface CommonFieldProps<V = any, D extends UE.Option = UE.Option> extends AnyObject {
  modelValue: V
  initValue?: V
  isNumber?: boolean
  data?: D[]
  props?: FunctionalType<Record<string, any>>
  component: string | DefineComponent
  childComponent?: string | DefineComponent
  dataItemRenader?: (item: D, index: number) => VNode
  // only for element-plus
  forbidValueFixed?: boolean
  slots?: Slots
}
