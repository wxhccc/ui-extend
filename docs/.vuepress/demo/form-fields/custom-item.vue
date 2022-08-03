<template>
  <el-form :model="formData" ref="form" style="width: 80%;" size="small" label-width="80px">
    <p>{{formData}}</p>
    <ue-form-fields :items="items" v-model="formData">
    </ue-form-fields>
  </el-form>
</template>

<script>
import { h } from 'vue'
const CustomField = {
  props: {
    value: Array,
    formItemProps: Object,
    fieldProps: Object
  },
  render () {
    const { formItemProps, fieldProps, value } = this;
    return h('ElFormItem', { props: formItemProps }, [
      h('UeTreeField', { props: { ...fieldProps, value }, on: this.$listeners })
    ])
  }
}

export default {
  data () {
    return {
      formData: {},
      items: [
        {
          prop: 'name',
          props: {
            label: '活动名称',
            rules: [{ required: true, message: '请输入活动名称' }]
          },
          field: {
            component: 'ElInput'
          }
        },
        {
          prop: 'region',
          props: {
            formItemProps: {
              label: '活动区域',
              rules: [{ required: true, message: '请选择活动区域' }]
            },
            fieldProps: {
              data: [{
                label: '一级 1',
                id: 1,
                children: [{
                  label: '二级 1-1',
                  id: 11,
                  children: [{
                    id: 111,
                    label: '三级 1-1-1'
                  }]
                }]
              }, {
                label: '一级 2',
                id: 2,
                children: [{
                  id: 21,
                  label: '二级 2-1',
                  children: [{
                    id: 211,
                    label: '三级 2-1-1'
                  }]
                }, {
                  id: 22,
                  label: '二级 2-2',
                  children: [{
                    id: 221,
                    label: '三级 2-2-1'
                  }]
                }]
              }]
            }
          },
          component: CustomField
        }
      ]
    }
  }
}
</script>