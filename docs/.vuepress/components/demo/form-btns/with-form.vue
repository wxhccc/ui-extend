<template>
  <el-form ref="form" :model="formData" size="small">
    <el-form-item label="姓名:" required prop="value">
      <el-input v-model="formData.value"></el-input>
    </el-form-item>
    <el-form-item>
      <ue-form-btns
        :form="formRef"
        is-validate
        :btn-keys="btnKeys"
        :submit="submitHandler"
      >
      </ue-form-btns>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      formRef: null,
      formData: {
        value: ''
      },
      btnKeys: ['reset', 'submit']
    }
  },
  mounted() {
    this.formRef = this.$refs.form
  },
  methods: {
    submitHandler () {
      console.log('submit')
    }
  }
}
</script>