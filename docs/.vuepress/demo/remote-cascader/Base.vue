<template>
  <div>
    <ue-remote-cascader v-model="values" :is-resolve="isResolve" :load="fetchLevelList" @on-change="getFullData" @change="getValue"></ue-remote-cascader>
    {{values}}
  </div>
</template>

<script>
import { version } from 'element-ui'
export default {
  data () {
    return {
      isResolve: this.versionCompare(version, '2.8.2') === 1,
      values: [],
      data: []
    }
  },
  methods: {
    fetchLevelList (level, curVal, values, curNode) {
      console.log(level, curVal, values, curNode)
      // 这里可以替换成axios等ajax库的接口返回值
      return this.getMockData(level, curVal)
    },
    getMockData (level, curVal) {
      return new Promise(resolve => {
        setTimeout(() => {
          // 数据超过2层后不添加children。对于接口无下一级数据时节点不返回children或设置标识
          const data = Array(Math.floor(2 + 2 * Math.random())).fill(0).map((i, idx) => Object.assign({
            label: `${level + 1}级${curVal ? '-' + curVal : ''}-${idx}`,
            value: Math.pow(10, level) + idx
          }, level < 2 ? { children: [] } : { leaf: true } ))
          resolve(data)
        }, 1000)
      })
    },
    getValue (value) {
      console.log('value:', value)
    },
    getFullData (data) {
      console.log('fullData:', data)
    }
  }
}
</script>