<script lang="ts">
import { defineComponent, h, computed } from 'vue'
import { useStorage } from '@wxhccc/ue-shared'
import { UeList, UeLoading } from '@/ui-comps'
import {
  emits,
  Context,
  PagedCommonProps,
  pagedCompProps,
  usePagedLogic
} from '@/utils/paged-utils'

export type PagedListProps<D extends AnyObject = AnyObject> = PagedCommonProps<D>

export default defineComponent({
  name: 'UePagedList',
  components: {
    UeLoading
  },
  // 使用公共的props定义
  props: pagedCompProps(),
  emits,
  setup(props, context) {
    const storeSession = useStorage('PagedList')
    const { pagination, dataList, getStoreData, clearStoreData } = usePagedLogic<typeof props>(
      props,
      context as unknown as Context,
      storeSession
    )

    const handledLoading = computed(() => {
      const { loading, loadingProps } = props
      const spinProps = typeof loadingProps === 'string' ? { tip: loadingProps } : loadingProps
      return loading && (spinProps || true)
    })

    context.expose({ getStoreData, clearStoreData })

    return () =>
      h(
        UeList,
        {
          class: ['ue-paged-list', { 'flex-layout': props.flexLayout }],
          pagination: pagination.value,
          dataSource: dataList.value,
          loading: handledLoading.value
        },
        context.slots
      )
  }
})
</script>

<style lang="scss">
.ue-paged-list {
  display: flex;
  flex-direction: column;

  &.flex-layout {
    width: 100%;
    height: 100%;
    .ant-spin-nested-loading {
      flex: 1;
      overflow: hidden;
    }
    .ant-spin-container {
      width: 100%;
      height: 100%;
      overflow: hidden auto;
    }
  }
  .no-total-pagination .ant-pagination-simple-pager {
    display: none;
  }
}
</style>
