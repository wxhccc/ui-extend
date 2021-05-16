<template>
  <div>
    <el-form ref="form" :model="formData" size="small">
      <el-form-item required prop="value">
        <el-input v-model="formData.value"></el-input>
      </el-form-item>
    </el-form>
    <ue-form-btns
      :sending="sending"
      :form="form"
      submit-confirm
      :submit="submitHandler"
      :texts="texts"
    >
    </ue-form-btns>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  data () {
    return {
      sending: false,
      formData: {
        value: ''
      },
      texts: {
        sureBtn: '保存',
        sending: '保存中。。。',
        confirmWord: '保存后会覆盖之前数据，确认操作？'
      }
    }
  },
  setup() {
    const form = ref()
    return { form }
  },
  methods: {
    submitHandler () {
      this.apiFetchMock()
    },
    apiFetchMock () {
      this.sending = true
      setTimeout(() => {
        this.sending = false
      }, 2000)
    }
  }
}
</script>