import { dateFormat, commaNum } from '../utils'

// 下拉默认项
export const createOption = (defaultVal, label = '全部') => [
  {
    value: typeof defaultVal !== 'undefined' ? defaultVal : 0,
    label
  }
]
// 时间格式化函数
export const dateFormatter =
  (format = '') =>
  (row, column, cellValue, index) =>
    dateFormat(cellValue, format)
// 生成FormFieldItem组件的props属性对象
export function createFfiRulesProps(label, required, rules = [], others) {
  return {
    label,
    rules: (required
      ? [
          {
            required: true,
            message: typeof required === 'string' ? required : '请输入' + label,
            trigger: 'blur'
          }
        ]
      : []
    ).concat(rules),
    ...others
  }
}
// 生成FormFieldItem组件的配置对象
export function createFormFieldItem(component, label, prop, fieldExtra = {}, extraProps = {}) {
  return {
    props: typeof label === 'object' ? label : { label },
    field: {
      component,
      ...fieldExtra
    },
    prop,
    ...extraProps
  }
}
// 生成输入框表单项配置对象
export function createInputFormItem(label, prop, placeholder, extraProps = {}, slots) {
  const slotComp =
    typeof slots === 'string' ? { slots: { append: { component: 'div', text: slots } } } : slots
  return createFormFieldItem(
    'ElInput',
    label,
    prop,
    {
      props:
        typeof placeholder === 'object'
          ? placeholder
          : {
              placeholder: placeholder || '请输入' + label
            },
      ...slotComp
    },
    extraProps
  )
}
// 生成单选表单项配置对象
export function createRadiosFormItem(label, prop, data, fieldExtra, extraProps) {
  return createFormFieldItem('ElRadioGroup', label, prop, { data, ...fieldExtra }, extraProps)
}
// 生成下拉表单项配置对象
export function createSelectFormItem(
  label,
  prop,
  data,
  allDef,
  placeholder,
  fieldExtra,
  extraProps
) {
  return createFormFieldItem(
    'ElSelect',
    label,
    prop,
    {
      data: (allDef !== false ? createOption(allDef) : []).concat(Array.isArray(data) ? data : []),
      props: typeof placeholder === 'object' ? placeholder : { placeholder },
      ...fieldExtra
    },
    extraProps
  )
}
const dateTypeProps = () => ({
  date: {
    type: 'date',
    valueFormat: 'timestamp'
  },
  daterange: {
    type: 'daterange',
    valueFormat: 'yyyy-MM-dd',
    defaultTime: ['00:00:00', '23:59:59'],
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期'
  }
})
// 生成时间表单项配置对象
export function createDateFormItem(label, prop, type, fieldExtra, extraProps) {
  const typeProps = dateTypeProps()
  return createFormFieldItem(
    'ElDatePicker',
    label,
    prop,
    {
      props: typeof type === 'object' ? type : typeProps[type] || { type },
      ...fieldExtra
    },
    extraProps
  )
}

// 生成表格表头配置对象
export function createTableColumn(label, prop, others) {
  return { label, prop, ...others }
}

export const formatters = {
  moneyFormatter: (row, column, cellValue) => cellValue && commaNum(cellValue, '0,0.00')
}
