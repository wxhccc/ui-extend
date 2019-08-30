<template>
  <div class="ue-viewer">
    <div class="ue-viewer-wrap">
      <slot>
        <div class="ue-viewer-inner" v-show="!inline || !isReady">
          <img
            v-for="(src, index) in imgs"
            :key="src + index"
            :src="handleThumbSrc(src)"
            :data-original="src"
          >
        </div>
      </slot>
    </div>
    <slot name="init">
      <div v-if="initTip && inline && !isReady" class="initing-model">
        <span class="tip-span">{{initTip}}</span>
      </div>
    </slot>
  </div>
</template>

<script>
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { pluginFnProxyMixin } from 'UE/mixins/ref-fn-proxy';

const viewerMethods = ['show', 'hide', 'view', 'prev', 'next', 'move', 'moveTo', 'zoom', 'zoomTo', 'rotate', 'scale', 'scaleX', 'scaleY', 'play', 'stop', 'full', 'exit', 'tooltip', 'toggle', 'reset', 'update', 'destroy'];

export default {
  name: 'UeViewer',
  mixins: [pluginFnProxyMixin('$viewer', viewerMethods)],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    imgs: Array,
    inline: {
      type: Boolean,
      default: true
    },
    initTip: {
      type: String,
      default: 'viewer is initializing...'
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    thumbSrcQuery: [String, Function],
    options: Object
  },
  data () {
    return {
      isReady: false,
      initialViewIndex: this.activeIndex,
      $viewer: null
    }
  },
  mounted () {
    this.initViewer();
  },
  computed: {
    handledEvents () {
      let events = {};
      const eventNames = ['ready', 'show', 'shown', 'hide', 'hidden', 'view', 'viewd', 'zoom', 'zoomed'];
      eventNames.forEach(name => {
        events[name] = (event) => {
          this.options && typeof this.options[name] === 'function' && this.options[name](event);
          this.runSelfEventMethods(name, event);
          this.$emit('on-' + name, event);
        }
      });
      return events;
    },
    handledOpts () {
      return Object.assign({ url: 'data-original' }, this.options, this.handledEvents, { initialViewIndex: this.initialViewIndex, inline: this.inline });
    }
  },
  watch: {
    imgs: 'stateChangeHanlder',
    activeIndex (newVal) {
      Number.isInteger(newVal) && this.view(newVal);
    },
    handledOpts: 'refreshView'
  },
  $_ue_methods: viewerMethods,
  methods: {
    initViewer () {
      this.setReadyState();
      this.$nextTick(() => {
        this.$el.firstChild && (this.$viewer = new Viewer(this.$el.firstChild, this.handledOpts));
      })
    },
    runSelfEventMethods (name, event) {
      switch (name) {
        case 'ready':
          this.setReadyState(true);
          break;
        case 'view':
          this.updateActiveIndex(event);
          break;
      }
    },
    setReadyState (state = false) {
      this.isReady = state;
    },
    updateActiveIndex (event) {
      this.$emit('update:activeIndex', event.detail.index);
    },
    // bussiness
    refreshView () {
      if (this.isReady) {
        this.destroy();
        this.initViewer();
      }
    },
    stateChangeHanlder () {
      if (this.inline) {
        if (this.$slots.default) return;
        this.refreshView()
      } else {
        this.isReady && this.$nextTick(() => {
          this.inline && this.view(0);
          this.update();
        });
      }
    },
    handleThumbSrc (src) {
      const { thumbSrcQuery } = this;
      if (!thumbSrcQuery) return src;
      return typeof thumbSrcQuery === 'function' ? thumbSrcQuery(src) : (src + thumbSrcQuery);
    }
    // events
  },
  beforeDestroy () {
    this.destroy()
  }
}
</script>
<style lang="scss" scoped >
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
    background-color: rgba(0, 0, 0, .3);
    .tip-span {
      color: #ffffff;
      font-size: 16px;
      line-height: 60px;
    }
  }
  .ue-viewer-inner {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
