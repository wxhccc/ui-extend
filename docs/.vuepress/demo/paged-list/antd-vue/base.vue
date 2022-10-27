<template>
  <div class="paded-list-demo-ul">
    填充满容器（容器需有限高度）：<a-switch v-model:checked="flexLayout" checked-children="是" un-checked-children="否"></a-switch>
    <div :style="flexLayout ? { height: '400px' } : {}">
      <ue-paged-list class="paded-list-demo-ul" created-auto-send :flex-layout="flexLayout" :paged-data="pagedData"
        :loading="loading" :get-paged-data="getPagedData">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :title="item.title" :description="item.description">
              <template #avatar>
                <a-avatar src="https://joeschmoe.io/api/v1/random" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </ue-paged-list>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const flexLayout = ref(true)
    const pagedData = ref({ rows: [], total: 0 })

    const getPagedData = async (params) => {
      console.log(params)
      loading.value = true
      pagedData.value = await getRemoteMockData(params)
      loading.value = false
    }
    // 模拟接口请求，并动态处理pageSize
    const getRemoteMockData = (params) => new Promise((resolve) => {
      const { current, size } = params
      const data = Array(size || 10).fill(0).map((item, index) => {
        const rand = Math.random()
        return {
          id: (current - 1) * size + index,
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

    return { flexLayout, loading, pagedData, getPagedData }
  }
})
</script>