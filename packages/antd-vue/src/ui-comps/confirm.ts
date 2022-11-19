import { Modal, ModalFuncProps } from 'ant-design-vue'
import type { AnyFunction } from '@wxhccc/ue-shared'

export type UeConfirmOptions = ModalFuncProps

export const UeConfirm = (title: string, content: string, onOk: AnyFunction<void>, options?: ModalFuncProps) => {
  Modal.confirm({
    title,
    content,
    onOk,
    ...options
  })
}

