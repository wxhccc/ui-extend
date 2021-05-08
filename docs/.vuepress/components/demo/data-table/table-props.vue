<template>
  <div>
    <el-button @click="toggleSelection">取消选择</el-button><br/><br/>
    <ue-data-table
      ref="table"
      size="small"
      height="240"
      :columns="columns"
      :data="data"
      @selection-change="selectionChange"
    >
    </ue-data-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        { type: 'selection' },
        { prop: 'date', label: '日期', width: '180' },
        { 
          prop: 'name', label: '姓名', width: '180',
          formatter (row, column, cellValue, index) {
            return cellValue + row.id + '号'
          } 
        },
        { prop: 'address', label: '地址' }
      ],
      data: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 21,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 41,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 43,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        id: 23,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        id: 43,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        id: 14,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    selectionChange (selection) {
      console.log('selection-change', selection)
    },
    toggleSelection () {
      this.$refs.table.clearSelection();
    }
  }
}
</script>