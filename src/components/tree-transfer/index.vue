<script setup lang="ts">
import { ref, computed } from 'vue'
import { UeButton, UeCheckbox, UeScrollbar } from '@/ui-comps'
import UeSearchInput from '@/components/search-input'
import UeTreeField from '@/components/tree-field'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@/ui-comps/icons'
import { DataNode, Direction, FilterMode, TreeTransferProps } from './types.js'
import { vueTypeProp } from '@/utils/component.js'
import { resolveFunctional } from '@/utils/index.js'

/**
 * 根据给定的keys过滤数结构数据
 * @param list 原树结构数据
 * @param keys 选定的节点的key数组
 * @param mode 过滤模式，disabled: 会将选定节点设置为不可选，filter: 会将选定节点过滤掉，reverse: 会将非选定节点过滤
 * @returns
 */
const filterTreeList = (
  list: DataNode[],
  keys: StrOrNum[],
  mode: FilterMode = 'disabled',
  rowKey = 'id'
) => {
  const newListKeys: StrOrNum[] = []
  const generateTree = (treeNodes: DataNode[] = []) => {
    const arr: DataNode[] = []
    Array.isArray(treeNodes) &&
      treeNodes.forEach((item) => {
        const { children, ...props } = item
        const keyValue = item[rowKey]
        if (mode !== 'disabled') {
          const isKeyIn = keys.includes(keyValue)
          if ((mode === 'filter' && isKeyIn) || (mode === 'reverse' && !isKeyIn)) {
            return
          }
        }
        newListKeys.push(keyValue)
        arr.push({
          ...props,
          ...(mode === 'disabled' ? { disabled: keys.includes(keyValue) } : {}),
          children: generateTree(children)
        })
      })
    return arr
  }
  return { data: generateTree(list), allKeys: newListKeys }
}

const filterNode = (value: string, data: DataNode) => {
  if (!value) return true
  return data.label.includes(value)
}

