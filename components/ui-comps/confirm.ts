import { VNode } from 'vue'
import { ElMessageBox } from 'element-plus'
// import { Modal } from 'element-plus'
// import { ModalOptions } from 'element-plus/types/modal'

// export default (config: ModalOptions) =>
//   new Promise((resolve, reject) => {
//     Modal.confirm({
//       ...config,
//       onOk: resolve as ModalOptions['onOk'],
//       onCancel: reject
//     })
//   })
export default (config: ConfirmConfig) => {
  const { content, ...rest } = config
  return ElMessageBox({
    message: content,
    ...rest,
    boxType: 'confirm',
    type: 'warning',
    showCancelButton: true
  })
}

export interface ConfirmConfig {
  title?: string
  content?: string | VNode
}
