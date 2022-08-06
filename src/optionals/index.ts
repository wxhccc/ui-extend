import { h, markRaw, Slots } from 'vue'
import { UeInput, UeSelect, UeRadioGroup, UeCheckboxGroup, UeDatePicker } from '@/ui-comps'
import { DataTableColumn } from '@/components/data-table'
import { RuleItem } from 'async-validator'
import {
  UeFormItemProps as FormItemProps,
  UeInputProps as InputProps,
  UeRadioGroupProps as RadioGroupProps,
  UeCheckboxProps as CheckboxGroupProps,
  UeSelectProps as SelectProps
} from '@/ui-comps'
import { CommonFieldProps } from '@/components/common-field'
import { FormFieldItemProps } from '@/components/form-field-item/types'

export type CustomComponent = CommonFieldProps['component']
export type StrOrProps<P extends AnyObject = AnyObject> = string | P
// 下拉默认项
export const createOption = (defaultVal: StrOrNum, label = '全部') => [
  {
    value: defaultVal !== undefined ? defaultVal : 0,
    label
  }
]

type RuleObject = RuleItem

type RuleRequired = boolean | string | [boolean | string | undefined, RuleObject['type']]

/**
 * 生成带验证规则的FormFieldItem组件的props属性对象
 * @param label label文字
 * @param requiredOrMsgOrWithType 是否必填 / 未填时特定的提示文字 / [前两者，（数据的类型，默认string）]
 * @param rules 其他规则
 * @param others 其他需要合并的属性
 * @returns FormItemProps
 */
export function createFFIRulesProps(
  label: string,
  requiredOrMsgOrWithType: RuleRequired = true,
  rules: RuleObject[] = [],
  others?: Partial<FormItemProps>
) {
  const [required, type] = Array.isArray(requiredOrMsgOrWithType)
    ? requiredOrMsgOrWithType
    : [requiredOrMsgOrWithType]
  const requiredRule: RuleObject[] = required
    ? [
        {
          required: true,
          message: typeof required === 'string' ? required : '请输入' + label,
          ...(type ? { type } : {}),
          trigger: 'blur'
        } as RuleObject
      ]
    : []
  return {
    label,
    rules: requiredRule.concat(rules),
    ...others
  } as Partial<FormItemProps>
}

/**
 * 生成FormFieldItem组件的配置对象
 * @param component CommonField组件，字符串或组件对象
 * @param labelOrProps label 或FormItem组件props
 * @param name 绑定数据的key
 * @param fieldExtra CommonField组件的props
 * @param extraProps FormFieldItem组件的其他props
 * @returns FormFieldItem组件的props
 */
export function createFormFieldItem(
  component: CustomComponent,
  labelOrProps?: StrOrProps<FormItemProps>,
  name?: NamePath,
  fieldExtra: Partial<CommonFieldProps> = {},
  extraProps: Partial<FormFieldItemProps> = {}
): FormFieldItemProps {
  return {
    props: typeof labelOrProps === 'string' ? { label: labelOrProps } : labelOrProps,
    field: {
      component: typeof component === 'string' ? component : markRaw(component),
      ...fieldExtra
    },
    name,
    ...extraProps
  } as FormFieldItemProps
}

/**
 * 生成输入框表单项配置对象
 * @param labelOrProps label 或FormItem组件props
 * @param name 绑定数据的key
 * @param phOrFieldProps placeholder或者CommonField组件的props
 * @param extraProps FormFieldItem组件的其他props
 * @param slots 输入框后缀文字或者完整的Input组件的插槽对象
 * @returns FormFieldItem组件的props
 */
export function createInputFormItem(
  labelOrProps: StrOrProps<FormItemProps>,
  name?: NamePath,
  phOrFieldProps?: StrOrProps<Partial<CommonFieldProps<string, InputProps>>>,
  extraProps: Partial<FormFieldItemProps> = {},
  slots?: string | Slots
) {
  const fieldSlots = (
    slots
      ? { slots: typeof slots === 'string' ? { append: () => h('span', slots) } : slots || {} }
      : {}
  ) as Slots
  return createFormFieldItem(
    UeInput,
    labelOrProps,
    name,
    {
      ...(typeof phOrFieldProps === 'string'
        ? {
            placeholder: phOrFieldProps || '请输入' + labelOrProps
          }
        : phOrFieldProps),
      ...fieldSlots
    },
    extraProps
  )
}

