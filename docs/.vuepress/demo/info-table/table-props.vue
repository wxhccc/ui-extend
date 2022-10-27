<template>
  <ue-info-table bordered :cells="cells" :data="data"></ue-info-table>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const cells = [
      { prop: 'date', label: '备注日期', value: '2012-12-12', props: { lg: 12, sm: 24 } },
      {
        prop: 'name',
        label: '姓名',
        props: { lg: 12, sm: 24 },
        formatter(value, data) {
          return value + '(' + data.prof + ')';
        }
      },
      { prop: 'address', label: '地址', props: { lg: 8, sm: 24 } },
      { prop: 'remark', label: '备注', props: { lg: 16, sm: 24 } }
    ]
    const data = ref({
      date: '2016-05-02',
      name: '王小虎',
      prof: '学生',
      address: '上海市普陀区金沙江路 1518 弄',
      remark: 'Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。'
    })
    return { cells, data }
  }
})
</script>