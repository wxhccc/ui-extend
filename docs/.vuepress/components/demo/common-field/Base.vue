<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <p>Input-----value: {{inputValue}}</p>
      <ue-common-field :field="inputField" v-model="inputValue">
      </ue-common-field>
    </el-col>
    <el-col :span="12" :offset="4">
      <p>Select-----value: {{selectValue}}</p>
      <ue-common-field :field="selectField" v-model="selectValue">
      </ue-common-field>
    </el-col>
    <el-col :span="12">
      <p>RadioGroup-----value: {{radioValue}}</p>
      <ue-common-field :field="radioField" v-model="radioValue">
      </ue-common-field>
    </el-col>
    <el-col :span="12">
      <p>CheckboxGroup<br/>value: {{checkboxValue}}</p>
      <ue-common-field :field="checkboxField" v-model="checkboxValue">
      </ue-common-field>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      inputValue: '',
      inputField: {
        component: 'ElInput',
        props: { size: 'small' }
      },
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
        ]
      },
      radioValue: 1,
      radioField: {
        component: 'ElRadioGroup',
        props: () => ({ size: 'small' }),
        data: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶' },
          { value: '选项3', label: '蚵仔煎' }
        ]
      },
      checkboxValue: [],
      checkboxField: {
        component: 'ElCheckboxGroup',
        data: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶' },
          { value: '选项3', label: '蚵仔煎' }
        ]
      },
    }
  }
}
</script>