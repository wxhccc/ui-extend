import { FormFieldItemOption } from 'components/form-field-item/types'
import { VNode } from 'vue'
import { ColProps } from '../ui-comps/row-col'
import { AnyObject, FunctionalType, StrOrNum } from '../utils/types'

export interface InfoTableProps<D extends AnyObject = AnyObject> {
  isEdit: boolean
  data: D
  formDataHandler: (formData: D) => AnyObject
  modelValue: D
  cells: Cell[]
  extraData: AnyObject
  setEmptyCell: boolean | ReturnHandler
}

type AllData = InfoTableProps['data'] & InfoTableProps['extraData']

export type ReturnHandler = (value?: any, mixData?: AllData) => StrOrNum

export interface Cell {
  hide?: FunctionalType<boolean>
  props?: FunctionalType<ColProps>
  key?: StrOrNum
  name: StrOrNum
  label?: boolean | string | ((cell: Cell, mixData: AllData) => VNode)
  icon?: string
  value?: StrOrNum
  formatter?: ReturnHandler
  fieldProps?: FormFieldItemOption
  canEdit?: boolean
}
