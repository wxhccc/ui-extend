<template>
  <div>
    是否使用按钮触发：<el-switch v-model="buttonTrigger" active-text="是" inactive-text="否"></el-switch>
    <p>{{formData}}</p>
    <ue-search-form v-model="formData" :items="items" :button-trigger="buttonTrigger">
    </ue-search-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      buttonTrigger: true,
      items: [
        {
          prop: 'name',
          props: {
            label: '活动名称'
          },
          field: {
            component: 'ElInput'
          }
        },
        {
          prop: 'region',
          props: {
            label: '活动区域'
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
          prop: 'date',
          props: {
            label: '活动时间'
          },
          field: {
            props: {
              type: 'daterange',
              placeholder: '请选择日期',
              startPlaceholder: '开始日期',
              endPlaceholder: '开始日期'
            },
            component: 'ElDatePicker',
            initValue: []
          }
        }
      ]
    }
  },
  methods: {
    updateFormData (value) {
      this.formData = value
    }
  }
}
</script>