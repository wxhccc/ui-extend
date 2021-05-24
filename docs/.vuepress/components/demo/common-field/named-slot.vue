<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <ue-common-field v-bind="inputField" v-model="inputValue">
      </ue-common-field>
    </el-col>
    <el-col :span="12" :offset="4">
      <ue-common-field v-bind="selectField" v-model="selectValue">
      </ue-common-field>
    </el-col>
  </el-row>
</template>

<script>
import { h, resolveComponent } from 'vue'

const SelectEmpty = {
  props: {
    icon: null,
  },
  render () {
    return h('div',
      { style: { color: 'red', padding: '10px 12px' } },
      [
        h('i', { class: this.icon }),
        '暂无数据'
      ]
    )
  }
}

export default {
  data () {
    return {
      inputValue: '',
      inputField: {
        component: 'ElInput',
        props: { size: 'small' },
        slots: {
          'append': () => h(resolveComponent('ElButton'), {
            icon: 'el-icon-search',
            onClick: this.searchHandler
          })
        }
      },
      selectValue: '',
      selectField: {
        component: 'ElSelect',
        props: () => ({ size: 'small' }),
        data: [],
        slots: {
          'empty': () => h(SelectEmpty, { icon: 'el-icon-search' })
        }
      }
    }
  },
  methods: {
    searchHandler () {
      console.log(this.inputValue)
    }
  }
}
</script>