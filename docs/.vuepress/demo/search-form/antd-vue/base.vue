<template>
  <div>
    是否使用按钮触发：<a-switch v-model:checked="buttonTrigger" checked-children="是" un-checked-children="否"></a-switch>
    <p>{{ formData }}</p>
    <ue-search-form v-model="formData" :items="items" :button-trigger="buttonTrigger">
    </ue-search-form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {
  createInputFormItem,
  createSelectFormItem,
  createDateFormItem
} from '@wxhccc/ue-antd-vue'

export default defineComponent({
  setup() {
    const formData = ref({})
    const buttonTrigger = ref(true)
    const items = [
      createInputFormItem('活动名称', 'name'),
      createSelectFormItem('活动区域', 'region', [
        { value: 'shanghai', label: '区域一' },
        { value: 'beijing', label: '区域二' }
      ], '请选择活动区域'),
      createDateFormItem('活动时间', 'date', 'dateRange', { initValue: [] })
    ]

    return {
      formData,
      buttonTrigger,
      items
    }
  }
})
</script>
