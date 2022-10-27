<template>
  <el-form :model="formData" label-width="60px">
    年龄表单项表单域区域展示内容：
    <p>
      <el-radio-group v-model="textType">
        <el-radio label="false">不显示文本</el-radio>
        <el-radio label="true">显示文本，值为表单域绑定值</el-radio>
        <el-radio label="text">显示给定内容</el-radio>
        <el-radio label="function">显示给定函数返回值</el-radio>
      </el-radio-group>
    </p>
    <ue-form-field-item v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </el-form>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { createInputFormItem } from '@wxhccc/ue-element'

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