<template>
  <ue-paged-list
    class="paded-list-demo-ul"
    created-auto-send
    :paged-data="data"
    :loading="loading"
    :pagination-props="{layout: 'total,sizes,prev,pager,next'}"
    :getPagedData="getPagedData"
  >
    <template #default="{rows}">
      <ul class="list-ul">
        <li v-for="(item, index) in rows">
          <div class="avatar"></div>
          <span>{{item.title}}<br/>{{item.description}}</span>
        </li>
      </ul>
    </template>
    <!-- slot of Pagination -->
    <template #pagination-layout></template>
  </ue-paged-list>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
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
      const { page, size } = params;
      return Array(size || 10).fill(0).map((item, index) => {
        const rand = Math.random()
        return {
          id: (page - 1) * size + index,
          title: rand.toString(26).substring(2),
          description: rand.toString(34).substring(2) + rand.toString(32),
        }
      })
    }
  }
}
</script>
<style>
.paded-list-demo-ul .list-ul {
  height: 400px;
  overflow: auto;
  list-style: none;
}
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
