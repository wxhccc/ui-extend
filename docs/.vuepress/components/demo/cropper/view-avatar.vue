<template>
  <el-row class="demo-avatar-view">
    <el-col :span="18">
      <ue-cropper type="avatar" :src="src" :options="options" @on-ready="isReady = true"></ue-cropper>
    </el-col>
    <el-col :span="5" :offset="1">
      <div class="preview-pane" style="width: 128px;height:128px;"></div>
      <div class="preview-pane" style="width: 64px;height:64px;"></div>
      <div class="preview-pane" style="width: 32px;height:32px;"></div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      isReady: false,
      src: 'https://oss.sw.wxhice.com/adm/459d9f227ccbbbbaac4a429971f78461.jpg',
      options: {
        preview: '.preview-pane'
      }
    }
  }
}
</script>
<style>
.demo-avatar-view .preview-pane {
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 100%;
  background-color: #eaeaea;
}
</style>
