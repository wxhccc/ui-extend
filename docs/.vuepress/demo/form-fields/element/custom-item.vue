<template>
  <el-form :model="formData" ref="form" style="width: 80%;" label-width="80px">
    <p>{{ formData }}</p>
    <ue-form-fields :items="items" v-model="formData">
    </ue-form-fields>
  </el-form>
</template>

<script>
import { defineComponent, h, markRaw } from 'vue'
import { ElFormItem } from 'element-plus'
import { TreeField, createFFIRulesProps, createInputFormItem } from '@wxhccc/ue-element'

const CustomField = defineComponent({
  props: {
    formItemProps: Object,
    fieldProps: Object
  },
  setup(props, { attrs }) {
    return () => {
      return h(ElFormItem, props.formItemProps, {
        default: () => h(TreeField, { ...props.fieldProps, ...attrs })
      })
    }
  }
})

export default defineComponent({
  data() {
    return {
      formData: {},
      items: [
        createInputFormItem(createFFIRulesProps('活动名称'), 'name'),,
        {
          prop: 'region',
          props: {
            formItemProps: {
              label: '活动区域',
              rules: [{ required: true, message: '请选择活动区域' }]
            },
            fieldProps: {
              checkMode: 'one-way',
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
          component: markRaw(CustomField)
        }
      ]
    }
  }
})
</script>