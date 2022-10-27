import { DefineComponent } from 'vue'
import { BoolSwitch } from '@wxhccc/es-util'
import { UeButtonProps } from '@/ui-comps'
import { PagedTableProps } from '@/components/paged-table'
import { SearchFormProps } from '@/components/search-form'
import { PagedData } from '@/utils/paged-utils'

export type ButtonOnClick = (item: OperationItem, loadingSwitch: BoolSwitch) => void

export interface OperationItem extends UeButtonProps {
  /** 组件名或组件，默认是Buttton */
  component?: DefineComponent
  /** 操作项唯一key */
  key: string
  /** 组件绑定的props对象 */
  props?: AnyObject
  /** 按钮内文字 */
  btnText?: string
  /** loading字段在loadings对象中的key */
  lockingKey?: string
  /** 按钮的点击事件处理函数 */
  onClick?: ButtonOnClick
}

export interface OperationOption {
  loadings?: Record<string, boolean>
  items: OperationItem[]
}

export interface CommonListPageProps<D extends AnyObject = AnyObject>
  extends PartailSome<PagedTableProps<D>, 'pagedData'> {
  /** 数据行id */
  rowKey?: string | AnyFunction<string>
  /** 数据请求函数，需返回指定格式数据 */
  request?: AnyFunction<Promise<PagedData<D>>>
  /** 搜索表单配置 */
  searchForms?: SearchFormProps
  /** 搜索表单绑定参数 */
  searchParams?: AnyObject
  /** 搜索参数处理函数 */
  searchParamsHandler?: AnyFunction<AnyObject>
  /** 初始搜索参数 */
  initSearchParams?: AnyObject
  /** 操作区配置参数 */
  operation?: OperationItem[] | OperationOption
  /** 采用flex布局，让组件填充满父容器，默认为true */
  flexLayout?: boolean
}
