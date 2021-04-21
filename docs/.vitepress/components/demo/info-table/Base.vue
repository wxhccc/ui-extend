<template>
  <ue-info-table :cells="cells" :data="data"></ue-info-table>
</template>

<script>
export default {
  data () {
    return {
       cells: [
        { prop: 'date', label: '日期', props: { span: 12 } },
        { prop: 'name', label: '姓名', props: { span: 12 } },
        { prop: 'address', label: '地址' }
      ],
      data: {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
    }
  }
}
</script>