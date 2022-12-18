import { markRaw } from 'vue'
import {
  UeInput,
  UeSelect,
  UeOption,
  UeRadioGroup,
  UeCheckboxGroup,
  UeDatePicker,
  UeRadio,
  UeCheckbox,
  UeFormItemProps as FormItemProps,
  UeInputProps as InputProps,
  UeRadioGroupProps as RadioGroupProps,
  UeCheckboxProps as CheckboxGroupProps,
  UeSelectProps as SelectProps,
  RuleObject,
  FORM_ITEM_NAME
} from '@/ui-comps'
import { AnyObject, mergeObj, NamePath, SelectOption, StrOrNum, Option } from '@wxhccc/ue-shared'
import { DataTableColumn } from '@/components/data-table'
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
          ...(type ? { type } : {})
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
export function createFormFieldItem<FP extends AnyObject = any, V = any>(
  component: CustomComponent,
  labelOrProps?: StrOrProps<FormItemProps>,
  name?: NamePath,
  fieldExtra: Partial<CommonFieldProps<V, FP>> = {},
  extraProps: Partial<FormFieldItemProps> = {}
): FormFieldItemProps {
  return {
    props: typeof labelOrProps === 'string' ? { label: labelOrProps } : labelOrProps,
    field: {
      component: typeof component === 'string' ? component : markRaw(component),
      ...fieldExtra
    },
    [FORM_ITEM_NAME]: name,
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
  extraProps: Partial<FormFieldItemProps> = {}
) {
  const defPlaceholder = typeof labelOrProps === 'string' ? `请输入${labelOrProps}` : ''
  return createFormFieldItem(
    UeInput,
    labelOrProps,
    name,
    phOrFieldProps
      ? typeof phOrFieldProps === 'string'
        ? {
            placeholder: phOrFieldProps || defPlaceholder
          } as Partial<CommonFieldProps<string, InputProps>>
        : phOrFieldProps
      : undefined,
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
  const childComponent = markRaw(UeRadio)
  return createFormFieldItem(
    UeRadioGroup,
    labelOrProps,
    name,
    { data, childComponent, ...fieldExtra },
    extraProps
  )
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
  Partial<CommonFieldProps<StrOrNum[], CheckboxGroupProps>>
> = (labelOrProps, name, data, fieldExtra = {}, extraProps = {}) => {
  const childComponent = markRaw(UeCheckbox)
  return createFormFieldItem(
    UeCheckboxGroup,
    labelOrProps,
    name,
    { data, childComponent, ...fieldExtra },
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
  const childComponent = markRaw(UeOption)
  return createFormFieldItem(
    UeSelect,
    labelOrProps,
    name,
    {
      data: Array.isArray(data) ? data : [],
      allowClear: true,
      childComponent,
      ...(typeof phOrFieldProps === 'string' ? { placeholder: phOrFieldProps } : phOrFieldProps)
    } as SelectProps,
    extraProps
  )
}

const dateTypeProps = () => {
  const valueFormat = 'YYYY-MM-DD HH:mm:ss'
  const defaultTime = [new Date('2000-01-01 00:00:00'), new Date('2000-01-01 23:59:59')]
  return {
    date: {
      type: 'date',
      valueFormat
    },
    dateTime: {
      type: 'datetime',
      format: valueFormat,
      valueFormat
    },
    dateRange: {
      type: 'daterange',
      format: 'YYYY-MM-DD',
      valueFormat,
      defaultTime,
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期'
    },
    dateTimeRange: {
      type: 'datetimerange',
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat,
      defaultTime,
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    }
  }
}

type DateFieldType = keyof ReturnType<typeof dateTypeProps>
interface DateFieldConfig extends Partial<CommonFieldProps> {
  /** 内置常用配置类型 */
  type?: DateFieldType
}

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
  typeOrField: DateFieldConfig['type'] | DateFieldConfig = 'date',
  extraProps?: Partial<FormFieldItemProps>
) {
  const typeProps = dateTypeProps()
  const {
    type = 'date',
    ...rest
  } = typeof typeOrField === 'string' ? ({ type: typeOrField } as DateFieldConfig) : typeOrField || {}
  const fieldExtra = mergeObj(typeProps[type], rest)

  return createFormFieldItem(
    UeDatePicker,
    labelOrProps,
    name,
    fieldExtra,
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