const props = defineProps({
  /** 数据源 */
  data: vueTypeProp<DataNode[]>(Array, () => []),
  modelValue: vueTypeProp<NonNullable<TreeTransferProps['modelValue']>>(Array, () => []),
  loading: Boolean,
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

const leftTree = ref()
const rightTree = ref()
const selectedKeys = ref<StrOrNum[]>([])
const targetKeys = ref<StrOrNum[]>([])
const keywords = ref({ left: '', right: '' })

/** 左侧树的完整数据，和树节点的所有key */
const leftTreeState = computed(() =>
  filterTreeList(props.data, props.modelValue, 'disabled', props.nodeKey)
)
/** 右侧树的完整数据，和树节点的所有key */
const rightTreeState = computed(() =>
  filterTreeList(props.data, props.modelValue, 'reverse', props.nodeKey)
)

const leftTreeData = computed(() => leftTreeState.value.data)
const leftAllKeys = computed(() => leftTreeState.value.allKeys)
const rightTreeData = computed(() => rightTreeState.value.data)
const rightAllKeys = computed(() => rightTreeState.value.allKeys)

// 所有节点和儿子节点的key对应id关系
const keyChildMaps = computed(() => {
  const result: Record<StrOrNum, StrOrNum[]> = {}
  const dataKeyHandle = (list: DataNode[]) => {
    list.forEach((item) => {
      const { key, children = [] } = item
      if (Array.isArray(children) && children.length) {
        result[key] = children.map((item) => item.key)
        dataKeyHandle(children)
      }
    })
  }
  dataKeyHandle(props.data)
  return result
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
  const { left: leftShow, right: rightShow } = handleShowFilter.value
  const filterProps = { filterNodeMethod: filterNode }
  return {
    left: { ...resolveFunctional(props.treeProps, 'left'), ...(leftShow ? filterProps : {}) },
    right: { ...resolveFunctional(props.treeProps, 'right'), ...(rightShow ? filterProps : {}) }
  }
})

const trueTargetKeys = computed(() => {
  const getAllChildrenKeys = (key: StrOrNum): StrOrNum[] => {
    const cKeys = keyChildMaps.value[key]
    return cKeys
      ? cKeys.reduce((acc, key) => {
          return acc.concat(getAllChildrenKeys(key))
        }, cKeys)
      : []
  }
  return targetKeys.value.reduce<StrOrNum[]>((acc, cur) => {
    const cKeys = getAllChildrenKeys(cur)
    // 如果当前节点没有子节点，或者当前id的所有子节点已选中，则添加当前节点的key
    if (
      !cKeys.length ||
      cKeys.every((k) => targetKeys.value.includes(k) || !rightAllKeys.value.includes(k))
    ) {
      acc.push(cur)
    }
    return acc
  }, [])
})

const onMoveKeys = (direction: Direction) => {
  let newValue: StrOrNum[] = []
  const { modelValue, buttonTrigger } = props
  if (direction === 'right') {
    newValue = [...selectedKeys.value, ...modelValue]
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
  emit('update:modelValue', newValue)
}
const selectAllToggle = (direction: Direction) => {
  if (direction === 'left') {
    selectedKeys.value =
      selectedKeys.value.length === leftAllKeys.value.length ? [] : [...leftAllKeys.value]
  } else {
    targetKeys.value =
      targetKeys.value.length === rightAllKeys.value.length ? [] : [...rightAllKeys.value]
  }
}
const filterTreeNode = (direction: Direction) => {
  const treeRef = direction === 'left' ? leftTree : rightTree
  treeRef.value?.filter(keywords.value[direction])
}
const onTreeFieldValueChange = (direction: Direction) => {
  if (props.buttonTrigger) {
    return
  }
  onMoveKeys(direction === 'left' ? 'right' : 'left')
}
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
          :checked="!!selectedKeys.length"
          :indeterminate="
            selectedKeys.length ? selectedKeys.length !== leftAllKeys.length : undefined
          "
          @change="selectAllToggle('left')"
        ></ue-checkbox>
        <span class="ue-tree-transfer-list-header-title">{{ handleTitles.left }}</span>
        <span class="ue-tree-transfer-list-header-selected">
          {{ selectedKeys.length }}/{{ leftAllKeys.length }}
        </span>
      </div>
      <div v-if="handleShowFilter.left" class="ue-tree-transfer-list-search">
        <ue-search-input
          v-model="keywords.left"
          @update:model-value="filterTreeNode('left')"
        ></ue-search-input>
      </div>
      <div class="ue-tree-transfer-list-body">
        <ue-scrollbar>
          <ue-tree-field
            ref="leftTree"
            v-bind="twoTreeProps.left"
            v-model="selectedKeys"
            checkable
            check-mode="two-way"
            :data="leftTreeData"
            @update:model-value="onTreeFieldValueChange('left')"
          />
        </ue-scrollbar>
      </div>
    </div>
    <div v-if="buttonTrigger" class="ue-tree-transfer-operation">
      <ue-button
        type="primary"
        size="small"
        :disabled="!selectedKeys.length"
        @click="onMoveKeys('right')"
      >
        <arrow-right-outlined />
      </ue-button>
      <br />
      <ue-button
        type="primary"
        size="small"
        :disabled="!targetKeys.length"
        @click="onMoveKeys('left')"
      >
        <arrow-left-outlined />
      </ue-button>
    </div>
    <div class="ue-tree-transfer-list">
      <div v-if="handleTitles.right !== false" class="ue-tree-transfer-list-header">
        <ue-checkbox
          v-if="buttonTrigger"
          class="ue-tree-transfer-list-checkbox"
          :checked="!!targetKeys.length"
          :indeterminate="targetKeys.length ? targetKeys.length === rightAllKeys.length : undefined"
          @change="selectAllToggle('right')"
        />
        <span class="ue-tree-transfer-list-header-title">{{ handleTitles.right }}</span>
        <span class="ue-tree-transfer-list-header-selected">
          {{ trueTargetKeys.length }}/{{ rightAllKeys.length }}
        </span>
      </div>
      <div v-if="handleShowFilter.right" class="ue-tree-transfer-list-search">
        <ue-search-input
          v-model="keywords.right"
          @update:model-value="filterTreeNode('right')"
        ></ue-search-input>
      </div>
      <div class="ue-tree-transfer-list-body">
        <ue-scrollbar>
          <ue-tree-field
            ref="rightTree"
            v-bind="twoTreeProps.right"
            v-model="targetKeys"
            check-mode="two-way"
            checkable
            :data="rightTreeData"
            @update:model-value="onTreeFieldValueChange('right')"
          />
        </ue-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ue-tree-transfer {
  display: flex;
  height: 100%;
  --ue-tree-transfer-border-color: #ebeef5;
  --ue-tree-transfer-panel-header-bg-color: #f5f7fa;
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
    height: var(--el-transfer-panel-header-height);
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
    overflow: auto;
  }
}
</style>
