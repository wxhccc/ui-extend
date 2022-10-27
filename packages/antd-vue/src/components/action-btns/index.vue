<script setup lang="ts">
import { computed } from 'vue'
import { isFunction } from 'lodash-es'
import { resolveFunctional, vueTypeProp } from '@wxhccc/ue-shared'
import { UeSpace, UeButton } from '@/ui-comps'
import { useUeConfirm } from '@/utils/hooks'
import type { ActionBtnItem, ActionBtnsProps } from './type'

const props = defineProps({
  data: vueTypeProp<ActionBtnsProps['data']>(null),
  extraArgs: vueTypeProp<NonNullable<ActionBtnsProps['extraArgs']>>(Array, () => []),
  loadingFlags: vueTypeProp<NonNullable<ActionBtnsProps['loadingFlags']>>(Object, () => ({})),
  btns: vueTypeProp<ActionBtnsProps['btns']>(Array, () => []),
  confirmOptions: vueTypeProp<ActionBtnsProps['confirmOptions']>(Object)
})

const confirm = useUeConfirm()

const propHanlde = <T = any>(prop: Functional<T>, item: ActionBtnItem) => {
  return resolveFunctional<T>(prop, props.data, item, ...props.extraArgs)
}

const handleBtns = computed(() => props.btns.filter((item) => !propHanlde(item.hide, item)))

const getLoadingKey = (item: ActionBtnItem, index: number) => {
  return item.loadingKey || item.key || `__btn${index}loading`
}

const btnsClick = async (item: ActionBtnItem) => {
  const { isConfirm, click: onClick } = item
  if (!isFunction(onClick)) return
  const { data, extraArgs } = props
  if (isConfirm) {
    const confirmMsg = propHanlde(item.confirmMsg, item)
    confirm(
      '系统提示',
      confirmMsg || '确定执行此操作?',
      () => {
        onClick(data, item, ...extraArgs)
      },
      {
        type: 'warning',
        ...props.confirmOptions
      }
    )
  } else {
    onClick(data, item, ...extraArgs)
  }
}
</script>
<script lang="ts">
export default { name: 'UeActionBtns' }
</script>

<template>
  <ue-space class="ue-action-btns">
    <ue-button
      v-for="(item, index) of handleBtns"
      v-bind="propHanlde(item.props, item)"
      :key="item.key || index"
      class="ue-action-btn"
      :type="propHanlde(item.btype, item)"
      :loading="loadingFlags[getLoadingKey(item, index)]"
      @click="btnsClick(item)"
    >
      {{
        propHanlde(
          loadingFlags[getLoadingKey(item, index)] && item.loadingText
            ? item.loadingText
            : item.text,
          item
        )
      }}
    </ue-button>
  </ue-space>
</template>