interface CreateHasDataFormItem<FE = Partial<CommonFieldProps>> {
  (
    labelOrProps: StrOrProps<FormItemProps>,
    name?: NamePath,
    data?: SelectOption[] | Option[],
    fieldExtra?: FE,
    extraProps?: Partial<FormFieldItemProps>
  ): FormFieldItemProps
}

/**
 * 生成单选表单项配置对象
 * @param labelOrProps label 或FormItem组件props
 * @param name 绑定数据的key
 * @param data RadioGroup组件的options数据，如果子组件非默认会用data创建
 * @param fieldExtra CommonField组件的props
 * @param extraProps FormFieldItem组件的其他props
 * @returns FormFieldItem组件的props
 */
export const createRadioGroupFormItem: CreateHasDataFormItem<
  Partial<CommonFieldProps<any, RadioGroupProps>>
> = (labelOrProps, name, data, fieldExtra = {}, extraProps = {}) => {
  return createFormFieldItem(UeRadioGroup, labelOrProps, name, { data, ...fieldExtra }, extraProps)
}
/**
 * 生成单选表单项配置对象
 * @param labelOrProps label 或FormItem组件props
 * @param name 绑定数据的key
 * @param data CheckboxGroup组件的options数据，如果子组件非默认会用data创建
 * @param fieldExtra CommonField组件的props
 * @param extraProps FormFieldItem组件的其他props
 * @returns FormFieldItem组件的props
 */
export const createCheckboxGroupFormItem: CreateHasDataFormItem<
  Partial<CommonFieldProps<any, CheckboxGroupProps>>
> = (labelOrProps, name, data, fieldExtra = {}, extraProps = {}) => {
  return createFormFieldItem(
    UeCheckboxGroup,
    labelOrProps,
    name,
    { data, ...fieldExtra },
    extraProps
  )
}

/**
 * 生成下拉表单项配置对象
 * @param labelOrProps label 或FormItem组件props
 * @param name 绑定数据的key
 * @param data Select组件的options数据
 * @param phOrFieldProps placeholder或者CommonFieldProps组件的props(可以包含Select组件的props)
 * @param extraProps FormFieldItem组件的其他props
 * @returns FormFieldItem组件的props
 */
export function createSelectFormItem(
  labelOrProps: StrOrProps<FormItemProps>,
  name?: NamePath,
  data?: SelectOption[],
  phOrFieldProps?: StrOrProps<Partial<CommonFieldProps<StrOrNum, SelectProps>>>,
  extraProps?: Partial<FormFieldItemProps>
) {
  return createFormFieldItem(
    UeSelect,
    labelOrProps,
    name,
    {
      data: Array.isArray(data) ? data : [],
      allowClear: true,
      ...(typeof phOrFieldProps === 'string' ? { placeholder: phOrFieldProps } : phOrFieldProps)
    } as SelectProps,
    extraProps
  )
}

const dateTypeProps = (): Record<'date' | 'daterange', AnyObject> => ({
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
/**
 * 生成日期时间选择器表单项配置对象
 * @param labelOrProps label 或FormItem组件props
 * @param name 绑定数据的key
 * @param typeOrField type 包含几种快捷的时间格式，date | daterange, 或者CommonFieldProps组件的props(可以包含DatePicker组件的props)
 * @param fieldExtra CommonField组件的props
 * @param extraProps FormFieldItem组件的其他props
 * @returns FormFieldItem组件的props
 */
export function createDateFormItem(
  labelOrProps: StrOrProps<FormItemProps>,
  name?: NamePath,
  typeOrField: 'date' | 'daterange' | AnyObject = 'date',
  fieldExtra?: AnyObject,
  extraProps?: Partial<FormFieldItemProps>
) {
  const typeProps = dateTypeProps()
  return createFormFieldItem(
    UeDatePicker,
    labelOrProps,
    name,
    {
      props:
        typeof typeOrField === 'object'
          ? typeOrField
          : typeProps[typeOrField] || { type: typeOrField },
      ...fieldExtra
    },
    extraProps
  )
}

/**
 * 生成表格表头配置对象
 * @param title 表格头标题
 * @param dataIndex 表格列对应的数据项中的字段
 * @param others 其他属性
 * @returns PagedTbColumnProps
 */
export function createTableColumn<T = any>(
  title: string,
  dataIndex?: StrOrNum,
  others?: DataTableColumn<T>
) {
  return { title, dataIndex, ...others } as DataTableColumn<T>
}
