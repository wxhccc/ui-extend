import { AllowedComponentProps, Slots, VNodeTypes } from 'vue'
import { AnyObject, Functional, NamePath } from '@wxhccc/ue-shared'
import { UeColProps, UeFormItemProps } from '@/ui-comps'
import { CommonFieldProps } from '@/components/common-field'

export type FormItemProps = UeFormItemProps & AllowedComponentProps

export type TextType = boolean | string | ((value?: any, name?: NamePath) => VNodeTypes)

export interface FormFieldItemOption {
  /** 传递给FormItem组件的props对象 */
  props?: Functional<FormItemProps>
  /** 对应FormItem组件的name属性 */
  name?: NamePath
  /** 祖先层级的属性序列，可以构造多层级数据 */
  prevNames?: NamePath[]
  /** 表单域内是否显示文本，或者设置显示的文本内容 */
  text?: TextType
  /** FormItem组件支持的插槽对象，label插槽会覆盖labelTip生产的内容, default插槽不会覆盖表单域，会放置在表单域元素之后 */
  slots?: Slots
  /** 组件内的表单域组件配置对象 */
  field?: CommonFieldProps
  /** 给表单项label解释的提示文字 */
  labelTip?: string
  children?: ChildFormFieldItemOption[]
  // 如果搜索表单使用了记忆功能，则在恢复数据时通知监听了的组件
  onRestored?: (data: AnyObject) => void
}

export interface ChildFormFieldItemOption extends Omit<FormFieldItemOption, 'children'> {
  key?: string | number
  colProps?: Functional<UeColProps>
}

export type FormFieldItemProps = FormFieldItemOption &
  Omit<FormItemProps, keyof FormFieldItemOption>
