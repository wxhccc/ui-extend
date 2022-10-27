<template>
  <div>
    <p>
      是否添加到body：<el-switch
        v-model="appendToBody"
        active-text="是"
        inactive-text="否"
      ></el-switch>
    </p>
    <el-button @click="loadingSwitch">加载</el-button>
    <br /><br />
    <div :style="{ position: 'relative', height: '120px' }">
      <ue-loading
        v-if="loading"
        :body="appendToBody"
        background="rgba(0,0,0,0.6)"
        text="加载中..."
      ></ue-loading>
      区域内内容
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const appendToBody = ref(false)

    const loadingSwitch = () => {
      loading.value = true
      window.setTimeout(() => {
        loading.value = false
      }, 2000)
    }

    return {
      loading,
      appendToBody,
      loadingSwitch
    }
  }
})
</script>
