import { UeButtonProps, UeFormProps } from '@/ui-comps'
import { ComponentPublicInstance } from 'vue'

export type BtnType = 'submit' | 'cancel' | 'reset'

export type BtnsProps = UeButtonProps | ((btnType?: BtnType) => UeButtonProps)

export interface FormInstance extends ComponentPublicInstance, UeFormProps {
  validate: () => Promise<unknown>
  resetFields: AnyFunction<void>
  clearValidate: AnyFunction<void>
}
export interface Texts {
  sureBtn?: string
  cancelBtn?: string
  resetBtn?: string
  sending?: string
  confirmWord?: string
}
export interface FormBtnsProps {
  sending?: boolean
  form?: FormInstance
  submit: AnyFunction<void>
  cancel?: AnyFunction<void>
  isCancel?: boolean
  submitOnly?: boolean
  btnKeys?: BtnType[]
  isValidate?: boolean
  submitConfirm?: boolean
  btnProps?: BtnsProps
  texts?: Texts
  size?: UeButtonProps['size']
}
