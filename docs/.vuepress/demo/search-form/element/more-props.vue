<template>
  <div>
    <p>{{ formData }}</p>
    <ue-search-form label-width="auto" :items="items" :button-options="buttonOptions" v-model="formData">
    </ue-search-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  createInputFormItem,
  createSelectFormItem,
  createDateFormItem
} from '@wxhccc/ue-element'

export default defineComponent({
  setup() {
    const formData = ref({})
    const buttonOptions = {
      searchBtnProps: { shape: 'success' },
      btnText: '搜索'
    }
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
      buttonOptions,
      items
    }
  }
})

</script>