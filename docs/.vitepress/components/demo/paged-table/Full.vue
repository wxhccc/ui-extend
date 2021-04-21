<template>
  <div>
    <el-form inline size="small">
      <el-form-item label="标题">
        <el-input v-model="tempData.title" placeholder="请输入标题搜索"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="tempData.description" style="width:200px;" placeholder="请输入描述，点击按钮搜索"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button :loading="loading" @click="searchSend">搜索</el-button>
      </el-form-item>
    </el-form>
    <p>extra-form: {{searchData}}<br/>
    selection-value: {{ selectionValue }}</p>
    <ue-paged-table
      row-key="id"
      :loading="loading"
      :columns="columns"
      :paged-data="data"
      :extra-form="searchData"
      :get-paged-data="getPagedData"
      height="300"
      :init-data="{ pageSize: 10 }"
      :selection-value.sync="selectionValue"
      created-auto-send
    >
    </ue-paged-table>
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
      selectionValue: [],
      tempData: {
        title: '',
        description: ''
      },
      columns: [
        { selection: 'checkbox', columnKey: 'selection' },
        { prop: 'id', label: 'Id' },
        { prop: 'title', label: '标题', sortable: 'custom' },
        { prop: 'description', label: '描述' }
      ],
      paginationProps: {
        layout: 'total,prev,pager,next'
      }
    }
  },
  methods: {
    searchSend () {
      Object.assign(this.searchData, this.tempData)
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
