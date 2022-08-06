<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
import { pickBy } from 'lodash-es'
import { UeTree } from '@/ui-comps'
import { useIgnoreWatch } from '@/hooks/props'
import { useProxyInstanceMethods } from '@/hooks/index.js'

export interface TreeFiledProps {
  /** 是否采用行内展示的形式。行内展示使用了flex布局让根节点在水平方向平铺，减少页面高 */
  inline?: boolean
  /** 和Tree组件同名属性意义一致，属性对应不上时无法查找节点会报 */
  nodeKey?: string
  /** 树节点的关联方式，对应Tree的`check-strictly`属性并增加了扩展。*two-way*对应false，*none*对应true，*one-way*为扩展关联方式（仅单向关联，父->子） */
  checkMode?: 'one-way' | 'two-way' | 'none'
  /** 数据 */
  data?: any[]
  /** 绑定值, `node-key`指定属性对应值的数 */
  modelValue?: (string | number)[]
  /** 展示模式，不显示checkbox，仅显示选中的节点文 */
  readonly?: boolean
}
const props = withDefaults(defineProps<TreeFiledProps>(), {
  nodeKey: 'id',
  checkMode: 'one-way',
  data: () => [],
  modelValue: () => []
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: StrOrNum[]): void
}>()
const attrs = useAttrs()

const treeField = ref()

const checkStrictly = computed(() => ['one-way', 'none'].includes(props.checkMode))

const treeProps = computed(() => {
  const { nodeKey } = props
  return {
    defaultExpandAll: true,
    expandOnClickNode: false,
    ...attrs,
    nodeKey,
    checkStrictly: checkStrictly.value
  }
})

const handledData = computed(() => {
  const { readonly, data, modelValue } = props
  return readonly ? filterNode(data, modelValue) : data
})

/** business **/
const filterNode = (originList: any[], values: StrOrNum[]) => {
  if (originList.length && values.length) {
    const { props: tprops, nodeKey } = treeProps.value as any
    const { children = 'children' } = tprops || {}
    const getAccessItem = (list: any[]) =>
      list.reduce((acc, item) => {
        if (values.includes(item[nodeKey])) {
          let newItem = pickBy(item, (value, key) => key !== children)
          item[children] &&
            item[children].length &&
            (newItem[children] = getAccessItem(item[children]))
          acc.push(newItem)
        }
        return acc
      }, [])
    return getAccessItem(originList)
  }
  return originList
}
// 递归处理权限树选中状态
const setChildrenNodeCheck = (node: any, checked: boolean) => {
  treeField.value?.setChecked(node.data, checked, true)
}
const setParentNodeCheck = (node: any) => {
  let { parent } = node
  while (parent) {
    if (!parent.data?.disabled) {
      treeField.value?.setChecked(parent.data, true)
    }
    parent = parent.parent
  }
}
/** event **/
const onValueChange = (data: any) => {
  const treeRef = treeField.value
  if (!treeRef) {
    return
  }
  if (props.checkMode === 'one-way') {
    const curNode = treeRef.getNode(data)
    const { checked } = curNode
    checked && setParentNodeCheck(curNode)
    setChildrenNodeCheck(curNode, checked)
  }
  ignoreWatch.value = true
  const modelValue = [...treeRef.getHalfCheckedKeys(), ...treeRef.getCheckedKeys()]
  emit('update:modelValue', modelValue)
}

const proxyMethods = useProxyInstanceMethods(treeField, ['filter'])

defineExpose({ tree: treeField, ...proxyMethods })

const { ignoreWatch } = useIgnoreWatch(
  () => props.modelValue,
  () => {
    treeField.value?.setCheckedKeys(props.modelValue)
  }
)
</script>
<script lang="ts">
export default { name: 'UeTreeField' }
</script>
<template>
  <ue-tree
    ref="treeField"
    :class="{ 'ue-tree-field': true, 'inline-tree-field': inline }"
    v-bind="treeProps"
    :data="handledData"
    :show-checkbox="!readonly"
    @check="onValueChange"
  >
    <template v-if="$slots.default" #default="scope">
      <slot v-bind="scope"></slot>
    </template>
  </ue-tree>
</template>

<style lang="scss">
.ue-tree-field {
  &.inline-tree-field {
    display: flex;
    flex-wrap: wrap;
    background-color: transparent;
    & > .el-tree-node {
      padding-right: 12px;
    }
  }
}
</style>
