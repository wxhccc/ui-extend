<template>
  <div>
    <el-switch v-model="editable" active-text="有修改权限" inactive-text="无修改权限"></el-switch>
    <br/><br/>
    <ue-data-table :columns="columns" set-empty-cell :data="tableData"></ue-data-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editable: true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
    columns () {
      const action = [
        {
          props: { size: 'small' },
          text: 'view',
          click (data, btn, scope) { console.log(data, btn, scope) }
        }
      ].concat(this.editable ? [
        {
          btype: 'primary',
          text: (row) => (!row.isEdit ? 'edit' : 'save'),
          click: this.editHandle
        }
      ] : [])
      return [
        { prop: 'date', label: '日期', width: '180' },
        { prop: 'name', label: '姓名' },
        ...(this.editable ? [{ prop: 'address', label: '地址' }] : []),
        // 没有prop属性的固定列，需要添加columnKey来避免重复渲染
        { action, columnKey: 'action', minWidth: '100', label: '操作', align: 'center' }
      ]
    }
  },
  methods: {
    editHandle (row, btn) {
      // 如果不想修改isEdit属性的时候table重新渲染，可以在tableData的row里添加isEdit属性，然后直接修改
      this.$set(row, 'isEdit', !row.isEdit)
    }
  }
}
</script>