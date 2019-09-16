<template>
  <div class="ue-cropper">
    <img v-show="src" :src="src" />
    <slot name="init">
      <div v-if="!isReady" class="initing-model">
        <span class="tip-span">{{initTip}}</span>
      </div>
    </slot>
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const defOptsCreator = (type) => {
  const typeOpts = {
    avatar: { 
      aspectRatio: 1
    }
  }
  return Object.assign({
    viewMode: 2,
  }, typeOpts[type])
}
export default {
  name: 'UeCropper',
  props: {
    src: [String],
    type: String,
    initTip: {
      type: String,
      default: 'cropper is initializing...'
    },
    options: Object
  },
  data () {
    return {
      isReady: false,
      $cropper: null
    }
  },
  mounted () {
    this.src && this.initCropper()
  },
  beforeDestroy () {
    this.$cropper && this.$cropper.destroy()
  },
  computed: {
    defOpts () {
      return defOptsCreator(this.type)
    },
    handledEvents () {
      let events = {};
      const eventNames = ['ready', 'cropstart', 'cropmove', 'cropend', 'crop', 'zoom'];
      eventNames.forEach(name => {
        events[name] = (event) => {
          this.options && typeof this.options[name] === 'function' && this.options[name](event);
          name === 'ready' && this.setReadyState(true);
          this.$emit('on-' + name, event);
        }
      });
      return events;
    },
    handledOpts () {
      return Object.assign({}, this.defOpts, this.options, this.handledEvents);
    }
  },
  watch: {
    src: 'urlChange',
    options: {
      handler: 'resetCropper',
      deep: true
    }
  },
  methods: {
    // utils
    initCropper () {
      this.$nextTick(() => {
        this.$el.firstChild && (this.$cropper = new Cropper(this.$el.firstChild, this.handledOpts))
      })
    },
    setReadyState (state = false) {
      this.isReady = state;
    },
    urlChange () {
      this.setReadyState();
      this.$cropper ? this.$cropper.replace(this.src) : this.initCropper()
    },
    resetCropper () {
      this.$cropper && this.$nextTick(() => { this.$cropper.reset() })
    },
    getCroppedFile () {
      return new Promise(resolve => {
        this.callCropperFn('getCroppedCanvas').toBlob(resolve)
      });
    },
    callCropperFn (fn, ...args) {
      const { $cropper } = this;
      if ($cropper && typeof $cropper[fn] === 'function') return $cropper[fn](...args);
    }
    // events
  }
}
</script>
<style lang="scss" scoped >
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
    background-color: rgba(0, 0, 0, .3);
    .tip-span {
      color: #ffffff;
      font-size: 16px;
      line-height: 60px;
    }
  }
}
</style>
