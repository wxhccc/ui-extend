<template>
  <div>
    <el-button @click="getTableData">获取table数据</el-button>
    <br/><br/>
    <ue-data-table
      v-loading="loading"
      :columns="columns"
      set-empty-cell
      :data="tableData"
    >
    </ue-data-table>
  </div>
</template>

<script>

const ColorAddress = {
  props: {
    column: Object,
    scope: Object
  },
  render (h) {
    return h('div', {
      attrs: { style: 'color: red;' }
    }, [
      this.scope.row.address
    ])
  }
}

export default {
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  computed: {
    columns () {
      const action = [
        {
          // props可以用函数返回
          props: () => ({ size: 'small' }),
          btype: 'primary',
          // 按钮组件的key属性，设定特定值可避免按钮组件重复渲染
          btnKey: 'edit',
          // 按钮loading状态的标识，如果不设置会使用btnKey
          loadingKey: 'editSending',
          // 按钮loading时的文案
          loadingText: 'saving...',
          text: (row) => (!row.isEdit ? 'edit' : 'save'),
          click: this.editHandle
        },
        {
          // props可以用函数返回
          props: { size: 'small' },
          btnKey: 'editCancel',
          hide: (row) => (!row.isEdit),
          text: 'cancel',
          click: (row) => (row.isEdit = false)
        }
      ]
      return [
        { prop: 'date', label: '日期' },
        { prop: 'name', label: '姓名' },
        { prop: 'address', label: '地址', slotScope: ColorAddress },
        // 没有prop属性的固定列，需要添加columnKey来避免重复渲染
        { action, columnKey: 'action', minWidth: '120', label: '操作', align: 'center' }
      ]
    }
  },
  methods: {
    getTableData () {
      this.loading = true
      window.setTimeout(() => {
        const data = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
        // 这里添加上控制按钮状态的属性
        this.tableData = data.map(item => Object.assign({ isEdit: false, editSending: false }, item))
        this.loading = false
      }, 1500)
    },
    editHandle (row, btn, scope) {
      if (!row.isEdit) {
        row.isEdit = true
      } else {
        row.editSending = true
        window.setTimeout(() => {
          row.editSending = false
          row.isEdit = false
        }, 2000)
      }
    }
  }
}
</script>