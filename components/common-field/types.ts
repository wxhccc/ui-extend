import { DefineComponent, Slots, VNode } from 'vue'
import { FunctionalType } from '../utils/types'

export interface FieldOption<V = any, D extends UE.Option = UE.Option> {
  initValue?: V
  isNumber?: number
  data?: D[]
  props?: FunctionalType<Record<string, any>>
  component: string | DefineComponent
  childComponent?: string | DefineComponent
  dataItemRenader?: (item: D, index: number) => VNode
  // only for element-plus
  forbidValueFixed?: boolean
  slots?: Slots
}
