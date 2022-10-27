<template>
  <div>
    <ue-remote-cascader v-model="values" :load="fetchLevelList" @full-value-change="getFullData"
      @change="onValueChange">
    </ue-remote-cascader>
    {{ values }}
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const values = ref([])
    const data = ref([])

    const fetchLevelList = (level, curVal, values, curNode) => {
      console.log(level, curVal, values, curNode)
      // 这里可以替换成axios等ajax库的接口返回值
      return getMockData(level, curVal)
    }
    const getMockData = (level, curVal) => new Promise(resolve => {
      window.setTimeout(() => {
        // 数据超过2层后不添加children。对于接口无下一级数据时节点不返回children或设置标识
        const data = Array(Math.floor(2 + 2 * Math.random())).fill(0).map((i, idx) => ({
          label: `${level + 1}级${curVal ? '-' + curVal : ''}-${idx}`,
          value: Math.pow(10, level) + idx,
          ...level < 2 ? { children: [] } : { leaf: true }
        }))
        resolve(data)
      }, 1000)
    })

    const onValueChange = (value) => {
      console.log('value:', value)
    }
    const getFullData = (data) => {
      console.log('fullData:', data)
    }
    return {
      values,
      data,
      onValueChange,
      fetchLevelList,
      getFullData
    }
  }
})
</script>