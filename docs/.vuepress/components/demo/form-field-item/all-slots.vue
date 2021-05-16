<template>
  <el-form :model="formData" inline size="small">
    <ue-form-field-item v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </el-form>
</template>

<script>
import { h, resolveComponent } from 'vue'

export default {
  data () {
    return {
      formData: {
        age: ''
      },
      inputItem: {
        name: 'age',
        props: {
          label: '年龄',
          rules: [
            { required: true, message: '请输入年龄' },
            { type: 'number', message: '请输入有效数字' }
          ]
        },
        slots: {
          label: () => h('span', { style: 'color:red;' }, '年龄'),
          default: () => h(resolveComponent('ElButton'), { icon: 'el-icon-plus' }),
          error: ({error}) => {
            return h(resolveComponent('ElAlert'), { type: 'error' }, error)
          }
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
  }
}
</script>