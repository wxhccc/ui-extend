<template>
  <div>
    <ue-cropper ref="cropper" :src="src" @on-ready="isReady = true"></ue-cropper>
    <br/>
    <template v-if="isReady">
      <el-button type="primary" size="small" @click="getImageData">getImageData</el-button>
      <el-button type="primary" size="small" @click="viewOutput">预览</el-button>
    </template>
    <p style="background-color: #eaeaea;">{{message}}</p>
  </div>
</template>

<script>
import img from './images/picture.jpg'
export default {
  data () {
    return {
      isReady: false,
      message: '',
      src: img
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