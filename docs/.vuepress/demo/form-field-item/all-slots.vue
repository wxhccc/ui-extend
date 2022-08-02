<template>
  <el-form :model="formData" inline size="small">
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
      inputItem: {
        prop: 'age',
        props: {
          label: '年龄',
          rules: [
            { required: true, message: '请输入年龄' },
            { type: 'number', message: '请输入有效数字' }
          ]
        },
        slots: {
          label: {
            component (h, vdo, slotName, { label }) {
              return h('span', { style: 'color:red;', ...vdo }, label)
            }
          },
          default: {
            props: { icon: 'el-icon-plus' },
            component: 'ElButton'
          }
        },
        scopedSlots: {
          error: ({error}) => {
            return this.$createElement('ElAlert', { props: { type: 'error' } }, error)
          }
        },
        field: {
          isNumber: true,
          component: 'ElInput',
          props: {
            placeholder: '请选择年龄'
          }
        }
      }
    }
  }
}
</script>