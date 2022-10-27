<template>
  <el-form :model="formData" label-width="100px">
    <p>{{ formData }}</p>
    <ue-form-field-item v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
    <ue-form-field-item v-bind="radioItem" v-model="formData.sex"></ue-form-field-item>
    <ue-form-field-item v-bind="selectItem" v-model="formData.food"></ue-form-field-item>
    <ue-form-field-item v-bind="checkboxItem" v-model="formData.interest"></ue-form-field-item>
    <ue-form-field-item v-bind="dateItem" v-model="formData.birthday"></ue-form-field-item>
  </el-form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {
  createFFIRulesProps,
  createInputFormItem,
  createSelectFormItem,
  createRadioGroupFormItem,
  createCheckboxGroupFormItem,
  createDateFormItem
} from '@wxhccc/ue-element'

export default defineComponent({
  setup() {
    const formData = ref({
      age: '',
      sex: '',
      food: '',
      interest: [],
      birthday: ''
    })

    const inputItem = createInputFormItem(createFFIRulesProps('年龄', [
      { type: 'number', message: '请输入有效数字' }
    ]), 'age', { isNumber: true, placeholder: '请输入年龄' })

    const radioItem = createRadioGroupFormItem('性别', 'sex', [
      { value: 'man', label: '男' },
      { value: 'women', label: '女' }
    ])

    const selectItem = createSelectFormItem('喜欢的食物', 'good', [
      { value: '选项1', label: '黄金糕' },
      { value: '选项2', label: '双皮奶' },
      { value: '选项3', label: '蚵仔煎' },
      { value: '选项4', label: '龙须面' },
      { value: '选项5', label: '北京烤鸭' }
    ], '请选择')

    const checkboxItem = createCheckboxGroupFormItem('兴趣爱好', 'interest', [
      { value: 'game', label: '游戏' },
      { value: 'movie', label: '电影' },
      { value: 'paint', label: '绘画' },
    ])

    const dateItem = createDateFormItem('生日', 'birthday', { type: 'date', valueFormat: 'YYYY-MM-DD' })

    return {
      formData,
      inputItem,
      radioItem,
      selectItem,
      checkboxItem,
      dateItem
    }
  }
})
</script>