import { ElMessageBox, ElMessageBoxOptions } from 'element-plus'

export type UeConfirmOptions = ElMessageBoxOptions

export const UeConfirm = (title: string, content: string, onOk: AnyFunction<void>, options?: ElMessageBoxOptions) => {
  ElMessageBox({
    title,
    message: content,
    type: 'warning',
    showCancelButton: true,
    callback: (action: string) => {
      if (action === 'confirm') {
        onOk()
      }
    },
    ...options
  })
}

