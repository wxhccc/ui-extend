<template>
  <el-form :model="formData" inline size="small">
    <p>{{formData}}</p>
    <ue-form-field-item v-bind="selectItem" v-model="formData.sex"></ue-form-field-item>
    <ue-form-field-item v-bind="inputItem" v-model="formData.age"></ue-form-field-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        sex: '',
        age: ''
      },
      inputItem: {
        prop: 'age',
        props: {
          label: '年龄',
          rules: [
            { required: true, message: '请输入年龄' },
            { type: 'number', message: '请输入有效数字' }
          ]
        },
        field: {
          isNumber: true,
          component: 'ElInput',
          props: {
            placeholder: '请选择年龄'
          }
        }
      },
      selectItem: {
        props: {
          label: '性别',
          rules: [
            { required: true, message: '请选择年龄' }
          ]
        },
        field: {
          component: 'ElSelect',
          props: {
            placeholder: '请选择性别'
          },
          data: [
            { value: 'man', label: '男' },
            { value: 'women', label: '女' }
          ]
        }
      }
    }
  }
}
</script>