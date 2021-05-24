<template>
  <div class="ue-cropper">
    <img v-show="src" ref="img" :src="src" @load="initCropper" />
    <slot name="init">
      <div v-if="!isReady" class="initing-model">
        <span class="tip-span">{{ initTip }}</span>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, mergeProps, ref } from 'vue'
import Cropper from 'cropperjs'
import { vueTypeProp } from '../utils/component'
import { AnyFunction, AnyObject } from '../utils/types'
// import 'cropperjs/dist/cropper.css'

type ShortType = 'avatar'

const defOptsCreator = (type?: ShortType) => {
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

export interface CropperProps {
  src: string
  type?: 'avatar'
  initTip?: string
  options?: Cropper.Options
}

export type EventName = 'ready' | 'cropstart' | 'cropmove' | 'cropend' | 'crop' | 'zoom'
const eventNames: EventName[] = ['ready', 'cropstart', 'cropmove', 'cropend', 'crop', 'zoom']

export default defineComponent({
  name: 'UeCropper',
  props: {
    src: vueTypeProp<string>(String),
    type: vueTypeProp<CropperProps['type']>(String),
    initTip: vueTypeProp<CropperProps['initTip']>(String, 'cropper is initializing...'),
    options: vueTypeProp<CropperProps['options']>(Object)
  },
  emits: eventNames.map(name => `on-${name}`),
  setup(props, { emit, attrs }) {
    const isReady = ref(false)
    const cropper = ref<Cropper>()
    const img = ref<HTMLImageElement>()
    const defOptions = computed(() => defOptsCreator(props.type))

    const handledEvents = computed(() => {
      const events = {} as Record<EventName, Cropper.Options[EventName]>

      eventNames.forEach((name: EventName) => {
        events[name] = (event: Cropper.CropperEvent) => {
          const method = props.options
          method && method instanceof Function && method(event)
          name === 'ready' && setReadyState(true)
          emit('on-' + name, event)
        }
      })
      return events
    })

    const setReadyState = (state = false) => {
      isReady.value = state
    }

    const handledOpts = computed(() =>
      mergeProps(attrs, defOptions.value, props.options as AnyObject, handledEvents.value)
    ) as Cropper.Options

    return { img, isReady, cropper, defOptions, setReadyState, handledOpts }
  },
  watch: {
    src: 'urlChange',
    options: {
      handler: 'resetCropper',
      deep: true
    }
  },
  beforeUnmount() {
    this.cropper && this.cropper.destroy()
  },
  methods: {
    // utils
    initCropper() {
      this.img && (this.cropper = new Cropper(this.img, this.handledOpts))
      console.log(1111, this.cropper)
    },

    urlChange() {
      this.setReadyState()
      this.cropper ? this.cropper.replace(this.src) : this.initCropper()
    },
    resetCropper() {
      this.$nextTick(() => {
        this.cropper && this.cropper.reset()
      })
    },
    getCroppedFile() {
      return new Promise(resolve => {
        this.callCropperFn('getCroppedCanvas').toBlob(resolve)
      })
    },
    callCropperFn<K extends keyof Cropper>(fn: K, ...args: Parameters<Cropper[K]>) {
      const { cropper } = this
      if (cropper && typeof cropper[fn] === 'function')
        return (cropper[fn] as AnyFunction<any>)(...args)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'cropperjs/dist/cropper.css';
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
