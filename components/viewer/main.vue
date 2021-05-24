<template>
  <div class="ue-viewer">
    <div class="ue-viewer-wrap">
      <slot>
        <div v-show="!inline || !isReady" class="ue-viewer-inner">
          <img
            v-for="(src, index) in images"
            :key="src + index"
            :src="handleThumbSrc(src)"
            :data-original="src"
          />
        </div>
      </slot>
    </div>
    <slot name="init">
      <div v-if="initTip && inline && !isReady" class="initing-model">
        <span class="tip-span">{{ initTip }}</span>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Viewer from 'viewerjs'
import { useProxyPluginMethods } from '../utils/hooks'
import { EventName, MethodName, ViewerProps } from './types'
import { vueTypeProp } from '../utils/component'

const viewerMethods: MethodName[] = [
  'show',
  'hide',
  'view',
  'prev',
  'next',
  'move',
  'moveTo',
  'zoom',
  'zoomTo',
  'rotate',
  'scale',
  'scaleX',
  'scaleY',
  'play',
  'stop',
  'full',
  'exit',
  'tooltip',
  'toggle',
  'reset',
  'update',
  'destroy'
]

const eventNames: EventName[] = [
  'move',
  'moved',
  'play',
  'ready',
  'rotate',
  'scale',
  'scaled',
  'show',
  'shown',
  'stop',
  'view',
  'viewed',
  'zoom',
  'zoomed'
]

export default defineComponent({
  name: 'UeViewer',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    images: vueTypeProp<ViewerProps['images']>(Array, undefined, true),
    inline: vueTypeProp(Boolean, true),
    initTip: vueTypeProp(String, 'viewer is initializing...'),
    activeIndex: vueTypeProp(Number, 0),
    thumbSrcQuery: vueTypeProp<ViewerProps['thumbSrcQuery']>([String, Function]),
    options: vueTypeProp<ViewerProps['options']>(Object)
  },
  emits: ['update:activeIndex', ...eventNames.map(name => `on-${name}`)],
  setup() {
    const viewer = ref<Viewer>()
    const proxyMethos = useProxyPluginMethods<Viewer, MethodName>(viewer, viewerMethods)
    return { viewer, ...proxyMethos }
  },
  data() {
    return {
      isReady: false,
      initialViewIndex: this.activeIndex
    }
  },
  computed: {
    handledEvents() {
      const events = {} as Pick<Viewer.Options, EventName>
      eventNames.forEach(name => {
        events[name] = (event: any) => {
          const optionsMethod = this.options && this.options[name]
          optionsMethod instanceof Function && optionsMethod(event)
          this.runSelfEventMethods(name, event)
          this.$emit('on-' + name, event)
        }
      })
      return events
    },
    handledOpts(): Viewer.Options {
      return Object.assign({ url: 'data-original' }, this.options, this.handledEvents, {
        initialViewIndex: this.initialViewIndex,
        inline: this.inline
      })
    }
  },
  watch: {
    images: 'stateChangeHanlder',
    activeIndex(newVal) {
      Number.isInteger(newVal) && this.viewer && this.viewer.view(newVal)
    },
    handledOpts: 'refreshView'
  },
  mounted() {
    this.initViewer()
  },
  $_ue_methods: viewerMethods,
  beforeUnmount() {
    this.destroy()
  },
  methods: {
    initViewer() {
      this.isReady = false
      this.$nextTick(() => {
        this.$el.firstChild && (this.viewer = new Viewer(this.$el.firstChild, this.handledOpts))
      })
    },
    runSelfEventMethods(name: EventName, event: any) {
      switch (name) {
        case 'ready':
          this.isReady = true
          break
        case 'view':
          this.$emit('update:activeIndex', event.detail.index)
          break
      }
    },
    // bussiness
    refreshView() {
      if (this.isReady) {
        this.destroy()
        this.initViewer()
      }
    },
    stateChangeHanlder() {
      if (this.inline) {
        if (this.$slots.default) return
        this.refreshView()
      } else {
        this.isReady &&
          this.$nextTick(() => {
            this.inline && this.view(0)
            this.update()
          })
      }
    },
    handleThumbSrc(src: string) {
      const { thumbSrcQuery } = this
      if (!thumbSrcQuery) return src
      return thumbSrcQuery instanceof Function ? thumbSrcQuery(src) : src + thumbSrcQuery
    }
  }
})
</script>
<style lang="scss">
@import url('viewerjs/dist/viewer.css');
.ue-viewer {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
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
  .ue-viewer-wrap {
    width: 100%;
    height: 100%;
  }
  .ue-viewer-inner {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
