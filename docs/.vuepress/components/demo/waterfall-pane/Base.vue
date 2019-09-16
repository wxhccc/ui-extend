<template>
  <div>
    <el-switch v-model="hasTotal" active-text="有total" inactive-text="无total"></el-switch>
    <ue-waterfall-pane
      class="demo-base"
      :loading="loading"
      :data="listData"
      v-bind="totalProps"
      :load="getApiData"
      style="height:200px;"
      :key="hasTotal"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      hasTotal: false,
      listData: [],
      total: 0
    }
  },
  created () {
    this.getApiData()
  },
  computed: {
    totalProps () {
      return this.hasTotal ? { total: this.total } : {}
    }
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

<style>
.demo-base {
  margin-top: 20px;
  box-shadow: 0 0 4px #aeaeae inset;
}
</style>

