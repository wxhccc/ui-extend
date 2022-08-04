import { DefineComponent, VNode } from 'vue'
import { UeColProps } from '@/ui-comps'
import { FormFieldItemOption } from '../form-field-item/types'

export interface InfoTableProps<D extends AnyObject = AnyObject, V extends AnyObject = AnyObject> {
  title?: string
  editBtn?: boolean
  column?: number | Partial<Record<string, number>>
  editMode?: 'alaways' | 'manual'
  data?: D
  modelValue?: V
  /** 单元格配置对象数组 */
  cells: CellItem[]
  /** 是否需要对空值进行填充，也可以使用函数自定义填充内容 */
  setEmptyCell?: boolean | ReturnHandler
  /** 是否带边框 */
  bordered?: boolean
  /** 单元格内容是否不换行 */
  valueNoWrap?: boolean
  /** label标签宽度 */
  labelWidth?: number | string
}

export type ReturnHandler<D extends AnyObject = AnyObject> = (
  val: any,
  data?: D,
  item?: CellItem
) => StrOrNum

export interface CellItem<D extends AnyObject = AnyObject> {
  /** 是否隐藏当前单元格 */
  hide?: boolean | ((data: D) => boolean)
  props?: Functional<UeColProps>
  key?: StrOrNum
  prop?: StrOrNum
  label?: boolean | string | ((cell: CellItem, data: D) => VNode)
  span?: UeColProps['span']
  icon?: string | DefineComponent
  value?: StrOrNum
  formatter?: ReturnHandler<D>
  canCopy?: boolean
  isImage?: boolean
  isSecret?: boolean
  link?: string
  canEdit?: boolean
  formItem?: FormFieldItemOption
  /** 当前单元格插槽名称 */
  slotName?: string
}
