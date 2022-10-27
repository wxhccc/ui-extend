<template>
  <div>
    <p>
      是否添加到body：<a-switch
        v-model:checked="appendToBody"
        checked-children="是"
        un-checked-children="否"
      ></a-switch>
    </p>
    <a-button @click="loadingSwitch">加载</a-button>
    <br /><br />
    <div :style="{ position: 'relative', height: '120px' }">
      <ue-loading
        v-if="loading"
        :body="appendToBody"
        tip="加载中..."
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
