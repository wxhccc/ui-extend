import { PagedCommonProps } from '@/utils/paged-utils'
import { TbColumnProps, UeTableProps } from '@/ui-comps'
import { ActionBtnItem } from '../action-btns/type'

export interface SortConfig {
  orderby?: string
  order?: string
}

export interface TableCellRow<D extends AnyObject = AnyObject> {
  value: any
  text: any
  column: TbColumnProps<D>
  record: D
  index: number
}

export interface PagedTableProps<D extends AnyObject = any> extends PagedCommonProps<D> {
  rowKey?: UeTableProps['rowKey']
  columns: PagedTbColumnProps<D>[]
  // 可选列绑定值，rowKey对应值的数组
  selectionValue?: StrOrNum[]
  // 是否开始自动宽度，默认开启，支持最小宽度和最大宽度设置
  autoWidth?: boolean
  // 列的默认最小宽度，默认值为100
  minColumnWidth?: number
}
export interface PagedTbColumnProps<T = any> extends TbColumnProps<T> {
  id?: string | number
  /** 最小宽度 */
  minWidth?: number
  /** 最大宽度 */
  maxWidth?: number
  actions?: ActionBtnItem[]
}


