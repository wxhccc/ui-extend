export { default as default } from './index.vue'

import { exposeMethods as pagedListMethods } from '@/components/paged-list'
import { exposeMethods as dataTableMethods } from '@/components/data-table'

export const exposeMethods = [...pagedListMethods, ...dataTableMethods]

export * from './types'
