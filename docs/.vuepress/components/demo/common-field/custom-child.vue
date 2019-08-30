<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <p>Select-----value: {{selectValue}}</p>
      <ue-common-field :field="selectField" v-model="selectValue">
      </ue-common-field>
    </el-col>
    <el-col :span="12">
      <p>RadioGroup-----value: {{radioValue}}</p>
      <ue-common-field :field="radioField" v-model="radioValue">
      </ue-common-field>
    </el-col>
  </el-row>
</template>

<script>

const OptionLabel = {
  props: {
    item: Object,
    index: Number
  },
  render (h) {
    const { item, index } = this;
    return h('span', { style: { color: 'red' } }, [item.label + index])
  }
}

export default {
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
        dataItemContent: OptionLabel
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
        dataItemContent (h, item, index) {
          return h('span', { style: { color: 'red' } }, [item.label + index]);
        }
      }
    }
  }
}
</script>