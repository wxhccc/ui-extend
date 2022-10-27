<template>
  <el-form :model="formData" inline>
    <ue-form-field-item v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </el-form>
</template>

<script>
import { defineComponent, ref, h } from 'vue'
import { ElButton, ElAlert } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

export default defineComponent({
  setup () {
    const formData = ref({ age: '' })

    const inputItem = {
      prop: 'age',
      props: {
        label: '年龄',
        rules: [
          { required: true, message: '请输入年龄' },
          { type: 'number', message: '请输入有效数字' }
        ]
      },
      slots: {
        label: () => h('span', { style: 'color:red;' }, '年龄'),
        default: () => h(ElButton, { icon: Plus }),
        error: ({ error }) => h(ElAlert, { type: 'error' }, { default: () => error })
      },
      field: {
        isNumber: true,
        component: 'ElInput',
        props: {
          placeholder: '请选择年龄'
        }
      }
    }
    return { formData, inputItem }
  }
})
</script>