<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { debounce, isFunction } from 'lodash-es'
import { UeScrollbar, LoadingOutlined } from '@/ui-comps'
import { vueTypeProp } from '@wxhccc/ue-shared'
import { ScrollPaneProps } from './types'

const defaultTips: ScrollPaneProps['tipsTexts'] = {
  loading: '数据加载中',
  noMore: '已经到底了',
  getMore: '滚动加载更多',
  dataEmpty: '暂无数据'
}

const props = defineProps({
  loading: Boolean,
  uniqueKey: vueTypeProp<string>(String),
  data: vueTypeProp<ScrollPaneProps['data']>(Array, () => []),
  total: vueTypeProp<number>(Number),
  noMoreData: Boolean,
  tipsTexts: vueTypeProp<ScrollPaneProps['tipsTexts']>(Object),
  debounceWait: vueTypeProp<number>(Number, 300),
  load: vueTypeProp<ScrollPaneProps['load']>(Function),
  triggerPixel: vueTypeProp<number>(Number, 5),
  loadIgnoreTotal: Boolean
})
const emit = defineEmits<{
  (e: 'scroll-bottom'): void
}>()

const scrollbar = ref()
const scrollWrap = ref<HTMLDivElement>()

const handleTips = computed(() => ({ ...defaultTips, ...props.tipsTexts }))

const handleData = computed(() => {
  const { data = [], uniqueKey } = props
  return uniqueKey ? uniqueData(data) : data
})

const isNoMore = computed(() => {
  const { noMoreData, total } = props
  return noMoreData || total <= handleData.value.length
})
const isEmpty = computed(() => handleData.value.length === 0)

const bottomScope = computed(() => {
  return { isEmpty: isEmpty.value, isNoMore: isNoMore.value }
})

const handleScroll = computed(() => debounce(checkReachBottom, props.debounceWait))


const uniqueData = (data: any[]) => {
  let uniqueKeys: StrOrNum[] = []
  const { uniqueKey } = props
  return data.filter((item) => {
    const itemValue = Object.prototype.hasOwnProperty.call(item, uniqueKey) ? item[uniqueKey] : item
    const unique = !uniqueKeys.includes(itemValue)
    unique && uniqueKeys.push(itemValue)
    return unique
  })
}
const checkScrollBottom = () => {
  const { clientHeight = 0, scrollHeight = 0, scrollTop = 0 } = scrollWrap.value || {}
  return scrollHeight - clientHeight - scrollTop <= props.triggerPixel
}
const checkReachBottom = () => {
  if (!checkScrollBottom()) return
  emit('scroll-bottom')
  const { load, loading, loadIgnoreTotal } = props
  if (isFunction(load) && !loading && (loadIgnoreTotal || !isNoMore.value)) {
    load()
  }
}
onMounted(() => {
  scrollWrap.value = scrollbar.value?.wrap$
})
</script>
<script lang="ts">
export default { name: 'UeScrollPane' }
</script>

<template>
  <div class="ue-scroll-pane">
    <ue-scrollbar ref="scrollbar" class="pane-scroll" @scroll="handleScroll">
      <slot :data="handleData"></slot>
      <slot name="bottom" v-bind="bottomScope">
        <p class="bottom-tip">
          <template v-if="loading"> <loading-outlined /> {{ handleTips.loading }} </template>
          <template v-else-if="isEmpty">
            {{ handleTips.dataEmpty }}
          </template>
          <template v-else>
            {{ isNoMore ? handleTips.noMore : handleTips.getMore }}
          </template>
        </p>
      </slot>
    </ue-scrollbar>
  </div>
</template>

<style lang="scss">
.ue-scroll-pane {
  min-height: 100px;
  height: 100%;
  overflow: hidden;
  .bottom-tip {
    width: 100%;
    height: 32px;
    margin: 0;
    text-align: center;
    border-top: 1px solid #f8f7f8;
    line-height: 36px;
    font-size: 13px;
    color: #aeaeae;
  }
}
</style>
