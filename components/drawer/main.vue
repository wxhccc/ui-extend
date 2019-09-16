<template>
  <transition name="fade" @after-enter="dialogShowSwitch(true)" @leave="dialogShowSwitch(false)">
    <div v-if="loaded" :class="{'ue-drawer': true, 'is-fixed': isFixed}" v-show="visible">
      <div class="drawer-model" @click="handleModelClick"></div>
      <div :class="['ue-drawer-wrapper', truePlacement + '-pane', { 'is-show': slideShow }]" :style="slideBodyStyle">
        <header v-if="title" class="ue-drawer-title">
          <slot name="title">
            <span class="sd-title-span">{{title}}</span>
          </slot>
        </header>
        <ue-button v-if="showClose" type="text" class="close-btn" @click="closeConfirm" icon="el-icon-close"></ue-button>
        <div class="ue-drawer-body">
          <slot></slot>
        </div>
        <footer class="ue-drawer-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { Button } from 'UE/ui-comps';
export default {
  name: 'UeDrawer',
  components: {
    'UeButton': Button
  },
  props: {
    visible: Boolean,
    destroyOnClose: Boolean,
    container: {
      type: null,
      default: 'body'
    },
    showClose: {
      type: Boolean,
      default: true
    },
    maskCloseable: {
      type: Boolean,
      default: true
    },
    title: String,
    placement: {
      type: String,
      default: 'right'
    },
    bodySize: String,
    bodyStyle: Object,
    beforeClose: Function
  },
  data () {
    return {
      loaded: false,
      slideShow: this.visible
    }
  },
  computed: {
    truePlacement () {
      return ['left', 'right', 'top', 'bottom'].includes(this.placement) ? this.placement : 'right';
    },
    defaultStyles () {
      const { truePlacement, bodySize } = this;
      const [width, height] = [bodySize || '40%', bodySize || '200px'];
      return ['left', 'right'].includes(this.truePlacement) ? { width, [truePlacement]: `-${width}` } : { height, [truePlacement]: `-${height}` };
    },
    containerEl () {
      const { document, document: { body } } = window;
      const { container } = this;
      return container
              ? (typeof container === 'string'
                ? (container === 'body' ? body : document.querySelector(container))
                : (typeof container === 'function' ? container() : container))
              : null;
    },
    slideBodyStyle () {
      const { defaultStyles, bodyStyle } = this;
      return Object.assign({}, defaultStyles, bodyStyle);
    },
    isFixed () {
      return this.container === 'body' || this.container === window && window.document && window.document.body
    }
  },
  watch: {
    visible: 'visibleSwitch'
  },
  mounted () {
    this.checkContainer();
    this.visibleSwitch(this.visible);
  },
  destroyed () {
    this.containerEl && this.$el && this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
  },
  methods: {
    /** utils **/
    visibleSwitch (newVal) {
      if (newVal) {
        !this.loaded && (this.loaded = true);
        this.$emit('open');
      }
    },
    checkContainer () {
      const { containerEl } = this;
      containerEl && containerEl.appendChild && containerEl.appendChild(this.$el);
    },
    close () {
      this.closeConfirm();
    },
    /** events **/
    dialogShowSwitch (value) {
      this.slideShow = value;
      this.$emit(value ? 'opened' : 'closed');
    },
    closeConfirm () {
      const { beforeClose, closeDialog } = this;
      typeof beforeClose === 'function' ? beforeClose(closeDialog) : closeDialog();
    },
    closeDialog () {
      this.destroyOnClose && (this.loaded = false);
      this.$emit('update:visible', false);
      this.$emit('close');
    },
    handleModelClick (e) {
      this.maskCloseable && this.closeConfirm();
    }
  }
}
</script>
<style lang="scss">
@mixin full-absolute {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
@mixin full-relative {
  position: relative;
  width: 100%;
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.ue-drawer {
  @include full-absolute;
  &.is-fixed {
    position: fixed;
    z-index: 3000;
  }
  z-index: 10;
  .drawer-model {
    @include full-relative;
    background-color: rgba(0, 0, 0, .4);
    transition: opacity .2s;
  }
  .ue-drawer-title {
    border-bottom: 1px solid #dcdfe6;
    line-height: 38px;
    .sd-title-span {
      padding: 0 20px;
    }
  }
  .ue-drawer-body {
    flex-grow: 1;
    overflow: auto;
  }
  .close-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
  }
  .ue-drawer-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    transition: all .4s ease;
  }
  .left-pane, .right-pane {
    top: 0;
    height: 100%;
  }
  .left-pane {
    &.is-show {
      transform: translateX(100%);
    }
  }
  .right-pane {
    &.is-show {
      transform: translateX(-100%);
    }
  }
  .top-pane, .bottom-pane {
    left: 0;
    width: 100%;
  }
  .top-pane {
    &.is-show {
      transform: translateY(100%);
    }
  }
  .bottom-pane {
    &.is-show {
      transform: translateY(-100%);
    }
  }
}
</style>
