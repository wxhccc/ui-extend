import type { FormFieldsItem } from '@/components/form-fields/types'
import type { UeButtonProps, UeFormProps } from '@/ui-comps'


export interface SearchButtonOptions {
  /** 按钮属性对象 */
  searchBtnProps?: Partial<UeButtonProps>
  /** 搜索按钮文字 */
  btnText?: string
  /** 重置按钮文字 */
  resetText?: string
  /** 重置按钮属性 */
  resetBtnProps?: Partial<UeButtonProps>
}

export interface SearchFormProps extends UeFormProps {
  /** 表单项配置对象数组 */
  items: FormFieldsItem[]
  /** 表单绑定值 */
  modelValue?: AnyObject
  /** 是否正在搜索中 */
  searching?: boolean
  /** 是否使用按钮来触发绑定值更新，默认自动触发 */
  buttonTrigger?: boolean
  /** 是否显示重置按钮 */
  showReset?: boolean
  /** 是否在表单验证通过后才更新modelValue值 */
  validateModel?: boolean
  /** 表单项元素是否单行显示 */
  singleLine?: boolean
  /** 搜索按钮配置对象 */
  buttonOptions?: SearchButtonOptions
  /** 整表单规则动态创建函数，一般用于需要内部modelValue作为验证依据的情况 */
  formRulesCreator?: (modelValue: AnyObject) => UeFormProps['rules']
  /** 记忆功能所需字段 */
  restore?: boolean
  needStore?: boolean
  storeKey?: string
  /** 是否需要过滤禁用和隐藏表单项的数据 */
  filterDisabled?: boolean
}
