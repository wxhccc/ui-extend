<script setup lang="ts">
import { ref, reactive, computed, watch, toRefs, toRef } from 'vue'
import { Size, useResizeObserver } from '@wxhccc/ue-shared'
import { UeLoading } from '@/ui-comps'

export interface MediaViewerProps {
  /** 媒体文件类型 */
  type?: 'image' | 'video'
  /** 文件地址 */
  src?: string
  /** 是否自动适应容器尺寸变化，默认为true */
  autoFit?: boolean
  /** 是否需要显示背景 */
  showBackgroud?: boolean
  /** 媒体文件尺寸，如果媒体源被其他组件引用，也可以用媒体元素的实际像素尺寸传入 */
  mediaSize?: Size
  /** 是否在加载中 */
  loading?: boolean
}

const props = withDefaults(defineProps<MediaViewerProps>(), {
  type: 'image',
  src: '',
  autoFit: true,
  showBackgroud: true
})
const emit = defineEmits<{
  (e: 'update:mediaSize', size: Size): void
}>()

const el = ref<HTMLDivElement>()

const autoFit = toRef(props, 'autoFit')

/**
 * 初始化组件el监听对象
 */
const { size: selfSize, resetSize } = useResizeObserver(el, autoFit)

const state = reactive({
  imgLoading: false, // 图片是否在加载中
  isMediaError: false, // 图片是否加载失败
  innerMediaSize: {} as Size
})

const { innerMediaSize, isMediaError, imgLoading } = toRefs(state)

const handleMediaSize = computed(() => !props.src && props.mediaSize ? props.mediaSize : innerMediaSize.value)

// 图片容器的尺寸
const containerSize = computed(() => {
  const { width: mWidth, height: mHeight } = handleMediaSize.value
  const { width, height } = selfSize.value
  if (!mWidth || !mHeight || !width || !height) return {}
  const paneRatio: number = width / height
  const mediaRatio: number = mWidth / mHeight
  return mediaRatio > paneRatio
    ? { width, height: width / mediaRatio }
    : { width: height * mediaRatio, height }
})
// 图片容器的尺寸样式
const containerStyles = computed(() => {
  const { width, height } = containerSize.value
  if (!width) return {}
  return { width: `${width}px`, height: `${height}px` }
})
// 资源是否可用
const mediaAccess = computed(() => !!(props.src && !state.isMediaError))

/** 是否显示中间媒体容器 */
const showMediaContainer = computed(() => selfSize.value.width && handleMediaSize.value.width)

/**
 * 加载图片并获取图片信息
 * @param {string} url 图片地址
 */
const getMediaSize = (event: Event) => {
  if (!event || !event.target) return
  const media = event.target
  if (!autoFit.value) {
    resetSize()
  }
  if (props.type === 'image' && media instanceof HTMLImageElement) {
    state.innerMediaSize = { width: media.naturalWidth, height: media.naturalHeight }
  } else if (props.type === 'video' && media instanceof HTMLVideoElement) {
    state.innerMediaSize = { width: media.videoWidth, height: media.videoHeight }
  }
  emit('update:mediaSize', { ...state.innerMediaSize })
  state.imgLoading = false
}
const mediaLoadError = () => {
  state.isMediaError = true
  state.imgLoading = false
}

watch(
  () => props.src,
  (newVal) => {
    if (newVal) {
      Object.assign(state, {
        imgLoading: true,
        isMediaError: false,
        innerMediaSize: {}
      })
    }
  }
)
</script>
<script lang="ts">
export default { name: 'UeMediaContainer' }
</script>
<template>
  <div
    ref="el"
    :class="['media-container-wrapper', { 'tranparent-bg': props.showBackgroud, 'no-media': !mediaAccess }]"
  >
    <template v-if="!isMediaError">
      <div
        v-show="selfSize.width && innerMediaSize.width"
        class="media-container"
        :style="containerStyles"
      >
        <template v-if="src">
          <img
            v-if="type === 'image'"
            :src="src"
            alt=""
            @load="getMediaSize"
            @error="mediaLoadError"
          />
          <video
            v-if="type === 'video'"
            :src="src"
            @loadeddata="getMediaSize"
            @error="mediaLoadError"
          />
        </template>
        <div v-if="showMediaContainer" class="media-content-cover">
          <slot :size="containerSize" :media-size="handleMediaSize"></slot>
        </div>
      </div>
    </template>
    <ue-loading v-if="loading || imgLoading" class="loading-spin"></ue-loading>
  </div>
</template>

<style lang="scss">
.media-container-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  pointer-events: none;
  &.tranparent-bg {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }
  .media-container {
    position: relative;
  }
  .media-content-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .no-media {
    position: relative;
  }
  .loading-spin {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }
}
</style>
