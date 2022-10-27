<template>
  <div>
    <div :style="{ position: 'relative', height: '120px' }">
      <ue-loading></ue-loading>
      区域内内容
    </div>
  </div>
</template>

<script>
import { defineComponent, provide } from 'vue'

export default defineComponent({
  setup () {

    provide('UeLoadingOptions', {
      background: 'rgba(0,0,0,0.6)',
      text: '加载中...'
    })
    return {}
  }
})
</script>