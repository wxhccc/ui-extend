import { inject } from 'vue'
import { UeConfirm, UeConfirmOptions } from '@/ui-comps'

export const useUeConfirm = () => {
  const injectOptios = inject<Partial<UeConfirmOptions>>('UeConfirmOptions')

  const ueConfirm = (...args: Parameters<typeof UeConfirm>) => {
    const [title, content, onOk, options] = args
    UeConfirm(title, content, onOk, { ...injectOptios, ...options })
  }
  return ueConfirm
}