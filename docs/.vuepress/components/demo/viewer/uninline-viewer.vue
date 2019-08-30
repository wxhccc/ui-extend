<template>
  <ue-viewer ref="viewer" :inline="false">
    <ul style="height: 320px;overflow: auto;border:1px solid #aeaeae;">
      <li v-for="(item, index) in imgs">
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
      imgs: [
        require('./images/picture.jpg'),
        require('./images/picture1.jpg'),
        require('./images/picture2.jpg')
      ]
    }
  }
}
</script>