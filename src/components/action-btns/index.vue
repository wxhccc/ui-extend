<script setup lang="ts">
import { computed } from 'vue'
import { isFunction } from 'lodash-es'
import { UeButton, UeMessageBox } from '@/ui-comps'
import { vueTypeProp } from '@/utils/component'
import { ActionBtnIem } from './type'
import { resolveFunctional } from '@/utils'

const props = defineProps({
  data: vueTypeProp<any>(null),
  extraArgs: vueTypeProp<any[]>(Array, () => []),
  loadingFlags: vueTypeProp<AnyObject>(Object, () => ({})),
  btns: vueTypeProp<ActionBtnIem[]>(Array, () => [])
})

const handleBtns = computed(() => props.btns.filter((item) => !propHanlde(item.hide, item)))

const getLoadingKey = (item: ActionBtnIem, index: number) => {
  return item.loadingKey || item.key || `__btn${index}loading`
}
const propHanlde = <T>(prop: Functional<T>, item: ActionBtnIem) => {
  return resolveFunctional<T>(prop, props.data, item, ...props.extraArgs)
}

const btnsClick = async (item: ActionBtnIem) => {
  const { isConfirm, click: onClick } = item
  if (!isFunction(onClick)) return
  const { data, extraArgs } = props
  if (item.isConfirm) {
    const confirmMsg = propHanlde(item.confirmMsg, item)
    UeMessageBox.confirm(confirmMsg || '确定执行此操作?', '系统提示', {
      type: 'warning'
    })
      .then(() => {
        onClick(data, item, ...extraArgs)
      })
      .catch((e) => undefined)
  } else {
    onClick(data, item, ...extraArgs)
  }
}
</script>
<script lang="ts">
export default { name: 'UeActionBtns' }
</script>
<template>
  <div class="ue-action-btns">
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
  </div>
</template>
