<script setup lang="ts">
import { ref, reactive, computed, watch, useAttrs } from 'vue'
import { treeAnalyse } from '@wxhccc/es-util'
import { cloneDeep } from 'lodash-es'
import { attrsToProps, handleTreeKeys, resolveFunctional, vueTypeProp } from '@wxhccc/ue-shared'
import {
  UeLoading,
  UeButton,
  UeCheckbox,
  UeScrollbar,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  UeTreeProps
} from '@/ui-comps'
import UeSearchInput from '@/components/search-input'
import UeTreeField, { TreeFiledProps } from '@/components/tree-field'
import { DataNode, Direction, FilterMode, TreeTransferProps } from './types'

/**
 * 根据给定的keys过滤数结构数据
 * @param list 原树结构数据
 * @param keys 选定的节点的key数组
 * @param mode 过滤模式，disabled: 会将选定节点设置为不可选，filter: 会将选定节点过滤掉，reverse: 会将非选定节点过滤
 * @returns
 */
const filterTreeList = (
  keyChildMaps: Record<StrOrNum, StrOrNum[]>,
  list: DataNode[],
  keys: StrOrNum[],
  mode: FilterMode = 'disabled',
  nodeKey = 'id'
) => {
  const checkIsDeepChecked = (value: StrOrNum): boolean => {
    if (!keys.includes(value)) {
      return false
    }
    const children = keyChildMaps[value]
    if (!children) {
      return true
    }
    return children.every(checkIsDeepChecked)
  }
  const allKeys: StrOrNum[] = []
  const newListKeys: StrOrNum[] = []
  const generateTree = (treeNodes: DataNode[] = []) => {
    const arr: DataNode[] = []
    Array.isArray(treeNodes) &&
      treeNodes.forEach((item) => {
        const { children, ...props } = item
        const keyValue = item[nodeKey]
        const isKeyIn = keys.includes(keyValue)
        allKeys.push(keyValue)
        if (
          (mode === 'filter' && checkIsDeepChecked(keyValue)) ||
          (mode === 'reverse' && !isKeyIn)
        ) {
          return
        }
        if ((mode !== 'reverse' && !isKeyIn) || (mode === 'reverse' && isKeyIn)) {
          newListKeys.push(keyValue)
        }
        arr.push({
          ...props,
          ...(mode === 'disabled' ? { disabled: checkIsDeepChecked(keyValue) } : {}),
          children: generateTree(children)
        })
      })
    return arr
  }
  return { data: generateTree(list), allKeys, accessKeys: newListKeys }
}

const props = defineProps({
  /** 数据源 */
  data: vueTypeProp<DataNode[]>(Array, () => []),
  modelValue: vueTypeProp<NonNullable<TreeTransferProps['modelValue']>>(Array, () => []),
  loading: Boolean,
  oneWay: Boolean,
  chosedMode: vueTypeProp<NonNullable<TreeTransferProps['chosedMode']>>(String, 'disabled'),
  /** 转换框header右侧自定义内容 */
  titles: vueTypeProp<TreeTransferProps['titles']>(Array),
  treeProps: vueTypeProp<TreeTransferProps['treeProps']>([Object, Function]),
  showFilter: vueTypeProp<TreeTransferProps['showFilter']>([Boolean, Function]),
  nodeKey: vueTypeProp<NonNullable<TreeTransferProps['nodeKey']>>(String, 'id'),
  buttonTrigger: vueTypeProp<boolean>(Boolean, true)
})
const emit = defineEmits<{
  (e: 'update:modelValue', value?: StrOrNum[]): void
}>()

const attrs = useAttrs()

const leftTree = ref()
const rightTree = ref()
const selectedKeys = ref<StrOrNum[]>([])
const targetKeys = ref<StrOrNum[]>([])
const keywords = ref({ left: '', right: '' })
const expandKeys = ref<StrOrNum[]>([])

const cloneTreeData = computed(() => {
  const { data } = props
  const isDataArr = Array.isArray(data) 
  return reactive({
    left: isDataArr ? cloneDeep(data) : [],
    right: isDataArr ? cloneDeep(data) : []
  })
})

// 所有节点的关系树，用来进行父子节点关系判断
const analyseData = computed(() => {
  const { nodeKey } = props
  return treeAnalyse(cloneTreeData.value.left, { primaryKey: nodeKey })
})
const rightAnalyseData = computed(() => {
  const { nodeKey } = props
  return treeAnalyse(cloneTreeData.value.right, { primaryKey: nodeKey }, ['nodes'])
})
// 所有节点和儿子节点的key对应id关系
const keyChildMaps = computed(() => analyseData.value.childKeysMaps)

const fieldNames = computed(() => {
  const { fieldNames } = attrsToProps<UeTreeProps>(attrs)
  return { title: 'label', key: props.nodeKey, children: 'children', ...fieldNames }
})

