<template>
  <div>
    restore: {{restore}}
    <el-tabs v-model="curTab">
      <el-tab-pane name="list" label="列表页"></el-tab-pane>
      <el-tab-pane name="detail" label="详情页"></el-tab-pane>
    </el-tabs>
    <div v-if="curTab === 'list'">
      是否进行时序控制：<el-switch v-model="reqControl" active-text="请求控制" inactive-text="不控制"></el-switch>
      <p>请输入内容并选择页面，然后切换到详情页，然后切换回来</p>
      <el-form inline size="small">
        <el-form-item label="标题">
          <el-input v-model="searchData.title" placeholder="请输入标题搜索"></el-input>
        </el-form-item>
      </el-form>
      <ue-paged-list
        ref="pagedList"
        class="paded-list-demo-table"
        created-auto-send
        :paged-data="data"
        :loading="loading"
        :extra-form="searchData"
        :restore="restore"
        need-store
        :pagination-props="paginationProps"
        :getPagedData="getPagedData"
      >
        <template #default="{rows}">
          <el-table :data="rows" height="320">
            <el-table-column label="Id" prop="id"></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
          </el-table>
        </template>
      </ue-paged-list>
    </div>
    <div v-if="curTab === 'detail'">
      假装这个是详情页
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curTab: 'list',
      loading: false,
      data: {},
      restore: false,
      reqControl: true,
      searchData: { title: '' },
      curRequest: 0,
      paginationProps: {
        layout: 'total,prev,pager,next'
      }
    }
  },
  watch: {
    curTab (newVal) {
      if (newVal === 'list') {
        // 回到列表页时重置页面状态
        this.searchData = { title: '' }
        // 如果是需要恢复，则设置搜索条件。注意如果是恢复，上面修改extra-form属性的值不会响应
        if (this.restore) {
          // 搜索条件需要自己恢复，使用SearchForm组件可自动恢复
          this.$nextTick(() => {
            const { params } = this.$refs.pagedList.getStoreData()
            this.searchData.title = params.title
          })
        }
      } else {
        // 离开列表页时设置restore为true
        this.restore = true
      }
    }
  },
  methods: {
    searchDesc () {
      this.searchData.description = this.tempData.description
    },
    getPagedData (params, accessKey) {
      console.log(params, accessKey)
      // 这里记录请求值
      this.curRequest = accessKey
      this.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            rows: this.getRemoteMockData(params),
            total: 200
          })
        }, 500 + Math.random() * 1000)
      }).then(data => {
        // 过期请求不处理
        if (this.reqControl && this.curRequest !== accessKey) return
        console.log(data)
        this.data = data
      }).finally(() => {
        this.loading = false
      })
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
