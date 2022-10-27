<template>
  <ue-paged-table :loading="loading" :columns="columns" :paged-data="pagedData" :get-paged-data="getPagedData"
    height="300" :init-data="{ pageSize: 10 }" created-auto-send>
  </ue-paged-table>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { vwp } from '@wxhccc/ue-element'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const columns = ref([
      { prop: 'id', label: 'Id' },
      { prop: 'title', label: '标题' },
      { prop: 'description', label: '描述' }
    ])

    const pagedData = ref({ rows: [], total: 0 })

    const getPagedData = async (params) => {
      console.log(params)
      const [, data] = await vwp(getRemoteMockData(params), loading)
      pagedData.value = data
    }
    // 模拟接口请求，并动态处理pageSize
    const getRemoteMockData = (params) => new Promise((resolve) => {
      const { current, size } = params
      const data = Array(size || 10).fill(0).map((item, index) => {
        const rand = Math.random()
        return {
          id: (current - 1) * size + index + 1,
          title: rand.toString(26).substring(2),
          description: rand.toString(34).substring(2) + rand.toString(32),
        }
      })
      window.setTimeout(() => {
        resolve({
          rows: data,
          total: 200
        })
      }, 1500)
    })


    return { loading, columns, pagedData, getPagedData }
  }
})
</script>