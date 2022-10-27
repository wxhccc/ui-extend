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
      size: 'large',
      tip: '加载中...'
    })
    return {}
  }
})
</script>