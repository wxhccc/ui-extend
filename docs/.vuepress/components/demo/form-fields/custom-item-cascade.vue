<template>
  <el-form :model="formData" ref="form" style="width: 80%;" size="small" label-width="80px">
    <p>{{formData}}</p>
    <ue-form-fields :items="items" v-model="formData">
    </ue-form-fields>
  </el-form>
</template>

<script>
import { h, mergeProps, resolveComponent } from 'vue'
const CustomField = {
  props: {
    modelValue: null,
    formItemProps: Object,
    fieldProps: Object
  },
  data () {
    return {
      cascadeData: {
        'shanghai': [
          { value: '01', label: '店铺主题活动' },
          { value: '02', label: '品牌发布会' }
        ],
        'beijing': [
          { value: '11', label: '地推活动' },
          { value: '12', label: '美食节' }
        ]
      },
      modelData: []
    }
  },
  emit: ['change'],
  methods: {
    handleCascadeChange (value) {
      this.modelData = this.cascadeData[value] || []
    }
  },
  watch: {
    modelValue (newValue, oldValue) {
      newValue !== oldValue && this.$emit('change', newValue)
    }
  },
  render () {
    const { formItemProps, fieldProps, modelValue, modelData } = this;
    const ElOption = resolveComponent('ElOption')
    const ElFormItem = resolveComponent('ElFormItem')
    const ElSelect = resolveComponent('ElSelect')
    const optionNodes = modelData.map(item => h(ElOption, item))
    return h(ElFormItem, formItemProps, {
      default: () => h(ElSelect, mergeProps(this.$attrs, fieldProps, { modelValue }), {
        default: () => optionNodes
      })
    })
  }
}

export default {
  data () {
    return {
      formData: {},
      items: [
        {
          name: 'region',
          props: {
            label: '活动区域'
          },
          field: {
            component: 'ElSelect',
            props: {
              placeholder: '请选择活动区域'
            },
            data: [
              { value: 'shanghai', label: '上海' },
              { value: 'beijing', label: '北京' }
            ]
          }
        },
        {
          name: 'content',
          props: {
            formItemProps: {
              label: '活动内容',
            }
          },
          dependencies: 'region',
          /* 函数调用时会绑定FormFields组件内的this，可以通过$refs拿到本表单项组件实例. */
          cascadeHandler (value, name, modelData, item) {
            /* item是当前对象，这里可以修改item的props将数据传入组件，建议修改数据方式。
            * 也可以调用组件实例上的方法。
            * 这里使用了较为复杂的调用实例的方法的方式。
            */
           console.log(111, name, value)
            this.$refs[name].handleCascadeChange(value)
          },
          component: CustomField
        },
        {
          name: 'prize',
          props: {
            label: '活动奖励'
          },
          dependencies: 'content',
          cascadeData: {
            '01': [
              { value: '奖品1', label: '奖品1' },
              { value: '奖品2', label: '奖品2' }
            ],
            '02': [
              { value: '奖品3', label: '奖品3' },
              { value: '奖品4', label: '奖品4' },
              { value: '奖品5', label: '奖品5' }
            ],
            '11': [
              { value: '奖品6', label: '奖品6' },
              { value: '奖品7', label: '奖品7' },
              { value: '奖品8', label: '奖品8' }
            ],
            '12': [
              { value: '奖品9', label: '奖品9' },
              { value: '奖品10', label: '奖品10' },
              { value: '奖品11', label: '奖品11' }
            ]
          },
          field: {
            component: 'ElRadioGroup',
            data: []
          }
        }
      ]
    }
  }
}
</script>