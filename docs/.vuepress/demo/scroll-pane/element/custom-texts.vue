<template>
  <ue-scroll-pane :loading="loading" :data="listData" :total="total" :load="getApiData" :tips-texts="tipsTexts"
    style="height:200px;border: 1px solid #aeaeae;">
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
import { vwp } from '@wxhccc/ue-element'

export default defineComponent({
  setup () {
    const loading = ref(false)

    const state = reactive({
      listData: [],
      total: 0,
      tipsTexts: {
        dataEmpty: 'no data',
        noMore: '我是有底线的'
      }
    })

    const getApiData = async () => {
      const [, data] = await vwp(createMockData(), loading)
      state.total = data.total
      state.listData.push(...data.list)
    }
    const createMockData = () => new Promise((resolve) => {
      const list = state.listData.length > 10 ? [] : Array(8).fill(0).map(() => ({
        nick: Math.random().toString(33).substring(2),
        description: Math.random().toString(16).substring(2)
      }))
      window.setTimeout(() => resolve({ list, total: 10 }), 2000)
    })

    getApiData()
  
    return { loading, ...toRefs(state), getApiData }
  }
})
</script>

