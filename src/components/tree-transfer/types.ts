import { UeTreeProps } from '@/ui-comps'

export type Direction = 'left' | 'right'

export interface DataNode {
  children?: DataNode[]
  [x: string]: any
}

export type FilterMode = 'filter' | 'disabled' | 'reverse'

export interface TreeTransferProps {
  /** 数据源 */
  data: any[]
  modelValue?: StrOrNum[]
  loading?: boolean
  /** 节点key */
  nodeKey?: string
  /** 转换框header右侧自定义内容，设置false会隐藏header */
  titles?: false | [string | false, string | false]
  /** 是否显示搜索过滤 */
  showFilter?: boolean | ((direction: Direction) => boolean)
  /** 两侧树组件的props对象 */
  treeProps?: Partial<UeTreeProps> | ((direction: Direction) => Partial<UeTreeProps>)
  /** 是否由按钮触发数据转移，默认是 */
  buttonTrigger?: boolean
}
