import { Slot } from 'vue'
import { Functional, StrOrNum } from '@wxhccc/ue-shared'
import { ActionBtnItem } from '@/components/action-btns/type'
import { UeTableColumnProps } from '@/ui-comps'

export interface DataTableColumn<T = any> extends UeTableColumnProps<T> {
  key?: StrOrNum
  /** 是否隐藏（不渲染）当前列，可以为boolean类型值，也可以用函数动态控制。 */
  hide?: Functional<boolean>
  /** 操作按钮数组，设置此值时会使用内部操作按钮组件按钮。操作按钮采用ActionBtns组件生成 */
  action?: ActionBtnItem[]
  /** 是否使用单(多)选择列，设置此值时会使用内部组件选择列（而非Table自带选择列）。使用`v-mode:selectionValue`来同步数据。  */
  selection?: 'radio' | 'checkbox'
  /** 是否不使用作用域插槽，即使设置了`scopeSlot`。可用于在文本和作用域插槽间切换 */
  notUseRender?: boolean
  slots?: {
    default?: Slot
    header?: Slot
  }
}

export interface DataTableProps {
  /** 列配置项(column)的数组，具体参数见[column] */
  columns?: DataTableColumn[]
  /** 是否需要将空单元格设置成'--',也可以传入函数来自己决定怎么处理空单元格。<br/>第一个参数为cellValue/formatter(如果设置了)处理结果，余下的和TableColumn组件的`formatter`一致 */
  setEmptyCell?: boolean | ((result: any) => string)
  /** 行数据的Key，指定选择组件绑定值。也可以使用函数。功能和`Table`组件的`row-key`类似，缺省时会尝试使用`row-key`的值。 */
  selectionKey?: string | ((row: any) => string)
  /** 多（单）选择列的同步值，支持v-model。多选时必须为数组 */
  selectionValue?: StrOrNum | StrOrNum[]
}

export const exposeMethods = [
  'clearSelection',
  'getSelectionRows',
  'toggleRowSelection',
  'toggleAllSelection',
  'toggleRowExpansion',
  'setCurrentRow',
  'clearSort',
  'clearFilter',
  'doLayout',
  'sort',
  'scrollTo',
  'setScrollTop',
  'setScrollLeft'
]