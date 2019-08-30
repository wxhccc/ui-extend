<template>
  <ue-paged-table
    :loading="loading"
    :columns="columns"
    :paged-data="data"
    :get-paged-data="getPagedData"
    height="300"
    :init-data="{ pageSize: 10 }"
    created-auto-send
  >
  </ue-paged-table>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      columns: [
        { prop: 'id', label: 'Id' },
        { prop: 'title', label: '标题' },
        { prop: 'description', label: '描述' }
      ],
      data: {}
    }
  },
  methods: {
    getPagedData (params) {
      console.log(params)
      this.loading = true
      setTimeout(() => {
        this.data = {
          rows: this.getRemoteMockData(params),
          total: 200
        }
        this.loading = false
      }, 1500)
    },
    // 模拟接口请求，并动态处理pageSize
    getRemoteMockData (params) {
      const { page, size, title, description } = params;
      return Array(size || 10).fill(0).map((item, index) => {
        const rand = Math.random()
        return {
          id: (page - 1) * size + index + 1,
          title: title + rand.toString(26).substring(2),
          description: description + rand.toString(34).substring(2) + rand.toString(32),
        }
      })
    }
  }
}
</script>