<template>
  <a-form :model="formData">
    <p>
      <a-button @click="clearFieldValidate">清除验证状态</a-button>
    </p>
    <ue-form-field-item ref="fieldItem" v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </a-form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { createFFIRulesProps, createInputFormItem } from '@wxhccc/ue-antd-vue'

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