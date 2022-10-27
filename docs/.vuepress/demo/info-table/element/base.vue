<template>
  <div>
    <el-switch v-model="hasBorder" active-text="显示边框" inactive-text="隐藏边框"></el-switch>
    <br /><br />
    <ue-info-table :bordered="hasBorder" :cells="cells" :data="data"></ue-info-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const hasBorder = ref(false)

    const cells = ref([
      { prop: 'date', label: '日期', props: { span: 12 } },
      { prop: 'name', label: '姓名', props: { span: 12 } },
      { prop: 'address', label: '地址' }
    ])

    const data = ref({
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    })

    return { hasBorder, cells, data }
  }
})
</script>