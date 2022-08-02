<script lang="ts">
import { defineComponent, computed } from 'vue'
import { UePagination, UeLoading } from '@/ui-comps'
import {
  emits,
  Context,
  PagedCommonProps,
  pagedCompProps,
  usePagedLogic
} from '@/utils/paged-utils'
import { useStorage } from '@/hooks'

export type PagedListProps<D extends AnyObject = AnyObject> = PagedCommonProps<D>

const storeSession = useStorage('PagedList')

export default defineComponent({
  name: 'PagedList',
  components: {
    UePagination,
    UeLoading
  },
  // 使用公共的props定义
  props: pagedCompProps(),
  emits,
  setup(props, context) {
    const { pagination, dataList, getStoreData, clearStoreData } = usePagedLogic<typeof props>(
      props,
      context as unknown as Context,
      storeSession
    )

    const handledLoading = computed(() => {
      const { loadingProps } = props
      return typeof loadingProps === 'string' ? { text: loadingProps } : loadingProps
    })

    context.expose({ getStoreData, clearStoreData })

    return { pagination, handledLoading, dataList }
  }
})
</script>
<template>
  <div class="ue-paged-list">
    <ue-loading v-if="loading" v-bind="handledLoading"></ue-loading>
    <slot :rows="dataList"></slot>
    <div class="pagination-container">
      <ue-pagination v-if="pagination" v-bind="pagination">
        <template #default>
          <slot name="pagination-layout"></slot>
        </template>
      </ue-pagination>
    </div>
  </div>
</template>

<style lang="scss">
.ue-paged-list {
  .pagination-container {
    margin-top: 4px;
    padding: 18px 0;
    text-align: center;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
