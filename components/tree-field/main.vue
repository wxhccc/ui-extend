<template>
  <ue-tree
    ref="treeField"
    :class="['ue-tree-field', { 'inline-tree-field': inline }]"
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
<script lang="ts">
import { computed, defineComponent, mergeProps, ref } from 'vue'
import { pickBy } from 'lodash-es'
import Tree, { TreeProps, treeMethods } from '../ui-comps/tree'
import { AnyObject } from '../utils/types'
import { vueTypeProp } from '../utils/component'
import { useProxyInstanceMethods } from '../utils/hooks'

export interface TreeFieldProps<D extends AnyObject = AnyObject> extends TreeProps {
  inline: boolean
  nodeKey: string
  checkMode: 'two-way' | 'one-way' | 'none'
  data: D[]
  modelValue: string[]
}

export default defineComponent({
  name: 'UeTreeField',
  components: {
    UeTree: Tree
  },
  props: {
    inline: Boolean,
    nodeKey: vueTypeProp<TreeFieldProps['nodeKey']>(String, 'id'),
    checkMode: vueTypeProp<TreeFieldProps['checkMode']>(String, 'one-way'),
    data: vueTypeProp<TreeFieldProps['data']>(Array, () => []),
    modelValue: vueTypeProp<TreeFieldProps['modelValue']>(Array, () => []),
    readonly: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { attrs }) {
    const treeField = ref()
    const checkStrictly = computed<boolean>(() => ['one-way', 'none'].includes(props.checkMode))

    const treeProps = computed(
      () =>
        mergeProps({ defaultExpandAll: true, expandOnClickNode: false }, attrs, {
          nodeKey: props.nodeKey,
          checkStrictly: checkStrictly.value
        }) as unknown as TreeFieldProps
    )

    const handledData = computed(() =>
      props.readonly ? filterNode(props.data, props.modelValue) : props.data
    )

    const filterNode = (
      originList: TreeFieldProps['data'],
      values: TreeFieldProps['modelValue']
    ) => {
      if (originList.length && values.length) {
        const { props, nodeKey } = treeProps.value
        const childrenKey = (props && props.children) || 'children'
        const getAccessItem = (list: AnyObject[]) => {
          const arr: AnyObject[] = []
          list.forEach(item => {
            if (values.includes(item[nodeKey])) {
              const newItem = pickBy(item, (value, key) => key !== childrenKey)
              item[childrenKey] &&
                item[childrenKey].length &&
                (newItem[childrenKey] = getAccessItem(item[childrenKey]))
              arr.push(newItem)
            }
          })
          return arr
        }
        return getAccessItem(originList)
      }
    }

    const methods = useProxyInstanceMethods(treeField, treeMethods)

    return { treeField, treeProps, handledData, ...methods }
  },
  watch: {
    modelValue(newVal) {
      this.$refs.treeField && (this.$refs.treeField as any).setCheckedKeys(newVal)
    }
  },
  methods: {
    /** business **/
    // 递归处理权限树选中状态
    setChildrenNodeCheck(node: any, checked?: boolean) {
      const { treeField } = this.$refs
      Array.isArray(node.childNodes) &&
        node.childNodes.forEach((cnode: any) => {
          cnode.checked !== checked && (treeField as any).setChecked(cnode.data, checked)
          this.setChildrenNodeCheck(cnode, checked)
        })
    },
    setParentNodeCheck(node: any) {
      const { treeField } = this.$refs
      let { parent } = node
      while (parent) {
        ;(treeField as any).setChecked(parent.data, true)
        parent = parent.parent
      }
    },
    /** event **/
    onValueChange(data: TreeFieldProps['data']) {
      const { treeField } = this.$refs
      if (this.checkMode === 'one-way') {
        const curNode = (treeField as any).getNode(data)
        const { checked } = curNode
        checked && this.setParentNodeCheck(curNode)
        this.setChildrenNodeCheck(curNode, checked)
      }
      this.$emit('update:modelValue', (treeField as any).getCheckedKeys())
    }
  }
})
</script>
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
