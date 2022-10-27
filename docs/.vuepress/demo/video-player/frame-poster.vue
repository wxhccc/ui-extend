<template>
  <div>
    <ue-video-player :src="src"></ue-video-player>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      isReady: false,
      src: 'https://oss.sw.wxhice.com/adm/oceans.mp4'
    }
  }
})
</script>
