<template>
  <div>
    <ue-viewer ref="viewer" :images="images" style="height: 300px;"></ue-viewer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isReady: false,
      images: [
        'https://oss.sw.wxhice.com/adm/459d9f227ccbbbbaac4a429971f78461.jpg',
        'https://oss.sw.wxhice.com/adm/459d9f227ccbbbbaac4a429971f78462.jpg',
        'https://oss.sw.wxhice.com/adm/459d9f227ccbbbbaac4a429971f78463.jpg'
      ]
    }
  }
}
</script>