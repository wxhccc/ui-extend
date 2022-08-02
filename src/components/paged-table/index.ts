import { computed, defineComponent, mergeProps, h, ref, nextTick, watch } from 'vue'
import { Table, TableProps } from 'ant-design-vue'
import { omit } from 'lodash-es'
import { ColumnProps } from 'ant-design-vue/lib/table'
import ActionBtns, { ButtonItem } from '../action-btns'
import { useStorage } from '../utils/hooks'
import useResizeObserver from '../utils/resize-observer'
import {
  Context,
  emits,
  PagedCommonProps,
  pagedCompProps,
  usePagedLogic
} from '../utils/paged-utils'
import { TableRowSelection } from 'ant-design-vue/es/table/interface'
import { vueTypeProp } from '../utils/component'
import { CompProps } from '../utils/types'

export interface PagedTableProps<D extends App.AnyObject = App.AnyObject>
  extends PagedCommonProps<D> {
  rowKey?: TableProps['rowKey']
  columns: PagedTbColumnProps[]
  // 可选列绑定值，rowKey对应值的数组
  selectionKeys?: App.StrOrNum[]
  // 是否自动适应父容器的尺寸来控制滚动条
  autoFit?: boolean
  // 列的默认最小宽度，默认值为100
  minColumnWidth?: number
}

export type PagedTableCompProps = CompProps<PagedTableProps>

export interface PagedTbColumnProps extends ColumnProps {
  /** 最小宽度 */
  minWidth?: number
  actions?: ButtonItem[]
}

const storeSession = useStorage('PagedTable')

export default defineComponent({
  name: 'PagedTable',
  inheritAttrs: false,
  props: {
    rowKey: vueTypeProp<NonNullable<PagedTableProps['rowKey']>>(String, 'id'),
    columns: vueTypeProp<NonNullable<PagedTableProps['columns']>>(Array, () => []),
    ...pagedCompProps(),
    selectionKeys: vueTypeProp<PagedTableProps['selectionKeys']>(Array),
    minColumnWidth: vueTypeProp<number>(Number, 100),
    autoFit: vueTypeProp<boolean>(Boolean, true)
  },
  emits: {
    ...emits,
    extraModelChange: () => true,
    'update:refresh': () => true,
    'update:selectionKeys': (keys: App.StrOrNum[]) => Array.isArray(keys)
  },
  setup(props, context) {
    const { pagination, dataList, getStoreData, clearStoreData } = usePagedLogic<typeof props>(
      props,
      context as unknown as Context,
      storeSession
    )
    const { attrs, emit } = context
    const tableRef = ref()
    const tableScroll = ref<TableProps['scroll']>()

    const { size } = useResizeObserver(tableRef, props.autoFit)

    watch([props.autoFit, size, tableRef, dataList], () => {
      if (attrs.scroll) {
        tableScroll.value = attrs.scroll as TableProps['scroll']
      }
      if (props.autoFit && size.value) {
        nextTick(() => {
          const box = tableRef.value as HTMLDivElement
          const { offsetWidth: tWidth = 0, offsetHeight: tHeight = 0 } = (box.querySelector(
            '.ant-table'
          ) || {}) as HTMLUListElement
          const { offsetHeight: hHeight = 0 } = (box.querySelector('.ant-table-fixed') ||
            {}) as HTMLDivElement
          tableScroll.value = {
            ...(trueMinWidth.value > tWidth ? { x: tWidth } : {}),
            y: tHeight - hHeight
          }
        })
      }
    })

    const handleColumns = computed(() => {
      const { width: boxWidth } = size.value
      return props.columns.map((column) => {
        // 控制列的宽度，默认等宽，最小宽度为80
        const { minWidth = props.minColumnWidth } = column
        let { width = minWidth } = column
        if (`${width}`.endsWith('%')) {
          const widthPercent = parseFloat(`${width}`) / 100
          width = boxWidth * widthPercent > minWidth ? boxWidth * widthPercent : minWidth
        } else if (width) {
          const widthPx = typeof width === 'number' ? width : parseFloat(width)
          width = widthPx > minWidth ? widthPx : minWidth
        }
        if (Array.isArray(column.actions)) {
          column.customRender = (data: any) => h(ActionBtns, { btns: column.actions, data })
        }
        return { ...column, width }
      })
    })

    const trueMinWidth = computed(() =>
      handleColumns.value.reduce((acc, cur) => {
        acc += typeof cur.width === 'number' ? cur.width : parseFloat(cur.width)
        return acc
      }, 0)
    )

    const rowSelection = computed(() => {
      if (!props.selectionKeys) {
        return undefined
      }
      const attrRowSelection = attrs.rowSelection || attrs['row-selection']
      return {
        selectedRowKeys: props.selectionKeys,
        onChange: (keys: App.StrOrNum[]) => emit('update:selectionKeys', keys),
        ...(attrRowSelection as TableRowSelection)
      } as TableRowSelection
    })

    const listProps = computed(() => ({
      columns: handleColumns.value,
      rowKey: props.rowKey,
      rowSelection: rowSelection.value,
      scroll: tableScroll.value,
      ref: tableRef
    }))

    context.expose({ getStoreData, clearStoreData })

    return () =>
      h(
        'div',
        {
          class: ['me-paged-table', { 'me-full-spin': props.autoFit }, attrs.class],
          ref: tableRef
        },
        h(
          Table,
          mergeProps(omit(attrs, 'class'), listProps.value, {
            pagination: pagination.value,
            dataSource: dataList.value
          }),
          context.slots
        )
      )
  }
})
