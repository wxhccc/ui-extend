<template>
  <a-form :model="formData" layout="inline">
    <ue-form-field-item v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </a-form>
</template>

<script>
import { defineComponent, ref, h, markRaw } from 'vue'
import { Input, Button, Alert } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  setup () {
    const formData = ref({ age: '' })

    const inputItem = {
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
        default: () => h(Button, null, { icon: () => h(PlusOutlined) }),
        error: ({ error }) => h(Alert, { type: 'error' }, { default: () => error })
      },
      field: {
        isNumber: true,
        component: markRaw(Input),
        props: {
          placeholder: '请选择年龄'
        }
      }
    }
    return { formData, inputItem }
  }
})
</script>