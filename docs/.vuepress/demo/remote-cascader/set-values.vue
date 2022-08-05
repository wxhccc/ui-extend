<template>
  <div>
    <el-button type="primary" @click="getSaveValues">获取接口数据回填</el-button>
    <el-button @click="clearValues">清空数据</el-button>
    <p>使用<b>init-first-change</b>属性来回填</p>
    <ue-remote-cascader ref="rc1" v-model="values" init-first-change :load="fetchLevelList"></ue-remote-cascader>
    value: {{values}}<br/>
    <p>使用<b>init-value</b>属性来回填</p>
    <ue-remote-cascader ref="rc2" v-model="values1" :init-value="initValue1" :load="fetchLevelList"></ue-remote-cascader>
    value: {{values1}}   init-value: {{initValue1}}<br/>
    <p>回填时使用<b>init-in-order</b>来获取上一级数据对象</p>
    <ue-remote-cascader ref="rc3" v-model="values2" init-first-change init-in-order :load="fetchLevelList"></ue-remote-cascader>
    value: {{values2}}<br/>
  </div>
</template>

<script>

export default {
  data () {
    return {
      values: [],
      values1: [],
      initValue1: [],
      values2: []
    }
  },
  methods: {
    clearValues () {
      this.values = []
      this.values2 = []
      this.initValue1 = []
      this.$refs.rc1.modifyOptions(options => {
        console.log(options);
      })
    },
    getSaveValues () {
      window.setTimeout(() => {
        const data = () => ([1, 10, 100])
        this.values = data()
        this.values2 = data()
        this.initValue1 = data()
      })
    },
    fetchLevelList (level, curVal, values, curNode) {
      // 使用init-in-order时，curNode可以获取到上一级的数据对象
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
          }, level < 2 ? { children: [] } : { leaf: true }))
          resolve(data)
        }, 1000)
      })
    }
  }
}
</script>