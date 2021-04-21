import { VNodeTypes } from 'vue'
import { Modal } from 'ant-design-vue'
import { ModalOptions } from 'ant-design-vue/types/modal'

export default (config: ModalOptions) => new Promise((resolve, reject) => {
  Modal.confirm({
    ...config,
    onOk: resolve as ModalOptions['onOk'],
    onCancel: reject
  })
})

export interface ConfirmConfig {
  title?: string | VNodeTypes
  content?: string | VNodeTypes
}