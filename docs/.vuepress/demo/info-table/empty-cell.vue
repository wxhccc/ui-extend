<template>
  <ue-info-table bordered :cells="cells" :data="data"></ue-info-table>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const cells = [
      { prop: 'date', label: '日期', props: { span: 12 } },
      { prop: 'name', label: '姓名', formatter(value) { /* 这里模拟格式化函数忘记返回内容 */ }, props: { span: 12 } },
      { prop: 'address', label: '地址' }
    ]
    const data = ref({
      date: '2016-05-02',
      name: '王小虎',
      address: ''
    })
    return { cells, data }
  }
})
</script>