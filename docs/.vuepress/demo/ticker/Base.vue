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
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      message: '',
      disabled: false
    }
  },
  methods: {
    showInfos () {
      this.message = '发射！'
    }
  }
})
</script>