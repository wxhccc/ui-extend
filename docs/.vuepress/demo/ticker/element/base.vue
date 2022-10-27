<template>
  <el-row>
    <el-col :span="12">
      <div>文本显示</div>
      <ue-ticker @timeout="showInfos"></ue-ticker>{{message}}
    </el-col>
    <el-col :span="12">
      <div>配合按钮显示</div>
      <el-button :disabled="disabled" @click="disabled = true">
        <ue-ticker v-if="disabled" @timeout="showInfos"></ue-ticker>
        <span v-else>发送</span>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const message = ref('')
    const disabled = ref(false)
    const showInfos = () => {
      message.value = '发射！'
    }
    return { message, disabled }
  }
})
</script>