const flatNodes = computed(() => analyseData.value.nodes)
const rightFlatNodes = computed(() => rightAnalyseData.value.nodes)

const getSearchTreeData = (direction: 'left' | 'right') => {
  const { title, key } = fieldNames.value
  const keyword = keywords.value[direction]
  const keys: StrOrNum[] = []
  const nodes = direction === 'left' ? flatNodes.value : rightFlatNodes.value
  console.log(direction, keywords.value, flatNodes.value, rightFlatNodes.value)
  nodes.forEach((item) => {
    const { [title]: label, [key]: id } = item
    if (!keyword) {
      item.style = undefined
    } else if (label.includes(keyword)) {
      keys.push(id)
    }
  })
  if (!keyword) {
    return
  }
  const { halfChecked, checked } = handleTreeKeys(analyseData.value, keys)
  const value = [...halfChecked, ...checked]
  nodes.forEach(item => item.style = value.includes(item[key]) ? undefined : { display: 'none' })
}

/** 左侧树的完整数据，和树节点的所有key */
const leftTreeState = computed(() =>
  filterTreeList(keyChildMaps.value, cloneTreeData.value.left, props.modelValue, props.chosedMode, props.nodeKey)
)

const handleValue = computed(() => {
  const { modelValue, oneWay } = props
  if (!oneWay) {
    const { halfChecked } = handleTreeKeys(analyseData.value, modelValue)
    return modelValue.concat(halfChecked)
  }
  return modelValue
})
/** 右侧树的完整数据，和树节点的所有key */
const rightTreeState = computed(() => {
  return filterTreeList(keyChildMaps.value, cloneTreeData.value.right, handleValue.value, 'reverse', props.nodeKey)
})

const leftTreeData = computed(() => leftTreeState.value.data)
const leftAccessKeys = computed(() => leftTreeState.value.accessKeys)

const rightTreeData = computed(() => rightTreeState.value.data)
const rightAccessKeys = computed(() => rightTreeState.value.accessKeys)

const leftKeysText = computed(() => {
  const { allKeys, accessKeys } = leftTreeState.value
  const { buttonTrigger, chosedMode } = props
  if (!buttonTrigger) {
    return accessKeys.length
  }
  return `${selectedKeys.value.length}/${
    chosedMode === 'disabled' ? allKeys.length : accessKeys.length
  }`
})

const handleTitles = computed(() => {
  const { titles } = props
  const [left, right] = Array.isArray(titles) ? titles : titles === false ? [false, false] : []
  return { left, right }
})

const handleShowFilter = computed(() => ({
  left: resolveFunctional(props.showFilter, 'left'),
  right: resolveFunctional(props.showFilter, 'right')
}))

const twoTreeProps = computed(() => {
  const modeProps: TreeFiledProps = props.oneWay ? { checkMode: 'one-way' } : {}
  return {
    left: { ...resolveFunctional(props.treeProps, 'left'), ...modeProps } as UeTreeProps,
    right: { ...resolveFunctional(props.treeProps, 'right'), ...modeProps } as UeTreeProps
  }
})

const trueTargetKeys = computed(() => {
  const { oneWay } = props
  const { halfChecked, checked } = handleTreeKeys(
    analyseData.value,
    targetKeys.value,
    oneWay ? 'one-way' : 'two-way'
  )
  return oneWay ? checked : [...halfChecked, ...checked]
})

const onMoveKeys = (direction: Direction) => {
  let newValue: StrOrNum[] = []
  const { modelValue, buttonTrigger, oneWay } = props
  console.log(111, modelValue, direction, targetKeys.value)
  if (direction === 'right') {
    newValue = Array.from(new Set([...selectedKeys.value, ...modelValue]))
    if (!oneWay) {
      const { checked } = handleTreeKeys(analyseData.value, newValue, 'two-way')
      newValue = checked
    }
    selectedKeys.value = []
    if (!buttonTrigger) {
      targetKeys.value = newValue
    }
  } else {
    // 因为父节点会随着子节点被选中，这里需要过滤
    newValue = buttonTrigger
      ? modelValue.filter((v) => !trueTargetKeys.value.includes(v))
      : targetKeys.value
    if (buttonTrigger) {
      targetKeys.value = []
    }
  }
  expandKeys.value = newValue.slice(0)
  emit('update:modelValue', newValue)
}
const selectAllToggle = (direction: Direction) => {
  if (direction === 'left') {
    const { modelValue = [] } = props
    const unselectedKeys = leftAccessKeys.value.filter((i) => !modelValue.includes(i))
    selectedKeys.value = selectedKeys.value.length === unselectedKeys.length ? [] : unselectedKeys
  } else {
    targetKeys.value =
      targetKeys.value.length === rightAccessKeys.value.length ? [] : [...rightAccessKeys.value]
  }
}

const onTreeFieldValueChange = (direction: Direction) => {
  if (props.buttonTrigger) {
    return
  }
  onMoveKeys(direction === 'left' ? 'right' : 'left')
}

