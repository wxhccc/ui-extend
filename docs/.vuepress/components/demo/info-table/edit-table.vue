<template>
  <div>
    <el-switch v-model="editable" active-text="编辑模式" inactive-text="展示模式"></el-switch>
    <p>data: --- {{data}}</p>
    <p>value: --- {{value}}</p>
    <el-form ref="form" :model="value">
      <ue-info-table :is-edit="editable" :cells="cells" :data="data" v-model="value"></ue-info-table>
      <ue-form-btns
        v-if="editable"
        :btn-props="{size: 'small'}"
        is-cancel
        :sending="sending"
        :parent-refs="$refs"
        is-validate
        :submit="infoSubmit"
        :cancel="cancelEdit"
      >
      </ue-form-btns>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editable: false,
      sending: false,
      cells: [
        {
          name: 'date', label: '日期', props: { span: 12 },
          canEdit: true,
          fieldProps: {
            field: {
              component: 'ElDatePicker',
              props: {
                valueFormat: 'yyyy-MM-dd',
                placeholder: '请选择日期'
              }
            }
          }
        },
        {
          name: 'name', label: '姓名', props: { span: 12 },
          canEdit: true,
          fieldProps: {
            props: {
              rules: [
                { required: true, message: '请输入姓名' }
              ]
            },
            field: {
              component: 'ElInput',
              props: {
                placeholder: '请选择姓名'
              }
            }
          }
        },
        {
          name: 'address', label: '地址',
          fieldProps: {
            field: {
              component: 'ElInput',
              props: {
                placeholder: '请选择姓名'
              }
            }
          }
        }
      ],
      value: {},
      data: {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
    }
  },
  methods: {
    cancelEdit () {
      this.editable = false
    },
    infoSubmit () {
      this.sending = true
      window.setTimeout(() => {
        Object.assign(this.data, this.value)
        this.cancelEdit()
        this.sending = false
      }, 1000)
    }
  }
}
</script>