<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
import { pickBy } from 'lodash-es'
import { treeAnalyse, TreeKeyNode } from '@wxhccc/es-util'
import { UeTree, UeTreeProps } from '@/ui-comps'
import { attrsToProps, handleTreeKeys, StrOrNum, useIgnoreWatch, useProxyInstanceMethods, vueTypeProp } from '@wxhccc/ue-shared'
import { TreeFiledProps, TreeDataNode } from './types'

const props = defineProps({
  inline: vueTypeProp<TreeFiledProps['inline']>(Boolean),
  nodeKey: vueTypeProp<NonNullable<TreeFiledProps['nodeKey']>>(String, 'id'),
  checkMode: vueTypeProp<NonNullable<TreeFiledProps['checkMode']>>(String, 'two-way'),
  data: vueTypeProp<NonNullable<TreeFiledProps['data']>>(Array, () => []),
  modelValue: vueTypeProp<NonNullable<TreeFiledProps['modelValue']>>(Array, () => []),
  detailValue: vueTypeProp<TreeFiledProps['detailValue']>(Object),
  readonly: vueTypeProp<TreeFiledProps['readonly']>(Boolean),
})

const emit = defineEmits<{
  (e: 'update:modelValue', value?: StrOrNum[]): void
  (e: 'update:detailValue', value: TreeFiledProps['detailValue']): void
}>()
const attrs = useAttrs()

const treeField = ref()

const checkStrictly = computed(() => ['one-way', 'none'].includes(props.checkMode))

const treeData = computed(() => (Array.isArray(props.data) ? props.data : []))

const fieldNames = computed(() => {
  const { nodeKey } = props
  const { props: attrsFieldNames } = attrsToProps<UeTreeProps>(attrs)
  return { children: 'children', ...attrsFieldNames, key: nodeKey }
})

// 将一维的节点id数组转换为包含全选和半选数据的对象
const oneWayValueSort = (value: StrOrNum[] = []) => {
  return handleTreeKeys(analyseData.value, value, 'one-way')
}

const getTwoWayFullValue = (values: StrOrNum[] = []) => {
  const { checked, halfChecked } = handleTreeKeys(analyseData.value, values, 'two-way')
  return [...halfChecked, ...checked]
}

// 所有节点的关系树，用来进行父子节点关系判断
const analyseData = computed(() => {
  const { key: primaryKey, children: childrenKey } = fieldNames.value
  return treeAnalyse(treeData.value, { primaryKey, childrenKey })
})
const dataKeysMap = computed(() => analyseData.value.keyNodeMap)
const disabledKeys = computed(() => analyseData.value.disabledKeys)

const handledData = computed(() => {
  const { readonly, modelValue } = props
  return readonly ? filterNode(treeData.value, modelValue) : treeData.value
})

/** 只读模式下过滤未选中的节点 */
const filterNode = (originList: TreeDataNode[], values: StrOrNum[]) => {
  if (originList.length && values.length) {
    const fullValues = props.checkMode === 'two-way' ? getTwoWayFullValue(values) : values
    const { children: cKey, key: kKey } = fieldNames.value
    const getAccessItem = (list: TreeDataNode[]) =>
      list.reduce((acc, item) => {
        if (fullValues.includes(item[kKey])) {
          let newItem = pickBy(item, (_v, key) => key !== cKey) as TreeDataNode
          item[cKey] && item[cKey].length && (newItem[cKey] = getAccessItem(item[cKey]))
          acc.push(newItem)
        }
        return acc
      }, [] as TreeDataNode[])
    return getAccessItem(originList)
  }
  return originList
}

const filterDisableKeys = (keys: StrOrNum[]) => keys.filter((k) => !disabledKeys.value.includes(k))

const setChildrenNodeCheck = (childrenNodes: TreeKeyNode[], checked: boolean) => {
  Array.isArray(childrenNodes) &&
    childrenNodes.forEach(cnode => {
      const { keyVlaue, children } = cnode
      treeField.value?.setChecked(keyVlaue, checked);
      setChildrenNodeCheck(children, checked);
    })
}
const setParentNodeCheck = (parentNode?: TreeKeyNode) => {
  let parent = parentNode
  while (parent) {
    treeField.value?.setChecked(parent.keyVlaue, true)
    parent = parent.parent
  }
}
/** event **/
const onValueChange = (data: TreeDataNode, checkedState: any) => {
  const treeRef = treeField.value
  if (!treeRef) {
    return
  }
  const { checkMode, nodeKey } = props
  let { checkedKeys: checked, halfCheckedKeys: halfChecked } = checkedState as { checkedKeys: StrOrNum[], halfCheckedKeys: StrOrNum[] }
  if (checkMode === 'one-way') {
    const key = data[nodeKey]
    const { checked: isChecked } = treeRef.getNode(key) || {}
    const { parent, children } = dataKeysMap.value[key]
    if (isChecked) {
      setParentNodeCheck(parent)
    }
    setChildrenNodeCheck(children, isChecked)
    const { checked: newKeys, halfChecked: newHalfChecked } = oneWayValueSort(treeRef.getCheckedKeys())
    checked = newKeys
    halfChecked = newHalfChecked
  }
  ignoreWatch.value = true
  if (disabledKeys.value.length) {
    checked = filterDisableKeys(checked)
    halfChecked = filterDisableKeys(halfChecked)
  }

  const modelValue = checkMode === 'two-way' ? checked : [...halfChecked, ...checked]
  emit('update:modelValue', modelValue)
  emit('update:detailValue', { halfChecked, checked })
}

const treeProps = computed(() => {
  const { nodeKey, readonly } = props
  return {
    defaultExpandAll: true,
    expandOnClickNode: false,
    ...attrsToProps(attrs),
    nodeKey,
    checkStrictly: checkStrictly.value,
    showCheckbox: !readonly,
    data: handledData.value as any[]
  }
})

const proxyMethods = useProxyInstanceMethods(treeField, ['filter'])

defineExpose({ tree: treeField, ...proxyMethods })

const { ignoreWatch } = useIgnoreWatch(
  () => [treeField.value, props.modelValue],
  () => {
    treeField.value?.setCheckedKeys(props.modelValue)
  }
)

</script>
<script lang="ts">
export default { name: 'UeTreeField' }
</script>
<template>
  <ue-tree ref="treeField" :class="{ 'ue-tree-field': true, 'inline-tree-field': inline }" v-bind="treeProps"
    @check="onValueChange">
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

    &>.el-tree-node {
      padding-right: 12px;
    }
  }
}
</style>
