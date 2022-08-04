import { PagedCommonProps } from '@/utils/paged-utils'

export interface SortConfig {
  orderby?: string
  order?: string
}

export interface PagedTableProps<D extends AnyObject = AnyObject> extends PagedCommonProps<D> {
  initSort?: SortConfig
  sortPropKeys?: SortConfig
}
