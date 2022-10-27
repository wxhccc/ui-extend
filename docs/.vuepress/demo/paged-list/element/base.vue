<template>
  <div class="paded-list-demo-ul">
    填充满容器（容器需有限高度）：<el-switch v-model="flexLayout" active-text="是" inactive-text="否"></el-switch>
    <div :style="flexLayout ? { height: '400px' } : {}">
      <ue-paged-list created-auto-send :paged-data="pagedData" :flex-layout="flexLayout" :loading="loading"
        :pagination="{ layout: 'total,sizes,prev,pager,next,slot' }" :get-paged-data="getPagedData">
        <template #default="{ rows }">
          <ul class="list-ul">
            <li v-for="(item, index) in rows">
              <div class="avatar"></div>
              <span>{{item.title}}<br />{{item.description}}</span>
            </li>
          </ul>
        </template>
        <template #paginationLayout>分页插槽</template>
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
<style>
.paded-list-demo-ul .list-ul li {
  padding: 8px 0;
  border-bottom: 1px solid #aeaeae;
}

.paded-list-demo-ul .avatar {
  display: inline-block;
  margin-right: 20px;
  width: 64px;
  height: 64px;
  border-radius: 4px;
  background-color: #eaeaea;
}

.paded-list-demo-ul .list-ul li span {
  display: inline-block;
  vertical-align: top;
}
</style>
