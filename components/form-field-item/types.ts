import { Slots, VNodeTypes } from 'vue'
import { ColProps } from '../ui-comps/row-col'
import { FormItemProps } from '../ui-comps/form-item'
import { FunctionalType, NamePath } from '../utils/types'
import { CommonFieldProps } from '../common-field'

export type TextType = boolean | string | ((value?: any, name?: NamePath) => VNodeTypes)

export interface FormFieldItemOption extends FormItemProps {
  props?: FunctionalType<FormItemProps>
  name?: NamePath
  prevNames?: NamePath[]
  text?: TextType
  slots?: Slots
  field?: CommonFieldProps
  children?: ChildFormFieldItemOption[]
}

export interface ChildFormFieldItemOption extends Omit<FormFieldItemOption, 'children'> {
  key?: string | number
  colProps?: FunctionalType<ColProps>
}
