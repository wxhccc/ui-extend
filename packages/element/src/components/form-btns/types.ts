import { UeButtonProps, UeFormInstance, UeConfirmOptions } from '@/ui-comps'

export type BtnType = 'submit' | 'cancel' | 'reset'

export type BtnsProps = Partial<UeButtonProps> | ((btnType?: BtnType) => Partial<UeButtonProps>)

export interface BtnsTexts {
  sureBtn?: string
  cancelBtn?: string
  resetBtn?: string
  sending?: string
  confirmWord?: string
}
export interface FormBtnsProps {
  /** 当前是否在发送中 */
  sending?: boolean
  /** 表单实例 */
  form?: UeFormInstance
  /** 验证通过后触发的函数 */
  submit: AnyFunction<void>
  /** 点击取消或充值时触发的函数 */
  cancel?: AnyFunction<void>
  /** 默认是取消还是重置按钮，默认是取消 */
  isCancel?: boolean
  /** 是否只显示确定按钮，优先级高于btnKeys */
  submitOnly?: boolean
  /** 显示按钮的keys，可用来控制顺序 */
  btnKeys?: BtnType[]
  /** 是否需要进行表单验证 */
  isValidate?: boolean
  /** 验证通过后，是否需要进行二次确认 */
  submitConfirm?: boolean
  /** 确认弹框额外的配置属性，具体参见对于ui库 */
  confirmOptions?: UeConfirmOptions
  /** 按钮的props对象，可用函数分别设置不同的按钮 */
  btnProps?: BtnsProps
  /** 配置文案 */
  texts?: BtnsTexts
  /** 按钮大小 */
  size?: UeButtonProps['size']
}
