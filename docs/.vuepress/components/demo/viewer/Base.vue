<template>
  <div>
    <ue-viewer ref="viewer" :imgs="imgs" style="height: 300px;"></ue-viewer>
  </div>
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