<template>
  <div>
    <el-form ref="form1" :model="formData" size="small">
      <el-form-item required prop="value">
        <el-input v-model="formData.value"></el-input>
      </el-form-item>
    </el-form>
    <ue-form-btns
      :sending="sending"
      :parent-refs="$refs"
      ref-key="form1"
      submit-confirm
      :submit="submitHandler"
      :texts="texts"
    >
    </ue-form-btns>
  </div>
</template>

<script>
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