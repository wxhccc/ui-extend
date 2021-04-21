import { VNodeTypes } from "vue";
import Button from "UE/ui-comps/button";
import { ConfirmConfig } from "UE/ui-comps/confirm";

export interface RowDataHandle<T = unknown, RT = unknown> {
  (data: T, item: ButtonItem, ...args: unknown[]): RT
}

type VNodeHandle<Data> = VNodeTypes | RowDataHandle<Data, string>

export interface ButtonItem<Data = any> {
  hide?: boolean | RowDataHandle<Data, boolean>
  key?: string
  text?: VNodeHandle<Data>
  loadingText?: VNodeHandle<Data>
  props?: Button | RowDataHandle<Data, Button>
  btype?: Button['type'] | RowDataHandle<Data, Button['type']>
  loadingKey?: string
  isConfirm?: boolean
  confirmConfig?: ConfirmConfig | RowDataHandle<Data, ConfirmConfig>
  click?: RowDataHandle<Data>
}
