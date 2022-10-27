<template>
  <div>
    <el-button @click="loadingSwitch">加载</el-button>
    <div :style="{ position: 'relative', height: '120px' }">
      <ue-loading v-if="loading"></ue-loading>
      区域内内容
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const loading = ref(false)

    const loadingSwitch = () => {
      loading.value = true
      window.setTimeout(() => {
        loading.value = false
      }, 2000)
    }
    return { loading, loadingSwitch }
  }
})
</script>