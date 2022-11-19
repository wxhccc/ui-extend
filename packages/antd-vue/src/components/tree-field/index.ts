import { defineComponent, h, ref, computed } from 'vue'
import { pickBy } from 'lodash-es'
import { treeAnalyse, TreeKeyNode } from '@wxhccc/es-util'
import { UeTree, UeTreeProps } from '@/ui-comps'
import { attrsToProps, useProxyInstanceMethods, vueTypeProp, handleTreeKeys, StrOrNum } from '@wxhccc/ue-shared'
import { TreeFiledProps, TreeDataNode } from './types'

type DetailValue = NonNullable<TreeFiledProps['detailValue']>

export * from './types'

export default defineComponent({
  name: 'UeTreeField',
  props: {
    nodeKey: vueTypeProp<NonNullable<TreeFiledProps['nodeKey']>>(String, 'id'),
    checkMode: vueTypeProp<NonNullable<TreeFiledProps['checkMode']>>(String, 'two-way'),
    data: vueTypeProp<NonNullable<TreeFiledProps['data']>>(Array, () => []),
    modelValue: vueTypeProp<NonNullable<TreeFiledProps['modelValue']>>(Array, () => []),
    detailValue: vueTypeProp<TreeFiledProps['detailValue']>(Object),
    readonly: vueTypeProp<TreeFiledProps['readonly']>(Boolean)
  },
  emits: {
    'update:modelValue': (value?: StrOrNum[]) => true,
    change: (values?: StrOrNum[]) => true,
    'update:detailValue': (value: TreeFiledProps['detailValue']) => true
  },
  setup(props, { attrs, emit, slots, expose }) {
    const treeField = ref()

    const checkStrictly = computed(() => props.checkMode !== 'two-way')

    const treeData = computed<TreeDataNode[]>(() => (Array.isArray(props.data) ? props.data : []))

    const fieldNames = computed(() => {
      const { nodeKey } = props
      const { fieldNames: attrsFieldNames } = attrsToProps<UeTreeProps>(attrs)
      return { title: 'label', children: 'children', ...attrsFieldNames, key: nodeKey }
    })

    // 将一维的节点id数组转换为包含全选和半选数据的对象
    const oneWayValueSort = (value: StrOrNum[] = []) => {
      if (props.checkMode === 'none') {
        return { checked: value, halfChecked: [] }
      }
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

    const handleCheckKeys = computed(() => {
      const { checkMode, modelValue } = props
      return checkMode === 'two-way' ? modelValue : oneWayValueSort(modelValue)
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

    const emitValue = (values: StrOrNum[], detailValue?: DetailValue) => {
      emit('update:modelValue', values)
      emit('change', values)
      if (props.detailValue) {
        emit('update:detailValue', detailValue)
      }
    }
    const onValueChange = (values: StrOrNum[] | DetailValue) => {
      if (Array.isArray(values)) {
        const { halfChecked } = handleTreeKeys(analyseData.value, values)
        emitValue(values, { checked: values, halfChecked })
      } else {
        emitValue(values.checked, values)
      }
    }

    const onNodeCheck: UeTreeProps['onCheck'] = (checkedKeys, e) => {
      const { key: kKey } = fieldNames.value
      const {
        checked,
        node: { [kKey]: key }
      } = e
      
      let keys = Array.isArray(checkedKeys)
        ? checkedKeys
        : checkedKeys.checked.concat(checkedKeys.halfChecked)

      const { parent, children: childNodes } = dataKeysMap.value[key]
      const parentKeys: StrOrNum[] = []
      // 如果当前节点是选中，则选中其所有父节点
      if (checked) {
        let prevParent = parent
        while (prevParent) {
          parentKeys.push(prevParent.keyVlaue)
          prevParent = prevParent.parent
        }
      }
      // 获取当前节点所有子节点
      const childKeys: StrOrNum[] = []
      const getChildrenKeys = (keyNodes: TreeKeyNode[]) => {
        keyNodes.forEach((node) => {
          const { keyVlaue, children } = node
          childKeys.push(keyVlaue)
          if (children.length) {
            getChildrenKeys(children)
          }
        })
      }
      getChildrenKeys(childNodes)
      // 根据当前节点是选中或取消选中，默认选中所有子节点，或者去掉所有子节点
      const newKeys = checked ? keys.concat(childKeys) : keys.filter((k) => !childKeys.includes(k))
      let values = Array.from(new Set([...newKeys, ...parentKeys]))
      values = disabledKeys.value.length ? filterDisableKeys(values) : values
      emitValue(values, oneWayValueSort(values))
    }

    const treeProps = computed<UeTreeProps>(() => {
      const { readonly, checkMode } = props
      return {
        defaultExpandAll: true,
        ...attrsToProps(attrs) as Partial<UeTreeProps>,
        fieldNames: fieldNames.value,
        checkStrictly: checkStrictly.value,
        treeData: handledData.value,
        checkable: !readonly,
        checkedKeys: handleCheckKeys.value,
        ...(checkMode === 'one-way'
          ? { onCheck: onNodeCheck }
          : { 'onUpdate:checkedKeys': onValueChange })
      }
    })

    const proxyMethods = useProxyInstanceMethods(treeField, ['scrollTo'])

    expose({ tree: treeField, ...proxyMethods })

    return () =>
      h(
        UeTree,
        {
          ref: treeField,
          class: 'ue-tree-field',
          ...treeProps.value
        },
        slots
      )
  }
})
