<template>
  <a-form :model="formData">
    年龄表单项表单域区域展示内容：
    <p>
      <a-radio-group v-model:value="textType">
        <a-radio value="false">不显示文本</a-radio>
        <a-radio value="true">显示文本，值为表单域绑定值</a-radio>
        <a-radio value="text">显示给定内容</a-radio>
        <a-radio value="function">显示给定函数返回值</a-radio>
      </a-radio-group>
    </p>
    <ue-form-field-item v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </a-form>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { createInputFormItem } from '@wxhccc/ue-antd-vue'

export default defineComponent({
  setup() {
    const formData = ref({
      age: ''
    })
    const textType = ref('false')
    const textTypeMap = {
      'true': true,
      'false': false,
      'text': '24',
      'function': () => (Math.floor(Math.random() * 100))
    }
    const textValue = computed(() => textTypeMap[textType.value])

    const inputItem = computed(() => createInputFormItem('年龄', 'age', '请输入', { text: textValue.value }))
    return {
      formData,
      textType,
      inputItem
    }
  }
})
</script>