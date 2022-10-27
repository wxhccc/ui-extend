import { computed, defineComponent, h, ref } from 'vue'
import copy from 'copy-to-clipboard'
import { vueTypeProp } from '@wxhccc/ue-shared'
import { UeTooltip, UeButton, UeMessage } from '@/ui-comps'
import { CopyOutlined } from '@/ui-comps'

export interface CopyClipboardProps {
  text: string | number
  showMessage?: boolean
}

export default defineComponent({
  name: 'UeCopyClipboard',
  props: {
    text: vueTypeProp<CopyClipboardProps['text']>([String, Number]),
    showMessage: Boolean
  },
  emits: ['copied'],
  setup(props, { slots, emit }) {
    const copied = ref(false)
    const title = computed(() => (copied.value ? '复制成功' : '复制'))

    const onVisibleChange = (visible: boolean) => {
      if (visible) {
        copied.value = false
      }
    }

    const copyText = () => {
      if (!props.text) {
        return
      }
      const result = copy(`${props.text}`)
      if (result) {
        copied.value = true
        if (props.showMessage) {
          UeMessage.success('复制成功')
        }
        emit('copied')
      }
    }

    const defaultBtn = h(
      UeButton,
      { type: 'link' },
      { icon: () => h(CopyOutlined) }
    )

    return () =>
      h(
        UeTooltip,
        { title: title.value, placement: 'top', 'onUpdate:visible': onVisibleChange },
        {
          default: () =>
            h('div', { onClick: copyText }, slots.default ? slots.default() : defaultBtn)
        }
      )
  }
})
