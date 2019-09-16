<template>
  <el-form :model="formData" size="small" label-width="60px">
    年龄表单项表单域区域展示内容：
    <p>
      <el-radio-group v-model="textType">
        <el-radio label="false">不显示文本</el-radio>
        <el-radio label="true">显示文本，值为表单域绑定值</el-radio>
        <el-radio label="text">显示给定内容</el-radio>
        <el-radio label="function">显示给定函数返回值</el-radio>
      </el-radio-group>
    </p>
    <ue-form-field-item v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        age: ''
      },
      textType: 'false',
      textTypeMap: {
        'true': true,
        'false': false,
        'text': '24',
        'function': () => (Math.floor(Math.random() * 100))
      }
    }
  },
  computed: {
    textValue () {
      return this.textTypeMap[this.textType]
    },
    inputItem (){
      return {
        prop: 'age',
        props: {
          label: '年龄'
        },
        text: this.textValue,
        field: {
          component: 'ElInput'
        }
      }
    }
  }
}
</script>