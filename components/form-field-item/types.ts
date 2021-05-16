import { Slots, VNodeTypes } from 'vue'
import { ColProps } from '../ui-comps/row-col'
import { FormItemProps } from '../ui-comps/form-item'
import { FunctionalType } from '../utils/types'
import { FieldOption } from '../common-field'

export type NamePath = string | number
export type TextType = boolean | string | ((value?: any, name?: NamePath) => VNodeTypes)

export interface FormFieldItemOption {
  props?: FunctionalType<FormItemProps>
  name?: NamePath
  prevNames?: NamePath[]
  text?: TextType
  slots?: Slots
  field?: FieldOption
  children?: ChildFormFieldItemOption[]
}

export interface ChildFormFieldItemOption extends Omit<FormFieldItemOption, 'children'> {
  key?: string | number
  colProps?: FunctionalType<ColProps>
}
