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
      src: 'https://oss.sw.wxhice.com/adm/oceans.mp4'
    }
  }
}
</script>
