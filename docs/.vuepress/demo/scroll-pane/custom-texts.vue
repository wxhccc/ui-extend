<template>
  <ue-scroll-pane
    :loading="loading"
    :data="listData"
    :total="total"
    load-ignore-total
    :load="getApiData"
    :tips-texts="tipsTexts"
    style="height:200px;border: 1px solid #aeaeae;"
  >
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
export default {
  data () {
    return {
      loading: false,
      hasTotal: false,
      listData: [],
      tipsTexts: {
        dataEmpty: 'no data',
        noMore: '我是有底线的'
      },
      total: 0
    }
  },
  created () {
    this.getApiData()
  },
  methods: {
    getApiData () {
      this.loading = true
      setTimeout(() => {
        this.listData.push(...this.createMockData())
        this.total = 10
        this.loading = false
      }, 2000)
    },
    createMockData () {
      return Array(8).fill(0).map(() => ({
        nick: Math.random().toString(33).substring(2),
        description: Math.random().toString(16).substring(2)
      }))
    }
  }
}
</script>

