<template>
  <el-form :model="formData">
    <p>
      <el-button @click="clearFieldValidate">清除验证状态</el-button>
    </p>
    <ue-form-field-item ref="fieldItem" v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </el-form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { createFFIRulesProps, createInputFormItem } from '@wxhccc/ue-element'

export default defineComponent({
  setup() {
    const fieldItem = ref()
    const formData = ref({ age: '' })
    const inputItem = createInputFormItem(createFFIRulesProps('年龄', [
      { type: 'number', message: '请输入有效数字' }
    ]), 'age', { isNumber: true, placeholder: '请输入年龄' })

    const clearFieldValidate = () => {
      fieldItem.value.clearValidate();
    }
    return {
      fieldItem,
      formData,
      inputItem,
      clearFieldValidate
    }
  }
})
</script>