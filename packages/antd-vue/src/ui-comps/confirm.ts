import { Modal, ModalFuncProps } from 'ant-design-vue'

export type UeConfirmOptions = ModalFuncProps

export const UeConfirm = (title: string, content: string, onOk: AnyFunction<void>, options?: ModalFuncProps) => {
  Modal.confirm({
    title,
    content,
    onOk,
    ...options
  })
}

