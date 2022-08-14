<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <p>Select-----value: {{selectValue}}</p>
      <ue-common-field v-bind="selectField" v-model="selectValue">
      </ue-common-field>
    </el-col>
    <el-col :span="12">
      <p>RadioGroup-----value: {{radioValue}}</p>
      <ue-common-field v-bind="radioField" v-model="radioValue">
      </ue-common-field>
    </el-col>
  </el-row>
</template>

<script>
import { h, defineComponent, markRaw } from 'vue'

const OptionLabel = markRaw(defineComponent({
  props: {
    label: String,
    index: Number
  },
  setup (props) {
    const { label, index } = props;
    return () => h('span', { style: { color: 'red' } }, label + index)
  }
}))

export default defineComponent({
  data () {
    return {
      selectValue: '',
      selectField: {
        component: 'ElSelect',
        props: () => ({ size: 'small' }),
        data: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶' },
          { value: '选项3', label: '蚵仔煎' },
          { value: '选项4', label: '龙须面' },
          { value: '选项5', label: '北京烤鸭' }
        ],
        childComponent: OptionLabel
      },
      radioValue: 1,
      radioField: {
        component: 'ElRadioGroup',
        props: () => ({ size: 'small' }),
        data: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶' },
          { value: '选项3', label: '蚵仔煎' }
        ],
        dataItemRenader (item, index) {
          return h('span', { style: { color: 'red' } }, [item.label + index]);
        }
      }
    }
  }
})
</script>