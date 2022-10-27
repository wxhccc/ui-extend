<script lang="ts">
import { defineComponent, ref, computed, h, watch, nextTick } from 'vue'
import { vueTypeProp, useStorage, useResizeObserver } from '@wxhccc/ue-shared'
import ActionBtns from '../action-btns'
import { TableRowSelection, UeTable, UeTableProps } from '@/ui-comps'
import { Context, emits, pagedCompProps, usePagedLogic } from '@/utils/paged-utils'
import { PagedTableProps, TableCellRow } from './types'

export default defineComponent({
  name: 'UePagedTable',
  inheritAttrs: false,
  props: {
    rowKey: vueTypeProp<NonNullable<PagedTableProps['rowKey']>>(String, 'id'),
    columns: vueTypeProp<NonNullable<PagedTableProps['columns']>>(Array, () => []),
    ...pagedCompProps(),
    selectionValue: vueTypeProp<PagedTableProps['selectionValue']>(Array),
    minColumnWidth: vueTypeProp<number>(Number, 80),
    autoWidth: vueTypeProp<boolean>(Boolean, true)
  },
  emits: {
    ...emits,
    'update:selectionValue': (keys?: StrOrNum[]) => true
  },
  setup(props, context) {
    const storeSession = useStorage('PagedTable')

    const { isTotalMode, pagination, dataList, getStoreData, clearStoreData } = usePagedLogic<typeof props>(props, context as unknown as Context, storeSession)
    const { attrs, emit, expose } = context
    const container = ref<HTMLDivElement>()
    const tableScroll = ref<UeTableProps['scroll']>()

    const { size } = useResizeObserver(container, true)

    const getElSize = (selector: string) => {
      const box = container.value as HTMLDivElement
      const { offsetWidth: width = 0, offsetHeight: height = 0 } = (box.querySelector(selector) ||
            {}) as HTMLUListElement
      return { width, height }
    }

    watch([() => props.autoWidth, size, container, dataList], () => {
      const { flexLayout, autoWidth } = props
      if (attrs.scroll) {
        tableScroll.value = attrs.scroll as UeTableProps['scroll']
      }
      if ((flexLayout || autoWidth) && size.value) {
        nextTick(() => {
          const { width: tWidth } = getElSize('.ant-table')
          // const { height: cHeight } = getElSize('.ant-table-content table')
          const { height: hHeight } = getElSize('.ant-table-header')
          // const { height: bHeight } = getElSize('.ant-table-body')
          tableScroll.value = {
            ...(trueTbMinWidth.value > tWidth ? { x: tWidth } : {}),
            ...(flexLayout ? { y: `calc(100% - ${hHeight}px)` } : {})
          }
        })
      }
    })

    const handleColumns = computed(() => {
      const { columns, autoWidth } = props
      const items = Array.isArray(columns) ? columns : []
      if (!autoWidth || !items.length) {
        return items
      }
      const { width: boxWidth } = size.value
      // 设置了宽度或最小宽度的列的总宽度
      let specWidth = props.selectionValue ? 60 : 0
      // 设置了具体宽度列的个数
      let specItemNum = 0
      /** 设置了具体宽度的各列计算后的实际宽度 */
      const columnWidths = items.map<number>((column) => {
        // 控制列的宽度，默认等宽，最小宽度为100
        const { minWidth = props.minColumnWidth, maxWidth = boxWidth } = column
        let { width } = column
        if (!width) {
          return 0
        }
        const isPercentWidth = `${width}`.endsWith('%')
        const countWidth = isPercentWidth
          ? (boxWidth * Number.parseFloat(`${width}`)) / 100
          : typeof width === 'number'
            ? width
            : Number.parseFloat(width)
        // 如果是用百分比设置的宽度，需要和最小最大宽度进行对比
        if (isPercentWidth) {
          width =
            countWidth > minWidth && countWidth < maxWidth ? countWidth : countWidth > maxWidth ? maxWidth : minWidth
        } else {
          width = countWidth
        }

        specItemNum++
        specWidth += width as number
        return width as number
      })
      const avgWithoutWidth = Math.round((boxWidth - specWidth) / (items.length - specItemNum))
      // 再次计算剩余平均值和设置了最小/最大宽度的列的关系
      items.forEach((column, index) => {
        const { maxWidth, minWidth = props.minColumnWidth } = column
        let width = columnWidths[index]
        // 如果列设置了有效宽度，则不再计算
        if (!width) {
          // 计算剩余宽度的的平均宽度
          // 如果列设置了最大宽度，而剩余宽度的平均宽度高于最大值，则设置宽度为最大宽度
          if (maxWidth && maxWidth < avgWithoutWidth) {
            width = maxWidth
            specWidth += width
            specItemNum++
            columnWidths[index] = width
          } else if (minWidth && avgWithoutWidth < minWidth) {
            width = minWidth
            specWidth += width
            specItemNum++
            columnWidths[index] = width
          }
        }
      })
      const leftAvgWidth = Math.round((boxWidth - specWidth) / (items.length - specItemNum))
      // 剩余宽度平分计算
      return items.map((column, index) => {
        if (Array.isArray(column.actions)) {
          column.customRender = (data: TableCellRow) => h(ActionBtns, { btns: column.actions, data })
        }
        const { minColumnWidth } = props
        let width = columnWidths[index]
        // 如果列设置了有效宽度，则不再计算
        if (!width && leftAvgWidth < minColumnWidth) {
          width = minColumnWidth
        }
        return { ...column, ...(width ? { width } : {}) }
      })
    })

    const trueTbMinWidth = computed(() =>
      handleColumns.value.reduce((acc, cur) => {
        acc += typeof cur.width === 'number' ? cur.width : 0
        return acc
      }, 0)
    )

    const rowSelection = computed(() => {
      const { selectionValue } = props
      if (!Array.isArray(selectionValue)) {
        return undefined
      }
      const attrRowSelection = attrs.rowSelection || attrs['row-selection']
      return {
        columnWidth: 60,
        selectedRowKeys: selectionValue,
        onChange: (keys: StrOrNum[]) => emit('update:selectionValue', keys),
        ...(attrRowSelection as TableRowSelection)
      } as TableRowSelection
    })

    const handledLoading = computed(() => {
      const { loading, loadingProps } = props
      const spinProps = typeof loadingProps === 'string' ? { tip: loadingProps } : loadingProps
      return loading && (spinProps || true)
    })

    const listProps = computed(() => ({
      loading: handledLoading.value,
      columns: handleColumns.value,
      rowKey: props.rowKey,
      rowSelection: rowSelection.value,
      scroll: tableScroll.value
    }))

    expose({ getStoreData, clearStoreData })

    return () => {
      const { class: rootClass, ...rest } = attrs
      return h(
        'div',
        {
          class: [
            'ue-paged-table',
            { 'flex-layout': props.flexLayout, 'no-total-table': !isTotalMode.value },
            rootClass
          ],
          ref: container
        },
        h(
          UeTable,
          {
            ...rest,
            ...listProps.value,
            pagination: pagination.value,
            dataSource: dataList.value
          },
          context.slots
        )
      )
    }
  }
})
</script>

<style lang="scss">
.ue-paged-table {
  &.flex-layout {
    width: 100%;
    height: 100%;
    .ant-table-wrapper,
    .ant-spin-nested-loading,
    .ant-table-container {
      height: 100%;
    }
    .ant-spin-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ant-table {
      position: relative;
      flex: 1;
      overflow: hidden;
    }
  }
  .no-total-pagination .ant-pagination-simple-pager {
    display: none;
  }
}
</style>
