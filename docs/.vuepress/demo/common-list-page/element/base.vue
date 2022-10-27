<template>
  <div>
    selection value: {{ selectionValue }}
    <ue-common-list-page
      v-model:selection-value="selectionValue"
      :loading="loading"
      :init-data="{ pageSize: 10 }"
      created-auto-send
      :flex-layout="false"
      :columns="columns"
      :paged-data="pagedData"
      :search-forms="searchForms"
      :get-paged-data="getPagedData"
    >
    </ue-common-list-page>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {
  vwp,
  createInputFormItem,
  createSelectFormItem,
  createDateFormItem
} from '@wxhccc/ue-element'

export default defineComponent({
  setup() {
    const loading = ref(false)

    const selectionValue = ref([])

    const pagedData = ref({ rows: [], total: 0 })

    const columns = [
      { prop: 'id', selection: 'checkbox' },
      { prop: 'id', label: 'Id' },
      { prop: 'type', label: '类型' },
      { prop: 'title', label: '标题' },
      { prop: 'description', label: '描述' }
    ]

    const searchForms = {
      size: 'small',
      labelWidth: '80px',
      items: [
        createInputFormItem('标题', 'title'),
        createSelectFormItem('类型', 'type', [
          { value: '文章', label: '文章' },
          { value: '帖子', label: '帖子' }
        ]),
        createDateFormItem('活动时间', 'date', 'dateRange', { initValue: [] })
      ]
    }

    const getPagedData = async (params) => {
      console.log(params)
      const [err, data] = await vwp(getRemoteMockData(params), loading)
      pagedData.value = data
    }
    // 模拟接口请求，并动态处理pageSize
    const getRemoteMockData = (params) => new Promise((resolve) => {
      const { current, size, title, description, type } = params
      const data = Array(size || 10).fill(0).map((item, index) => {
        const rand = Math.random()
        return {
          id: (current - 1) * size + index + 1,
          type: type || (rand > 0.5 ? '文章' : '帖子'),
          title: (title || '') + rand.toString(26).substring(2),
          description: (description || '') + rand.toString(34).substring(2) + rand.toString(32)
        }
      })
      window.setTimeout(() => {
        resolve({
          rows: data,
          total: 200
        })
      }, 1500)
    })

    return {
      loading,
      columns,
      searchForms,
      selectionValue,
      pagedData,
      getPagedData
    }
  }
})
</script>