<template>
  <a-row :gutter="20">
    <a-col :span="12">
      <p>Select-----value: {{ selectValue }}</p>
      <ue-common-field v-bind="selectField" v-model="selectValue">
      </ue-common-field>
    </a-col>
    <a-col :span="12">
      <p>RadioGroup-----value: {{ radioValue }}</p>
      <ue-common-field v-bind="radioField" v-model="radioValue">
      </ue-common-field>
    </a-col>
  </a-row>
</template>

<script>
import { h, ref, defineComponent, markRaw } from 'vue'
import { Radio } from 'ant-design-vue'

const OptionLabel = defineComponent({
  props: {
    label: String,
    value: [String, Number],
    index: Number
  },
  setup(props) {
    return () => h(Radio, props, {
      default: () => h('span', { style: { color: 'red' } }, props.label + props.index)
    })
  }
})

export default defineComponent({
  setup() {
    const selectValue = ref()
    const radioValue = ref(1)

    const selectField = {
      component: 'ASelect',
      props: { style: { width: '120px' } },
      data: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }
      ],
      childComponent: 'ASelectOption',
      /** dataItemRenader是子组件默认插槽的自定义渲染 */
      dataItemRenader(item, index) {
        return h('span', { style: { color: 'red' } }, [item.label + index]);
      }
    }
    const radioField = {
      component: 'ARadioGroup',
      data: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' }
      ],
      /** childComponent是子组件 */
      childComponent: markRaw(OptionLabel)
    }
    return { selectValue, radioValue, selectField, radioField }
  }
})
</script>