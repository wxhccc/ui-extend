<template>
  <a-form :model="formData" ref="form" :label-col="{ style: { width: '80px' } }" :wrapper-col="{ span: 12 }">
    <p>{{ formData }}</p>
    <ue-form-fields :items="items" v-model="formData">
    </ue-form-fields>
  </a-form>
</template>

<script>
import { defineComponent, h, ref, reactive, computed, watch, markRaw } from 'vue'
import { Form, Select } from 'ant-design-vue'
import { createSelectFormItem } from '@wxhccc/ue-antd-vue'

const CustomField = defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: null,
    formItemProps: Object,
    fieldProps: Object
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit, expose }) {
    console.log(props, attrs)
    const cascadeData = reactive({
      'shanghai': [
        { value: '01', label: '店铺主题活动' },
        { value: '02', label: '品牌发布会' }
      ],
      'beijing': [
        { value: '11', label: '地推活动' },
        { value: '12', label: '美食节' }
      ]
    })
    const modelData = ref([])

    const optionNodes = computed(() => modelData.value.map(item => h(Select.Option, { value: item.value }, { default: () => item.label })))

    watch(() => props.modelValue, (newValue, oldValue) => {
      const { onChange } = attrs
      if (onChange && newValue !== oldValue) {
        onChange(newValue)
      }
    })

    const handleCascadeChange = (value) => {
      modelData.value = cascadeData[value] || []
    }
    const emitValue = (value) => {
      emit('update:modelValue', value)
    }

    expose({ handleCascadeChange })

    return () => h(Form.Item, props.formItemProps, {
      default: () => h(Select, { value: props.modelValue, 'onUpdate:value': emitValue, ...attrs }, { default: () => optionNodes.value })
    })
  }
})

export default defineComponent({
  setup() {
    const formData = ref({})

    const items = [
      createSelectFormItem('活动区域', 'region', [
        { value: 'shanghai', label: '上海' },
        { value: 'beijing', label: '北京' }
      ], '请选择活动区域'),
      {
        name: 'content',
        props: {
          formItemProps: {
            label: '活动内容',
          }
        },
        dependencies: 'region',
        /* 函数调用时会传入FormFields组件内的所有FormItem组件的引用，可以通过refs拿到本表单项组件实例. */
        cascadeHandler: (value, prop, modelData, item, refs) => {
          /**  
          * item是当前对象，这里可以修改item的props将数据传入组件，建议修改数据方式。
          * 也可以调用组件实例上的方法。
          * 这里使用了较为复杂的调用实例的方法的方式。
          **/
          refs.content.handleCascadeChange(value)
        },
        component: markRaw(CustomField)
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
          component: 'ARadioGroup',
          data: []
        }
      }
    ]
    return { formData, items }
  }
})
</script>