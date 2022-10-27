<template>
  <a-row :gutter="20">
    <a-col :span="8">
      <p>Input-----value: {{ inputValue }}</p>
      <ue-common-field v-bind="inputField" v-model="inputValue">
      </ue-common-field>
    </a-col>
    <a-col :span="12" :offset="4">
      <p>Select-----value: {{ selectValue }}</p>
      <ue-common-field v-bind="selectField" v-model="selectValue">
      </ue-common-field>
    </a-col>
    <a-col :span="12">
      <p>RadioGroup-----value: {{ radioValue }}</p>
      <ue-common-field v-bind="radioField" v-model="radioValue">
      </ue-common-field>
    </a-col>
    <a-col :span="12">
      <p>CheckboxGroup<br />value: {{ checkboxValue }}</p>
      <ue-common-field v-bind="checkboxField" v-model="checkboxValue">
      </ue-common-field>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      inputValue: '',
      inputField: {
        component: 'AInput'
      },
      selectValue: undefined,
      selectField: {
        component: 'ASelect',
        props: { placeholder: '请选择' },
        data: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶' },
          { value: '选项3', label: '蚵仔煎' },
          { value: '选项4', label: '龙须面' },
          { value: '选项5', label: '北京烤鸭' }
        ]
      },
      radioValue: 1,
      radioField: {
        component: 'ARadioGroup',
        props: { size: 'small' },
        data: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶' },
          { value: '选项3', label: '蚵仔煎' }
        ]
      },
      checkboxValue: [],
      checkboxField: {
        component: 'ACheckboxGroup',
        props: () => ({ size: 'small' }),
        data: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶' },
          { value: '选项3', label: '蚵仔煎' }
        ]
      },
    }
  }
})
</script>