watch(() => keywords.value.left, () => getSearchTreeData('left'))
watch(() => keywords.value.right, () => getSearchTreeData('right'))

watch(
  () => props.modelValue,
  () => {
    const { modelValue, buttonTrigger } = props
    if (!buttonTrigger && modelValue?.length) {
      targetKeys.value = [...modelValue]
    }
  },
  {
    immediate: true
  }
)
</script>
<script lang="ts">
export default { name: 'UeTreeTransfer' }
</script>

<template>
  <div class="ue-tree-transfer">
    <div class="ue-tree-transfer-list">
      <div v-if="handleTitles.left !== false" class="ue-tree-transfer-list-header">
        <ue-checkbox
          v-if="buttonTrigger"
          class="ue-tree-transfer-list-checkbox"
          :model-value="!!selectedKeys.length"
          :indeterminate="
            selectedKeys.length ? selectedKeys.length !== leftAccessKeys.length : undefined
          "
          @change="selectAllToggle('left')"
        ></ue-checkbox>
        <span class="ue-tree-transfer-list-header-title">{{ handleTitles.left }}</span>
        <span class="ue-tree-transfer-list-header-selected">
          {{ leftKeysText }}
        </span>
      </div>
      <div v-if="handleShowFilter.left" class="ue-tree-transfer-list-search">
        <ue-search-input v-model="keywords.left"></ue-search-input>
      </div>
      <div class="ue-tree-transfer-list-body">
        <ue-loading v-if="loading"></ue-loading>
        <ue-scrollbar>
          <ue-tree-field
            v-if="leftTreeData.length"
            ref="leftTree"
            v-bind="twoTreeProps.left"
            v-model="selectedKeys"
            :data="leftTreeData"
            @update:model-value="onTreeFieldValueChange('left')"
          />
          <slot v-else name="leftEmpty"></slot>
        </ue-scrollbar>
      </div>
    </div>
    <div v-if="buttonTrigger" class="ue-tree-transfer-operation">
      <ue-button type="primary" :disabled="!selectedKeys.length" @click="onMoveKeys('right')">
        <arrow-right-outlined />
      </ue-button>
      <br />
      <ue-button type="primary" :disabled="!targetKeys.length" @click="onMoveKeys('left')">
        <arrow-left-outlined />
      </ue-button>
    </div>
    <div class="ue-tree-transfer-list">
      <div v-if="handleTitles.right !== false" class="ue-tree-transfer-list-header">
        <ue-checkbox
          v-if="buttonTrigger"
          class="ue-tree-transfer-list-checkbox"
          :model-value="!!targetKeys.length"
          :indeterminate="
            targetKeys.length ? targetKeys.length !== rightAccessKeys.length : undefined
          "
          @change="selectAllToggle('right')"
        />
        <span class="ue-tree-transfer-list-header-title">{{ handleTitles.right }}</span>
        <span class="ue-tree-transfer-list-header-selected">
          {{ buttonTrigger ? `${trueTargetKeys.length}/` : '' }}{{ rightAccessKeys.length }}
        </span>
      </div>
      <div v-if="handleShowFilter.right" class="ue-tree-transfer-list-search">
        <ue-search-input v-model="keywords.right"></ue-search-input>
      </div>
      <div class="ue-tree-transfer-list-body">
        <ue-scrollbar>
          <ue-tree-field
            v-if="rightTreeData.length"
            ref="rightTree"
            v-model:expanded-keys="expandKeys"
            v-bind="twoTreeProps.right"
            v-model="targetKeys"
            :data="rightTreeData"
            @update:model-value="onTreeFieldValueChange('right')"
          />
          <slot v-else name="rightEmpty"></slot>
        </ue-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.dark .ue-tree-transfer {
  --ue-tree-transfer-border-color: #414243;
  --ue-tree-transfer-panel-header-bg-color: #1d1e1f;
}

.ue-tree-transfer {
  display: flex;
  height: 100%;
  --ue-tree-transfer-border-color: #ebeef5;
  --ue-tree-transfer-panel-header-bg-color: #ebeef5;
  --ue-tree-transfer-panel-header-height: 40px;
  column-gap: 6px;

  &-list {
    flex: 1;
  }

  &-operation {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--ue-tree-transfer-border-color);
    border-radius: 4px;
  }

  &-list-header {
    display: flex;
    align-items: center;
    padding-left: 15px;
    min-height: 32px;
    height: var(--ue-tree-transfer-panel-header-height);
    background-color: var(--ue-tree-transfer-panel-header-bg-color);

    &-title {
      flex: 1;
      overflow: hidden;
    }

    &-selected {
      font-size: 13px;
      padding: 0 8px;
      color: #999999;
    }
  }

  &-list-search {
    padding: 5px 10px;
  }

  &-list-body {
    flex: 1;
    overflow: hidden;
  }
}
</style>
