<template>
  <el-form :model="formData" ref="form" label-width="80px">
    <p>{{ formData }}</p>
    <ue-form-fields :items="items" v-model="formData">
    </ue-form-fields>
    <el-form-item>
      <ue-form-btns :form="form" is-validate></ue-form-btns>
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent, ref, markRaw } from 'vue'
import { ElSwitch } from 'element-plus'
import {
  createFFIRulesProps,
  createFormFieldItem,
  createInputFormItem,
  createSelectFormItem,
  createRadioGroupFormItem,
  createCheckboxGroupFormItem,
} from '@wxhccc/ue-element'

export default defineComponent({
  setup() {
    const form = ref()
    const formData = ref({})
    const items = [
      createFFIRulesProps(createFFIRulesProps('活动名称'), 'name'),
      createSelectFormItem(createFFIRulesProps('活动区域'), 'region', [
        { value: 'shanghai', label: '区域一' },
        { value: 'beijing', label: '区域二' }
      ], '请选择活动区域'),
      {
        // prop: 'date', 注意这里没有设置prop属性，是为了让子表单项属性上提
        props: {
          label: '活动时间'
        },
        children: [
          {
            prop: 'data',
            props: {
              type: 'date',
              placeholder: '请选择日期'
            },
            field: {
              component: 'ElDatePicker',
            }
          },
          {
            prop: 'time',
            props: {
              placeholder: '请选择时间'
            },
            field: {
              component: 'ElTimePicker',
            }
          }
        ]
      },
      /** 此函数也可用来处理自定义表单域 */
      createFormFieldItem(ElSwitch, '即时配送', 'delivery'),
      createCheckboxGroupFormItem('活动性质', 'type', [
        { value: 1, label: '美食/餐厅线下活动' },
        { value: 2, label: '地推活动' },
        { value: 3, label: '线下主题活动' }
      ], {
        // 绑定值未定义且为非基础类型时，可以设置初始值
        initValue: []
      }),
      createRadioGroupFormItem('特殊资源', 'resource', [
        { value: 1, label: '线上品牌商赞助' },
        { value: 2, label: '线下场地免费' }
      ]),
      createInputFormItem('活动形式', 'desc', { type: 'textarea' })
    ]
    return { form, formData, items }
  }
})
</script>