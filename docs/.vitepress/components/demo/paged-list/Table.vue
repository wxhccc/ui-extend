<template>
  <div>
    <el-form inline size="small">
      <p>以下搜索条件自动修改extraForm变量值：</p>
      <el-form-item label="标题">
        <el-input v-model="searchData.title" placeholder="请输入标题搜索"></el-input>
      </el-form-item>
      <p>以下条件需点击按钮手动修改extraForm变量值</p>
      <el-form-item label="描述">
        <el-input v-model="tempData.description" style="width:200px;" placeholder="请输入描述，点击按钮搜索"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="searchDesc">搜索</el-button>
      </el-form-item>
    </el-form>
    <ue-paged-list
      class="paded-list-demo-table"
      created-auto-send
      :paged-data="data"
      :loading="loading"
      :extra-form="searchData"
      :pagination-props="paginationProps"
      :get-paged-data="getPagedData"
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
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      data: {},
      searchData: {
        title: '',
        description: ''
      },
      tempData: {
        description: ''
      },
      paginationProps: {
        layout: 'total,prev,pager,next'
      }
    }
  },
  methods: {
    searchDesc () {
      this.searchData.description = this.tempData.description
    },
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
