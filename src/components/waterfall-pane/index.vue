<template>
  <div class="ue-waterfall-pane">
    <ue-scrollbar ref="scrollbar" class="pane-scroll" :native="false">
      <slot :data="scopeData"></slot>
      <slot name="bottom" v-bind="bottomScope">
        <p class="bottom-tip">
          <template v-if="loading">
            <i :class="loadingIcon"></i> {{ handleTips.loading }}
          </template>
          <template v-else-if="hasScroll">
            {{ isNoMore ? handleTips.noMore : handleTips.getMore }}
          </template>
          <template v-else-if="isEmpty">
            {{ handleTips.dataEmpty }}
          </template>
        </p>
      </slot>
    </ue-scrollbar>
  </div>
</template>

<script>
import { Scrollbar } from 'UE/ui-comps'
import { debounce } from 'UE/utils/lodash'

const defaultTips = {
  loading: '数据加载中',
  noMore: '已经到底了',
  getMore: '滚动加载更多',
  dataEmpty: '暂无数据'
}

export default {
  name: 'UeWaterfallPane',
  components: {
    UeScrollbar: Scrollbar
  },
  props: {
    loading: Boolean,
    uniqueKey: String,
    data: {
      type: Array,
      default: () => []
    },
    total: Number,
    loadingIcon: {
      type: String,
      default: 'el-icon-loading'
    },
    noMoreData: Boolean,
    tipsTexts: Object,
    debounceWait: {
      type: Number,
      default: 300
    },
    load: Function,
    triggerPixel: {
      type: Number,
      default: 5
    },
    loadIgnoreTotal: Boolean
  },
  data() {
    return {
      hasScroll: false,
      scrollWrap: null
    }
  },
  computed: {
    handleTips() {
      return Object.assign({}, defaultTips, this.tipsTexts)
    },
    isNoMore() {
      const { noMoreData, total, scopeData } = this
      return noMoreData || total <= scopeData.length
    },
    isEmpty() {
      return this.scopeData.length === 0
    },
    bottomScope() {
      const { hasScroll, isEmpty, isNoMore } = this
      return { hasScroll, isEmpty, isNoMore }
    },
    scopeData() {
      const { data, uniqueKey } = this
      return uniqueKey ? this.uniqueData(data) : data
    },
    handleScroll() {
      const { debounceWait } = this
      return debounce(this.checkReachBottom, debounceWait)
    }
  },
  mounted() {
    const wrap = this.$refs.scrollbar.$refs.wrap
    if (wrap) {
      wrap.onscroll = this.handleScroll
      this.scrollWrap = wrap
      this.checkCanScroll()
    }
  },
  updated() {
    this.scrollWrap && this.checkCanScroll()
  },
  methods: {
    // utils
    checkCanScroll() {
      const { clientHeight, scrollHeight } = this.scrollWrap
      this.hasScroll = scrollHeight > clientHeight
    },
    uniqueData(data) {
      let uniqueKeys = []
      const { uniqueKey } = this
      return data.filter((item) => {
        const itemValue = Object.prototype.hasOwnProperty.call(item, uniqueKey)
          ? item[uniqueKey]
          : item
        const unique = !uniqueKeys.includes(itemValue)
        unique && uniqueKeys.push(itemValue)
        return unique
      })
    },
    checkScrollBottom() {
      const { clientHeight, scrollHeight, scrollTop } = this.scrollWrap
      return scrollHeight - clientHeight - scrollTop < this.triggerPixel
    },
    checkReachBottom() {
      if (!this.checkScrollBottom()) return
      this.$emit('on-scroll-bottom')
      const { load, loading, loadIgnoreTotal, isNoMore } = this
      if (load && !loading && (loadIgnoreTotal || !isNoMore)) {
        load()
      }
    }
    // events
  }
}
</script>
<style lang="scss">
.ue-waterfall-pane {
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
  .pane-scroll {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      overflow-y: auto;
    }
    .is-vertical {
      opacity: 1;
    }
  }
}
</style>
