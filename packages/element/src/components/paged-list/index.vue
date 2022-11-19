<script lang="ts">
import { defineComponent, computed } from 'vue'
import { AnyObject, useStorage } from '@wxhccc/ue-shared'
import { UePagination, UeLoading } from '@/ui-comps'
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
    UePagination,
    UeLoading
  },
  // 使用公共的props定义
  props: pagedCompProps(),
  emits,
  setup(props, context) {
    const storeSession = useStorage(props.sessionStorageKey)

    const { pagination, dataList, getStoreData, clearStoreData } = usePagedLogic<typeof props>(
      props,
      context as unknown as Context,
      storeSession
    )

    const handledLoading = computed<any>(() => {
      const { loadingProps } = props
      return typeof loadingProps === 'string' ? { text: loadingProps } : loadingProps
    })

    const hasSlot = computed(() => {
      const { layout } = pagination.value || {}
      return layout?.includes('slot')
    })

    context.expose({ getStoreData, clearStoreData })

    return { pagination, hasSlot, handledLoading, dataList }
  }
})
</script>
<template>
  <div :class="['ue-paged-list', { 'flex-layout': flexLayout }]">
    <div class="data-list-container">
      <ue-loading v-if="loading" v-bind="handledLoading"></ue-loading>
      <div class="data-list-scroll-wrapper">
        <slot :rows="dataList"></slot>
      </div>
    </div>
    <div class="pagination-container">
      <ue-pagination v-if="pagination" v-bind="pagination">
        <template v-if="hasSlot" #default>
          <slot name="paginationLayout"></slot>
        </template>
      </ue-pagination>
    </div>
  </div>
</template>

<style lang="scss">
.ue-paged-list {
  display: flex;
  flex-direction: column;
  .data-list-container {
    position: relative;
  }
  .data-list-scroll-wrapper {
    min-height: 100px;
  }

  &.flex-layout {
    width: 100%;
    height: 100%;
    .data-list-container {
      flex: 1;
      overflow: hidden;
    }
    .data-list-scroll-wrapper {
      height: 100%;
      overflow: hidden auto;
    }
  }
  .pagination-container {
    margin-top: 4px;
    padding: 12px 0;
    text-align: center;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
