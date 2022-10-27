<template>
  <a-form :model="formData" :label-col="{ style: { width: '60px' } }">
    <p>{{formData}}</p>
    <ue-form-fields :items="items" v-model="formData">
    </ue-form-fields>
  </a-form>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      formData: {
        prov: 'zhejiang'
      },
      items: [
        {
          name: 'prov',
          props: {
            label: '省'
          },
          field: {
            component: 'ASelect',
            props: {
              placeholder: '请选择省'
            },
            data: [
              { value: 'zhejiang', label: '浙江' },
              { value: 'hubei', label: '湖北' }
            ]
          }
        },
        {
          name: 'city',
          props: {
            label: '市'
          },
          dependencies: 'prov',
          cascadeData: {
            'zhejiang': [
              { value: 'hangzhou', label: '杭州' },
              { value: 'ningbo', label: '宁波' }
            ],
            'hubei': [
              { value: 'wuhan', label: '武汉' }
            ]
          },
          field: {
            component: 'ASelect',
            props: {
              placeholder: '请选择市'
            }
          }
        },
        {
          name: 'dist',
          dependencies: 'city',
          cascadeData: {
            'hangzhou': [
              { value: 'xihu', label: '西湖区' },
              { value: 'binjian', label: '滨江' }
            ],
            'ningbo': [],
            'wuhan': [
              { value: 'hankou', label: '汉口区' },
              { value: 'wuchang', label: '武昌区' }
            ]
          },
          props: {
            label: '区/县'
          },
          field: {
            component: 'ASelect',
            props: {
              placeholder: '请选择区/县'
            }
          }
        },
        {
          name: 'special',
          props: {
            style: 'width: 100%',
            label: '省特产'
          },
          dependencies: 'prov',
          cascadeData: {
            'zhejiang': [
              { value: '西湖藕粉', label: '西湖藕粉' },
              { value: '金华火腿', label: '金华火腿' }
            ],
            'hubei': [
              { value: '热干面', label: '热干面' },
              { value: '武昌鱼', label: '武昌鱼' },
              { value: '孝感米酒', label: '孝感米酒' }
            ]
          },
          field: {
            component: 'ACheckboxGroup',
            initValue: [], // 绑定值未定义且为非基础类型时，可以设置初始值
            data: []
          }
        }
      ]
    }
  }
})
</script>