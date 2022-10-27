<template>
  <div class="demo-media-container-box1">
    <ue-media-container :src="src" auto-fit></ue-media-container>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const src = ref('https://oss.sw.wxhice.com/adm/459d9f227ccbbbbaac4a429971f78461.jpg')

    return { src }
  }
})
</script>

<style>
.demo-media-container-box1 {
  width: 400px;
  height: 280px;
  resize: both;
  overflow: hidden;
}
</style>