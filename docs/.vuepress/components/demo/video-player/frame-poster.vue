<template>
  <div>
    <ue-video-player :src="src"></ue-video-player>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isReady: false,
      src: require('./videos/oceans.mp4')
    }
  }
}
</script>
