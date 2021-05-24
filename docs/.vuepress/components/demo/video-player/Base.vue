<template>
  <div>
    <ue-video-player ref="cropper" :src="src" @on-ready="isReady = true"></ue-video-player>
  </div>
</template>

<script>
import video from './videos/oceans.mp4'
export default {
  data () {
    return {
      isReady: false,
      message: '',
      src: video
    }
  },
  methods: {
    getImageData () {
      this.message = this.$refs.cropper.callCropperFn('getImageData')
    },
    async viewOutput () {
      // 这里获取到裁剪图片的文件对象，可以用于上传
      const file = await this.$refs.cropper.getCroppedFile()
      console.log(file)
      // 创建一个本地url在新窗口打开图片
      const url = window.URL.createObjectURL(file)
      window.open(url)
    }
  }
}
</script>