<template>
  <el-form :model="formData">
    <p><el-button size="small" @click="clearFieldValidate">清除验证状态</el-button></p>
    <ue-form-field-item ref="formFieldItem" v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </el-form>
</template>

<script>

export default {
  data () {
    return {
      formData: {
        age: ''
      },
      inputItem: {
        prop: 'age',
        props: {
          label: '年龄',
          rules: [
            { required: true, message: '请输入年龄' },
            { type: 'number', message: '请输入有效数字' }
          ]
        },
        field: {
          isNumber: true,
          component: 'ElInput',
          props: {
            placeholder: '请选择年龄'
          }
        }
      }
    }
  },
  methods: {
    clearFieldValidate () {
      this.$refs.formFieldItem.clearValidate();
    }
  }
}
</script>