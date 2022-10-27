<template>
  <ue-scroll-pane class="demo-unique" unique-key="nick" :loading="loading" :data="listData" :total="total"
    :load="getApiData" style="height:200px;">
    <template #default="{ data }">
      <ul class="list" style="margin: 0;">
        <li v-for="item in data" :key="data.nick">
          <p>昵称：{{item.nick}}</p>
          <p>描述：{{item.description}}</p>
        </li>
      </ul>
    </template>
  </ue-scroll-pane>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { vwp } from '@wxhccc/ue-antd-vue'

export default defineComponent({
  setup () {
    const loading = ref(false)

    const state = reactive({
      listData: [],
      total: 0
    })
    let lastPageData = []
    let index = 0

    const getApiData = async () => {
      const [, data] = await vwp(createMockData(), loading)
      state.total = data.total
      state.listData.push(...data.list)
    }
    const createMockData = () => new Promise((resolve) => {
      // 这里模拟每页请求数据有部分在上页已获取
      const data = Array(10 - lastPageData.length).fill(0).map((i, idx) => ({
        nick: 'user' + (index + idx),
        description: Math.random().toString(16).substring(2)
      }))
      index += 10
      const list = lastPageData.concat(data)
      lastPageData = data.slice(-Math.floor(3 * Math.random()))

      window.setTimeout(() => resolve({ list, total: 20 }), 2000)
    })

    getApiData()
  
    return { loading, ...toRefs(state), getApiData }
  }
})
</script>

<style>
.demo-unique {
  box-shadow: 0 0 4px #aeaeae inset;
}
</style>

