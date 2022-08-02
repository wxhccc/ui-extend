<script setup lang="ts">
import { ref, shallowRef, watch, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { isFunction } from 'lodash-es'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

export interface CropperProps {
  /** 图片地址 */
  src?: string
  /** 内置裁剪类型，每种类型会设定一些默认值 */
  type?: 'avatar'
  /** 插件初始化时的提示文字 */
  initTip?: string
  /** 插件的配置对象，可以设置所有文档支持的配置，且可以组件覆盖默认配置 */
  options?: Cropper.Options
}

type MethodKeys = 'ready' | 'cropstart' | 'cropmove' | 'cropend' | 'crop' | 'zoom'
type CopperOptionMethods = Required<Pick<Cropper.Options, MethodKeys>>

const props = withDefaults(defineProps<CropperProps>(), {
  initTip: 'cropper is initializing...',
  options: () => ({})
})
const emit = defineEmits<{
  (e: 'ready', event: Cropper.ReadyEvent<EventTarget>): void
  (e: 'cropstart', event: Cropper.CropStartEvent<EventTarget>): void
  (e: 'cropmove', event: Cropper.CropMoveEvent<EventTarget>): void
  (e: 'cropend', event: Cropper.CropEndEvent<EventTarget>): void
  (e: 'crop', event: Cropper.CropEvent<EventTarget>): void
  (e: 'zoom', event: Cropper.ZoomEvent<EventTarget>): void
}>()

const defOptsCreator = (type: CropperProps['type']) => {
  const typeOpts = {
    avatar: {
      aspectRatio: 1
    }
  }
  return {
    viewMode: 2,
    ...(type ? typeOpts[type] : {})
  }
}

const isReady = ref(false)
const img = ref<HTMLImageElement>()
const $cropper = shallowRef()

const defOpts = computed(() => defOptsCreator(props.type))

const handledEvents = computed(() => {
  const eventNames: MethodKeys[] = ['ready', 'cropstart', 'cropmove', 'cropend', 'crop', 'zoom']
  return eventNames.reduce((acc, name) => {
    acc[name] = (event) => {
      const optMethod = props.options[name]
      isFunction(optMethod) && optMethod(event as any)
      name === 'ready' && setReadyState(true)
      ;(emit as any)(name, event)
    }
    return acc
  }, {} as CopperOptionMethods)
})

const handledOpts = computed(
  () =>
    ({
      ...defOpts.value,
      ...props.options,
      ...handledEvents.value
    } as Cropper.Options<HTMLImageElement>)
)

const initCropper = async () => {
  await nextTick()
  const image = img.value
  if (image) {
    $cropper.value = new Cropper(image, handledOpts.value)
  }
}
const setReadyState = (state = false) => (isReady.value = state)

const urlChange = () => {
  setReadyState()
  $cropper.value ? $cropper.value.replace(props.src) : initCropper()
}
const resetCropper = () => {
  $cropper.value && nextTick(() => $cropper.value.reset())
}
const getCroppedFile = () => {
  return new Promise((resolve) => {
    callCropperFn('getCroppedCanvas').toBlob(resolve)
  })
}
const callCropperFn = <K extends keyof Cropper>(fn: K, ...args: Parameters<Cropper[K]>) => {
  const method = ($cropper.value || {})[fn]
  if (isFunction(method)) {
    return method(...args)
  }
}

defineExpose({ resetCropper, getCroppedFile })

watch(() => props.src, urlChange)

onMounted(() => {
  props.src && initCropper()
})

onBeforeUnmount(() => {
  $cropper.value?.destroy()
})
</script>
<script lang="ts">
export default { name: 'UeCopper' }
</script>

<template>
  <div class="ue-cropper">
    <img v-show="src" ref="img" :src="src" />
    <slot name="init">
      <div v-if="!isReady" class="initing-model">
        <span class="tip-span">{{ initTip }}</span>
      </div>
    </slot>
  </div>
</template>

<style lang="scss">
.ue-cropper {
  position: relative;
  overflow: hidden;
  img {
    max-width: 100%;
  }
  .initing-model {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
    .tip-span {
      color: #ffffff;
      font-size: 16px;
      line-height: 60px;
    }
  }
}
</style>
