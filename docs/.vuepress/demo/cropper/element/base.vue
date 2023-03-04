<template>
  <div>
    <ue-cropper ref="cropper" :src="src" @ready="isReady = true"></ue-cropper>
    <br />
    <template v-if="isReady">
      <el-button type="primary" @click="getImageData">getImageData</el-button>
      <el-button type="primary" @click="viewOutput">预览</el-button>
    </template>
    <p style="border: 1px solid #eaeaea;">{{ message }}</p>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const cropper = ref()
    const isReady = ref(false)
    const message = ref('')
    const src = ref('https://oss.sw.wxhice.com/adm/73d924459e72b343d636d3ba170b61d2.jpg')

    const getImageData = () => {
      message.value = cropper.value.callCropperMethod('getImageData')
    }
    const viewOutput = async () => {
      // 这里获取到裁剪图片的文件对象，可以用于上传
      const file = await cropper.value.getCroppedFile()
      console.log(file)
      // 创建一个本地url在新窗口打开图片
      const url = window.URL.createObjectURL(file)
      window.open(url)
    }
    return {
      cropper,
      isReady,
      message,
      src,
      getImageData,
      viewOutput
    }
  }
})
</script>