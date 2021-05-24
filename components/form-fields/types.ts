import { DefineComponent } from 'vue'
import { FormFieldItemOption } from '../form-field-item/types'
import { AnyObject, FunctionalType, NamePath } from '../utils/types'

interface FieldsBaseOption {
  hide?: FunctionalType<boolean>
  key?: string | number
  dependencies?: string
  cascadeHandler?: <I>(value: any, name?: NamePath, modelData?: AnyObject[], item?: I) => void
  cascadeData?: Record<string, UE.Option[]>
  clearValue?: boolean | string | number
  spliceStart?: number
}
export interface CustomFieldsOption
  extends Pick<FormFieldItemOption, 'props' | 'name' | 'prevNames'>,
    FieldsBaseOption {
  component?: string | DefineComponent
}

export type FormFieldsOption = FormFieldItemOption & FieldsBaseOption

export type FormFieldsItem = CustomFieldsOption | FormFieldsOption
