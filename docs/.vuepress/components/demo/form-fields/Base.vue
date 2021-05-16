<template>
  <el-form :model="formData" ref="form" style="width: 80%;" size="small" label-width="80px">
    <p>{{formData}}</p>
    <ue-form-fields :items="items" v-model="formData">
    </ue-form-fields>
    <el-form-item>
      <ue-form-btns :form="form" is-validate></ue-form-btns>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const form = ref()
    return { form }
  },
  data () {
    return {
      formData: {},
      items: [
        {
          name: 'name',
          props: {
            label: '活动名称',
            rules: [{ required: true, message: '请输入活动名称' }]
          },
          field: {
            component: 'ElInput'
          }
        },
        {
          name: 'region',
          props: {
            label: '活动区域',
            rules: [{ required: true, message: '请选择活动区域' }]
          },
          field: {
            component: 'ElSelect',
            props: {
              placeholder: '请选择活动区域'
            },
            data: [
              { value: 'shanghai', label: '区域一' },
              { value: 'beijing', label: '区域二' }
            ]
          }
        },
        {
          // prop: 'date', 注意这里没有设置prop属性，是为了让子表单项属性上提
          props: {
            label: '活动时间'
          },
          children: [
            {
              name: 'data',
              props: {
                type: 'date',
                placeholder: '请选择日期'
              },
              field: {
                component: 'ElDatePicker',
              }
            },
            {
              name: 'time',
              props: {
                placeholder: '请选择时间'
              },
              field: {
                component: 'ElTimePicker',
              }
            }
          ]
        },
        {
          name: 'delivery',
          props: {
            label: '即时配送'
          },
          field: {
            component: 'ElSwitch'
          }
        },
        {
          name: 'type',
          props: {
            label: '活动性质'
          },
          field: {
            component: 'ElCheckboxGroup',
            initValue: [], // 绑定值未定义且为非基础类型时，可以设置初始值
            data: [
              { value: 1, label: '美食/餐厅线下活动' },
              { value: 2, label: '地推活动' },
              { value: 3, label: '线下主题活动' }
            ]
          }
        },
        {
          name: 'resource',
          props: {
            label: '特殊资源'
          },
          field: {
            component: 'ElRadioGroup',
            data: [
              { value: 1, label: '线上品牌商赞助' },
              { value: 2, label: '线下场地免费' }
            ]
          }
        },
        {
          name: 'desc',
          props: {
            label: '活动形式'
          },
          field: {
            component: 'ElInput',
            props: {
              type: 'textarea'
            }
          }
        }
      ]
    }
  }
}
</script>