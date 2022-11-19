import { DefineComponent, VNode } from 'vue'
import { AnyObject, Functional, StrOrNum } from '@wxhccc/ue-shared'
import { UeColProps } from '@/ui-comps'
import { FormFieldItemOption } from '@/components/form-field-item/types'

export interface InfoTableProps<D extends AnyObject = AnyObject, V extends AnyObject = AnyObject> {
  title?: string
  editBtn?: boolean
  column?: number | Partial<Record<string, number>>
  /** 编辑模式，alaways：可直接编辑，manual：需要手动切换编辑状态 */
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
  /** Col组件的props，或者返回props的函数 */
  props?: Functional<UeColProps>
  key?: StrOrNum
  /** 单元格对应数据的property */
  prop?: StrOrNum
  /** 单元格的label，可也用函数返回虚拟dom， 为false不生成label容器 */
  label?: boolean | string | ((cell: CellItem, data: D) => VNode)
  span?: UeColProps['span']
  /** label内的图标组件，或者已注册的组件名称字符串 */
  icon?: string | DefineComponent
  /** 单元格内容区的指定值，如果指定则不使用数据值 */
  value?: StrOrNum
  /** 单元格内容格式化函数 */
  formatter?: ReturnHandler<D>
  /** 单元格内容是否显示复制功能 */
  canCopy?: boolean
  /** 单元格内容是否是图片，会使用最终数据作为src */
  isImage?: boolean
  /** 单元格内容是否需要进行脱敏处理 */
  isSecret?: boolean
  /** 单于格内容是否是超链接 */
  link?: string
  /** 单元格内容是否可以编辑 */
  canEdit?: boolean
  /** 单元格内容编辑时使用的表单项配置对象 */
  formItem?: FormFieldItemOption
  /** 当前单元格插槽名称，如果指定，则不渲染默认内容，仅接受插槽传入 */
  slotName?: string
}
