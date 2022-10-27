import { DefineComponent } from 'vue'
import { FormFieldItemOption, NamePath } from '@/components/form-field-item/types'

interface FieldsBaseOption {
  /** 当前表单项是否隐藏 */
  hide?: Functional<boolean>
  /** 当前表单项的key，用于性能优化，有唯一prop时可省略 */
  key?: string | number
  /** 当前表单项级联管理的其他项的prop属性 */
  dependencies?: string
  /** 自定义级联处理逻辑，参数依此为，当前表单项表单域绑定值，当前表单项name，计算的级联数据（如果存在），当前表单项配置对象，所有表单项组件的引用映射对象 */
  cascadeHandler?: <I>(value: any, name?: NamePath, modelData?: AnyObject[], item?: I, itemRefs?: Record<string, any>) => void
  /** 配置的级联数据对象 */
  cascadeData?: Record<string, Option[]>
  /** 是否需要在级联依赖项变化时清除数据，非boolean值时，指定的为清除时使用的值 */
  clearValue?: boolean | string | number
  /** 级联数据替换时裁剪开始索引，默认为0，对于有“全部”选项的情况，可以设置为1 */
  spliceStart?: number
}
export interface CustomFieldsOption
  extends Pick<FormFieldItemOption, 'props' | 'name' | 'prevNames'>,
    FieldsBaseOption {
  /** 组件对象或已注册组件的名称字符串 */
  component?: string | DefineComponent
  slotName?: string
}

export type FormFieldsOption = FormFieldItemOption & FieldsBaseOption

export type FormFieldsItem = CustomFieldsOption | FormFieldsOption

export interface FormFieldsProps {
  modelValue?: AnyObject
  items: FormFieldsItem[]
  /** 是否需要延迟更新，主要用于账号密码表单，这类表单会被浏览器自动填充，自动填充时更新时序不可控 */
  delayUpdate?: boolean
}
