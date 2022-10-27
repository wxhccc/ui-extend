<template>
  <div class="demo-paged-table--flex-layout">
    <ue-paged-table flex-layout :loading="loading" :columns="columns" :paged-data="pagedData"
      :get-paged-data="getPagedData" :init-data="{ pageSize: 10 }" created-auto-send>
    </ue-paged-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { vwp } from '@wxhccc/ue-antd-vue'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const columns = ref([
      { dataIndex: 'id', title: 'Id' },
      { dataIndex: 'title', title: '标题' },
      { dataIndex: 'description', title: '描述' }
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

<style>
.demo-paged-table--flex-layout {
  height: 300px;
  overflow: hidden;
  resize: both;
}
</style>