<template>
  <a-form :model="formData">
    {{ formData }}
    <p>子表单项无label</p>
    <ue-form-field-item v-bind="telphoneItem" v-model="formData.telphone"></ue-form-field-item>
    <p>子表单项有label</p>
    <ue-form-field-item v-bind="optionItem" v-model="formData.option"></ue-form-field-item>
  </a-form>
</template>

<script>
import { defineComponent, ref } from 'vue'

const createInputFormField = (name, props, placeholder = '请输入', colProps) => ({
  name,
  props: Array.isArray(props) ? { rules: props } : props,
  colProps,
  field: {
    component: 'AInput',
    props: {
      placeholder
    }
  }
})

export default defineComponent({
  setup() {
    const formData = ref({
      telphone: {},
      option: {}
    })
    const telphoneItem = {
      name: 'telphone',
      props: {
        label: '住宅电话'
      },
      children: [
        createInputFormField('areaCode', [{ required: true, message: '请输入区号' }], '请输入区号', { span: 6 }),
        createInputFormField('number', [{ required: true, message: '请输入电话号码' }], '请输入电话号码', { span: 18 }),
      ]
    }
    const optionItem = {
      name: 'option',
      props: {
        label: 'Option'
      },
      children: [
        createInputFormField('label', {
          label: 'Label',
          rules: [{ required: true, message: '请输入Label' }]
        }, '请输入Label'),
        createInputFormField('value', {
          label: 'Value',
          rules: [{ required: true, message: '请输入Value' }]
        }, '请输入Value')
      ]
    }
    return {
      formData,
      telphoneItem,
      optionItem
    }
  }
})
</script>