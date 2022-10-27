<template>
  <div class="paded-list-demo-ul" :style="{ height: '400px' }">
    <ue-paged-list class="paded-list-demo-ul" created-auto-send flex-layout :paged-data="pagedData"
      :loading="loading" :get-paged-data="getPagedData">
      <template #default="{ rows }">
          <ul class="list-ul">
            <li v-for="(item, index) in rows">
              <div class="avatar"></div>
              <span>{{item.title}}<br />{{item.description}}</span>
            </li>
          </ul>
        </template>
    </ue-paged-list>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const pagedData = ref({ rows: [], hasMore: true })

    const getPagedData = async (params) => {
      console.log(params)
      loading.value = true
      pagedData.value = await getRemoteMockData(params)
      console.log(pagedData.value)
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
          hasMore: current < 5
        })
      }, 1500)
    })

    return { loading, pagedData, getPagedData }
  }
})
</script>
<style>
/** 样式定义于base示例中 */
</style>
