<template>
  <ue-viewer ref="viewer" :inline="false">
    <ul style="height: 320px;overflow: auto;border:1px solid #aeaeae;">
      <li v-for="(item, index) in images" :key="index">
        <img :src="item" alt="" />
      </li>
    </ul>
  </ue-viewer>
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