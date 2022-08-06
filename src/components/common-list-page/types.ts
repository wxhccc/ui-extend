import { DefineComponent } from 'vue'
import { BoolSwitch } from '@wxhccc/es-util'
import { UeButtonProps } from '@/ui-comps'
import { PagedTableProps } from '../paged-table'
import { SearchFormPorps } from '../search-form'
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
  extends PartailSome<PagedTableProps<D>, 'pagedData'>,
    SearchFormPorps {
  rowKey?: string | AnyFunction<string>
  request?: AnyFunction<PagedData<D>>
  searchForms?: SearchFormPorps
  searchParamsHandler?: AnyFunction<AnyObject>
  searchParams?: AnyObject
  initSearchParams?: AnyObject
  operation?: OperationItem[] | OperationOption
  fetchParamsHandler?: AnyFunction<AnyObject>
}
