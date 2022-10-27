<template>
  <el-form :model="formData" label-width="80px">
    <p><el-button  @click="clearFieldValidate">清除验证状态</el-button></p>
    <ue-form-fields ref="formFields" :items="items" v-model="formData">
    </ue-form-fields>
  </el-form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { createFFIRulesProps, createInputFormItem } from '@wxhccc/ue-element'

export default defineComponent({
  setup () {
    const formFields = ref()
    const formData = ref({})

    const items = [
      createInputFormItem(createFFIRulesProps('活动名称'), 'name')
    ]

    const clearFieldValidate = () => {
      // 获取所有FormItem组件的引用对象
      const formItems = formFields.value.getFormItemRefs()
      // 用完整的namePath获取对应组件的引用，多层级就是[...prevNames, prop].join('.')
      // 例如prevNames=['list', 0], 那完整namePath就是'list.0.name'
      formItems.name.clearValidate()
    }

    return {
      formFields,
      formData,
      items,
      clearFieldValidate
    }
  }
})
</script>