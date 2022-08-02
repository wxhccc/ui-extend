<template>
  <div>
    <p>{{formData}}</p>
    <ue-search-form size="small" label-width="auto" :items="items" :button-item-options="itemOptions" :data.sync="formData">
    </ue-search-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      itemOptions: {
        formItemProps: { size: 'middle' },
        buttonProps: { type: 'success' },
        btnText: '搜索'
      },
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
            label: '时间'
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
  }
}
</script>