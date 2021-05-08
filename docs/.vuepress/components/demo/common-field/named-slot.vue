<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <ue-common-field :field="inputField" v-model="inputValue">
      </ue-common-field>
    </el-col>
    <el-col :span="12" :offset="4">
      <ue-common-field :field="selectField" v-model="selectValue">
      </ue-common-field>
    </el-col>
  </el-row>
</template>

<script>

const SelectEmpty = {
  props: {
    icon: null,
  },
  render (h) {
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
          'append': {
            props: { icon: 'el-icon-search' },
            events: {
              click: this.searchHandler
            },
            component (h, vdo, slotName) {
              // vdo是利用props和events整理后的Vue Data Object。也可以直接在函数里传入。
              return h('ElButton', vdo, [''])
            }
          } 
        }
      },
      selectValue: '',
      selectField: {
        component: 'ElSelect',
        props: () => ({ size: 'small' }),
        data: [],
        slots: {
          'empty': {
            props: { icon: 'el-icon-search' },
            component: SelectEmpty
          } 
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