import { AnyFunction } from '../utils/types'
import { ComponentPublicInstance } from 'vue'
import { ButtonProps } from '../ui-comps/button'

export type BtnType = 'submit' | 'cancel' | 'reset'

export type BtnsProps = ButtonProps | ((btnType?: BtnType) => ButtonProps)

export interface FormInstance extends ComponentPublicInstance {
  validate: () => Promise<unknown>
  resetFields: AnyFunction<void>
}

export interface FormBtnsProps {
  sending: boolean
  form: FormInstance
  submit: AnyFunction<void>
  cancel: AnyFunction<void>
  isCancel: boolean
  submitOnly: boolean
  btnKeys: BtnType[]
  isValidate: boolean
  submitConfirm: boolean
  btnProps: BtnsProps
  texts: Record<string, string>
}
