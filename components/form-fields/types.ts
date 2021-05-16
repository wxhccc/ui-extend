import { AnyObject } from 'element-plus/lib/el-table/src/table.type'
import { DefineComponent } from 'vue'
import { FormFieldItemOption, NamePath } from '../form-field-item/types'
import { FunctionalType } from '../utils/types'

interface FieldsBaseOption {
  hide?: FunctionalType<boolean>
  key: string | number
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

export interface FormFieldsOption extends FormFieldItemOption, FieldsBaseOption {
  a: string
}

export type FormFieldsItem = CustomFieldsOption | FormFieldsOption
