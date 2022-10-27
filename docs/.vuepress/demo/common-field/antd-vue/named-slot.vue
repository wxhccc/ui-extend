<template>
  <a-row :gutter="20">
    <a-col :span="8">
      <ue-common-field v-bind="inputField" v-model="inputValue">
      </ue-common-field>
    </a-col>
    <a-col :span="12" :offset="4">
      <ue-common-field v-bind="selectField" v-model="selectValue">
      </ue-common-field>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, h } from 'vue'

const SelectEmpty = {
  props: {
    icon: null,
  },
  setup () {
    return () => h('div',
      { style: { color: 'red', padding: '10px 12px' } },
      '暂无数据'
    )
  }
}

export default defineComponent({
  data () {
    return {
      inputValue: '',
      inputField: {
        component: 'AInput',
        slots: {
          addonAfter: () => h('AButton', { onClick: this.searchHandler }, '搜索')
        }
      },
      selectValue: undefined,
      selectField: {
        component: 'ASelect',
        props: { style: { width: '120px' } },
        data: [],
        slots: {
          notFoundContent: () => h(SelectEmpty)
        }
      }
    }
  },
  methods: {
    searchHandler () {
      console.log(this.inputValue)
    }
  }
})
</script>