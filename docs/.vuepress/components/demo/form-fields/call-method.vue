<template>
  <el-form :model="formData" label-width="80px">
    <p><el-button size="small" @click="clearFieldValidate">清除验证状态</el-button></p>
    <ue-form-fields ref="formFields" :items="items" v-model="formData">
    </ue-form-fields>
  </el-form>
</template>

<script>

export default {
  data () {
    return {
      formData: {},
      items: [
        {
          name: 'name',
          props: {
            label: '活动名称',
            rules: [{ required: true, message: '请输入活动名称' }]
          },
          field: {
            component: 'ElInput'
          }
        }
      ]
    }
  },
  methods: {
    clearFieldValidate () {
      console.log(12312, this.$refs.formFields)
      this.$refs.formFields.callItemMethod('name', 'clearValidate');
    }
  }
}
</script>