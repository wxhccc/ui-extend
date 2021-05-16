<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <p>Select-----value: {{selectValue}}</p>
      <ue-common-field :field="selectField" v-model="selectValue">
      </ue-common-field>
    </el-col>
  </el-row>
</template>

<script>
import { h } from 'vue'

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
        dataItemRenader: (item, index) => {
          return h('span', { style: { color: 'red' } }, [item.label + index]);
        }
      }
    }
  }
}
</script>