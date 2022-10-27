import { TreeDataNode } from '@/ui-comps'

export type { TreeDataNode }

export interface TreeFiledProps {
  /** 是否采用行内展示的形式。行内展示使用了flex布局让根节点在水平方向平铺，减少页面高 */
  inline?: boolean
  /** 和Tree组件同名属性意义一致，属性对应不上时无法查找节点会报 */
  nodeKey?: string
  /** 树节点的关联方式，对应Tree的`check-strictly`属性并增加了扩展。*two-way*对应false，*none*对应true，*one-way*为扩展关联方式（仅单向关联，父->子） */
  checkMode?: 'one-way' | 'two-way' | 'none'
  /** 数据 */
  data?: TreeDataNode[]
  /** 绑定值, `node-key`指定属性对应值的数 */
  modelValue?: StrOrNum[]
  /** 拆分后的绑定值，包含了选中项和半选 */
  detailValue?: {
    checked: StrOrNum[]
    halfChecked: StrOrNum[]
  }
  /** 展示模式，不显示checkbox，仅显示选中的节点文 */
  readonly?: boolean
}