<template>
  <div class="ue-video-palyer">
    <video ref="video" class="video-js vjs-customized">
      <slot></slot>
    </video>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import 'video.js/dist/video-js.css'

const defOpts = {
  controls: true,
  preload: 'auto',
  techCanOverridePoster: true
}

export default defineComponent({
  name: 'UeVideoPlayer',
  components: {},
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    src: {
      type: String,
      default: undefined
    },
    poster: {
      type: String,
      default: undefined
    }
  },
  setup() {
    const player = ref<VideoJsPlayer>()
    return { player }
  },
  computed: {
    size(): UE.Size {
      const { offsetWidth: width, offsetHeight: height } = this.$el || {}
      return { width, height }
    },
    initOpts(): VideoJsPlayerOptions {
      const { src, poster } = this
      const sources = [
        {
          src,
          type: 'video/mp4'
        }
      ]
      return Object.assign(defOpts, this.options, this.size, {
        sources,
        poster
      })
    }
  },
  watch: {
    src() {
      this.player && this.player.src({ src: this.src })
    }
  },
  mounted() {
    this.player = videojs(this.$refs.video, this.initOpts)
  },
  beforeUnmount() {
    this.player && this.player.dispose()
  },
  methods: {
    getVideoFrame() {
      const video = this.$refs.video as HTMLVideoElement
      let canvas = document.createElement('canvas')
      Object.assign(canvas, this.size)
      const ctx = canvas.getContext('2d')
      if (ctx && video) {
        ctx.drawImage(video, 0, 0, this.size.width, this.size.height)
        return canvas.toDataURL()
      }
    }
  }
})
</script>

<style lang="scss">
.ue-video-palyer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  video {
    width: 100%;
    height: 100%;
  }
  .vjs-customized {
    &:hover {
      .vjs-big-play-button {
        background-color: rgba(43, 51, 63, 0.7);
      }
      .vjs-icon-placeholder {
        color: #fe5435;
      }
    }
    .vjs-big-play-button {
      width: 60px;
      height: 60px;
      border: none;
      border-radius: 50%;
      font-size: 34px;
      top: 50%;
      left: 50%;
      margin-left: -30px;
      margin-right: -30px;
    }
    .vjs-icon-placeholder {
      line-height: 60px;
    }
  }
}
</style>
