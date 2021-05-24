import { computed, DefineComponent, defineComponent, h } from 'vue'
import Button from '../ui-comps/button'
import confirm from '../ui-comps/confirm'
import { vueTypeProp } from '../utils/component'
import { ButtonItem, RowDataHandle } from './types'

export default defineComponent({
  name: 'UeActionBtns',
  props: {
    data: vueTypeProp<any>(null, null),
    extraArgs: vueTypeProp<unknown[]>(Array, () => []),
    loadingFlags: vueTypeProp<Record<string, boolean>>(Object, () => ({})),
    btns: vueTypeProp<ButtonItem[]>(Array, () => [])
  },
  setup(props) {
    const propHanlde = <R, D>(
      itemProp: RowDataHandle<D, R> | R,
      item: ButtonItem<D>
    ) => {
      return itemProp instanceof Function
        ? itemProp(props.data as D, item, ...props.extraArgs)
        : itemProp
    }
    const handleBtns = computed(() => {
      return props.btns.filter(item => !propHanlde(item.hide, item))
    })

    const getLoadingKey = (item: ButtonItem, index: number) => {
      return item.loadingKey || item.key || `__btn${index}loading`
    }

    const btnsClick = (item: ButtonItem) => {
      if (typeof item.click !== 'function') return
      const { data, extraArgs } = props
      if (item.isConfirm) {
        const config = propHanlde(item.confirmConfig, item) || {
          title: '系统提示',
          content: '确定执行此操作?'
        }
        confirm(config)
          .then(() => {
            ;(item.click as RowDataHandle<typeof data, unknown>)(
              data,
              item,
              ...extraArgs
            )
          })
          .catch(() => undefined)
      } else {
        item.click(data, item, ...extraArgs)
      }
    }

    const btnChildren = computed(() => {
      if (!handleBtns.value.length) return
      return handleBtns.value.map((item, index) =>
        h(
          Button as unknown as DefineComponent,
          {
            ...propHanlde(item.props, item),
            class: 'ue-action-btn',
            key: item.key || index,
            type: propHanlde(item.btype, item),
            loading: props.loadingFlags[getLoadingKey(item, index)],
            onClick: () => btnsClick(item)
          },
          {
            default: () => {
              return item.text instanceof Function
                ? item.text(
                    props.loadingFlags[getLoadingKey(item, index)],
                    item,
                    props.data
                  )
                : item.text
            }
          }
        )
      )
    })
    return () => h('div', { class: 'ue-action-btns' }, btnChildren.value)
  }
})
