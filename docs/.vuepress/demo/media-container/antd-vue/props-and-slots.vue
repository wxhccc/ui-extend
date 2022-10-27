<template>
  <div>
    <a-switch v-model:checked="showBackgroud" checked-children="显示背景" un-checked-children="隐藏背景"></a-switch>
    <br /><br />
    <div class="demo-media-container-box2">
      <ue-media-container :src="src" auto-fit :show-backgroud="showBackgroud">
        <template #default="{ size, mediaSize }">
          <p>灰色蒙层是内部容器区域，和媒体实际可视区等比例</p>
          <p>内部容器尺寸：{{ size }}</p>
          <p>媒体文件原始尺寸：{{ mediaSize }}</p>
        </template>
      </ue-media-container>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const showBackgroud = ref(true)
    const src = ref('https://oss.sw.wxhice.com/adm/459d9f227ccbbbbaac4a429971f78461.jpg')

    return { showBackgroud, src }
  }
})
</script>

<style>
.demo-media-container-box2 {
  width: 500px;
  height: 320px;
  resize: both;
  overflow: hidden;
  border: 1px solid #eaeaea;
}

.demo-media-container-box2 .media-content-cover {
  background-color: rgba(0, 0, 0, 0.4);
  color: #ffffff;
}
</style>