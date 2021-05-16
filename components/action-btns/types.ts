import { VNode } from 'vue'
import { ButtonProps } from '../ui-comps/button'
import { ConfirmConfig } from '../ui-comps/confirm'
import { AnyFunction } from '../utils/types'

export interface RowDataHandle<T = unknown, RT = unknown>
  extends AnyFunction<RT> {
  (data: T, item: ButtonItem, ...args: unknown[]): RT
}

export interface ButtonItem<Data = any, P extends ButtonProps = ButtonProps> {
  hide?: boolean | RowDataHandle<Data, boolean>
  key?: string
  text?:
    | string
    | ((loading: boolean, item: ButtonItem, data?: Data) => string | VNode)
  props?: P | RowDataHandle<Data, P>
  btype?: P['type'] | RowDataHandle<Data, P['type']>
  loadingKey?: string
  isConfirm?: boolean
  confirmConfig?: ConfirmConfig | RowDataHandle<Data, ConfirmConfig>
  click?: RowDataHandle<Data>
}
