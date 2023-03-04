<template>
  <div>
    <ue-info-table bordered :cells="cells" :data="data">
      <template #label="{ cell, data }">
        <i>{{ cell.label }}</i>
      </template>
      <template #name="{ data }">
        {{ data }}
      </template>
    </ue-info-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {

    const cells = ref([
      { prop: 'date', label: '日期', props: { span: 12 }  },
      { prop: 'name', label: '姓名', slotName: 'name', props: { span: 12 } },
      { prop: 'address', label: '地址', props: { span: 24 } }
    ])

    const data = ref({
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    })

    return { cells, data }
  }
})
</script>