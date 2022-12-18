import { AnyObject } from '@wxhccc/ue-shared'
import { PagedCommonProps } from '@/utils/paged-utils'
import { DataTableProps } from '@/components/data-table/types'

export interface SortConfig {
  orderby?: string
  order?: string
}

export interface PagedTableProps<D extends AnyObject = AnyObject>
  extends DataTableProps,
    PagedCommonProps<D> {
  initSort?: SortConfig
  sortPropKeys?: SortConfig
}