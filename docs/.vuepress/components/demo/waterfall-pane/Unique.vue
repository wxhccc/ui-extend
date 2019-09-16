<template>
  <ue-waterfall-pane
    class="demo-unique"
    unique-key="nick"
    :loading="loading"
    :data="listData"
    :load="getApiData"
    style="height:200px;"
  >
    <template #default="{ data }">
      <ul class="list" style="margin: 0;">
        <li v-for="item in data" :key="data.nick">
          <p>昵称：{{item.nick}}</p>
          <p>描述：{{item.description}}</p>
        </li>
      </ul>
    </template>
  </ue-waterfall-pane>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      hasTotal: false,
      listData: [],
      lastPageData: [],
      total: 0,
      index: 0
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
        this.total = 20
        this.loading = false
      }, 2000)
    },
    createMockData () {
      // 这里模拟每页请求数据有部分在上页已获取
      const data = Array(10 - this.lastPageData.length).fill(0).map((i, idx) => ({
        nick: 'user' + (this.index + idx),
        description: Math.random().toString(16).substring(2)
      }))
      this.index += 10
      const curPageData = this.lastPageData.concat(data)
      this.lastPageData = data.slice(-Math.floor(3 * Math.random()))
      return curPageData
    }
  }
}
</script>

<style>
.demo-unique {
  box-shadow: 0 0 4px #aeaeae inset;
}
</style>

