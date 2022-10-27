<template>
  <a-form :model="formData" :wrapper-col="{ span: 10 }">
    <p>{{ formData }}</p>
    <ue-form-field-item v-bind="selectItem" v-model="formData.sex"></ue-form-field-item>
    <ue-form-field-item v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </a-form>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      formData: {
        sex: '',
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
        field: {
          isNumber: true,
          component: 'AInput',
          props: {
            placeholder: '请输入年龄'
          }
        }
      },
      selectItem: {
        props: {
          label: '性别',
          rules: [
            { required: true, message: '请选择年龄' }
          ]
        },
        name: 'sex',
        field: {
          component: 'ASelect',
          props: {
            placeholder: '请选择性别'
          },
          data: [
            { value: 'man', label: '男' },
            { value: 'women', label: '女' }
          ]
        }
      }
    }
  }
})
</script>