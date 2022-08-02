import { DefineComponent } from 'vue'
import { FormFieldItemOption, NamePath } from '../form-field-item/types'

interface FieldsBaseOption {
  hide?: Functional<boolean>
  key?: string | number
  dependencies?: string
  cascadeHandler?: <I>(value: any, name?: NamePath, modelData?: AnyObject[], item?: I) => void
  cascadeData?: Record<string, Option[]>
  clearValue?: boolean | string | number
  spliceStart?: number
}
export interface CustomFieldsOption
  extends Pick<FormFieldItemOption, 'props' | 'name' | 'prevNames'>,
    FieldsBaseOption {
  component?: string | DefineComponent
  slotName?: string
}

export type FormFieldsOption = FormFieldItemOption & FieldsBaseOption

export type FormFieldsItem = CustomFieldsOption | FormFieldsOption

export interface FormFieldsProps {
  modelValue?: AnyObject
  items: FormFieldsItem[]
  delayUpdate?: boolean
}
