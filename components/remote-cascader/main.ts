import { h, defineComponent, computed, mergeProps, ref, watch } from 'vue'
import Cascader from '../ui-comps/cascader'
import { vueTypeProp } from '../utils/component'
import { AnyObject, StrOrNum } from '../utils/types'
import { RemoteCascaderProps } from './types'

type LoadFunction = RemoteCascaderProps['load']

export default defineComponent({
  name: 'UeRemoteCascader',
  props: {
    load: vueTypeProp<LoadFunction>(Function, undefined, true),
    options: vueTypeProp<RemoteCascaderProps['options']>(Array),
    modelValue: vueTypeProp<RemoteCascaderProps['modelValue']>(Array),
    initFirstChange: Boolean,
    initValue: vueTypeProp<RemoteCascaderProps['initValue']>(Array),
    initInOrder: Boolean
  },
  emits: ['update:modelValue', 'update:options', 'change', 'on-change'],
  setup(props, { attrs, emit, slots }) {
    const rootFetch = ref<UE.TreeNodeData[]>([])
    const initLoading = ref(false)
    const options = ref<UE.TreeNodeData[]>([])

    const handleOptions = computed(() =>
      props.options !== undefined ? props.options : options.value
    )

    const lazyLoad = async (node: any, resolve: (nodeData: UE.TreeNodeData[]) => void) => {
      const { level, value, data } = node
      const result = await fetchReturnHandle(level, value, data, node)
      resolve(Array.isArray(result) ? result : [])
    }

    const fetchReturnHandle = async (...args: Parameters<LoadFunction>) => {
      const value = await props.load(...args)
      return (Array.isArray(value) ? value : []) as UE.TreeNodeData[]
    }

    const fetchInitValue = (originValues: StrOrNum[] = []) => {
      const values = originValues.slice(0)
      if (!Array.isArray(values) || !values.length) return
      initLoading.value = true
      if (props.initInOrder) {
        handleItemChange(values).finally(() => (initLoading.value = false))
      } else {
        fetchAtSomeTime(values)
      }
    }
    const fetchAtSomeTime = (values: StrOrNum[]) => {
      const fetchQueue = values.map((val, index) => {
        return index === 0 && rootFetch.value
          ? rootFetch.value
          : fetchReturnHandle(index, val, values)
      })
      return Promise.all(fetchQueue)
        .then(results => {
          const { value, label, children } = nodeKeys.value
          !options.value.length && Array.isArray(results[0]) && (options.value = results[0])
          let parentNode = options.value
          values.forEach((val, index) => {
            const curNode = parentNode.find(item => item[value] === val)
            curNode &&
              curNode[children] &&
              !curNode[children].length &&
              results[index + 1] &&
              (curNode[children] = results[index + 1])
            parentNode = curNode && curNode[children]
          })
        })
        .catch(() => undefined)
        .finally(() => (initLoading.value = false))
    }

    const getFullValue = (value: StrOrNum[] = []) => {
      emit('change', value)
      let lastItem = options.value
      const fullValues = value.map((val, index) => {
        const curItem = lastItem.find(item => item.value === val)
        lastItem = curItem && curItem.children ? curItem.children : ([] as UE.TreeNodeData[])
        return curItem
      })
      emit('on-change', fullValues)
    }

    const getRootList = async () => {
      rootFetch.value = await fetchReturnHandle(0)
      return rootFetch.value
    }

    const handleItemChange = async (value: StrOrNum[] = []) => {
      !options.value.length && (options.value = await getRootList())
      let lastItem = options.value
      const { value: valueProp, children } = nodeKeys.value
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const val = value[i]
          const curItem = lastItem && lastItem.find(item => item[valueProp] === val)
          curItem &&
            curItem[children] &&
            !curItem[children].length &&
            (curItem[children] = await fetchReturnHandle(i + 1, val, value, curItem))
          lastItem = curItem && curItem[children]
        }
      }
    }

    // 将modelValue的第一次变化当作初始化
    if (props.initFirstChange) {
      const unwatch = watch(
        () => props.modelValue,
        () => {
          fetchInitValue()
          unwatch()
        }
      )
    }

    watch(
      () => props.initValue,
      newVal => {
        if (Array.isArray(newVal)) {
          fetchInitValue(newVal)
          emit('update:modelValue', newVal)
        }
      }
    )

    const nodeKeys = computed(() => ({
      value: 'value',
      label: 'label',
      children: 'children',
      ...(attrs.props as AnyObject),
      lazy: true,
      lazyLoad
    }))

    const cascaderProps = computed(() =>
      mergeProps({ disabled: initLoading.value }, attrs, {
        ...(props.options ? { options: handleOptions.value } : {}),
        props: nodeKeys.value,
        modelValue: props.modelValue,
        onChange: getFullValue,
        'onUpdate:modelValue': (value: StrOrNum[]) => emit('update:modelValue', value)
      })
    )

    props.modelValue && props.modelValue.length
      ? fetchInitValue(props.modelValue)
      : handleItemChange()

    return () => h(Cascader, cascaderProps.value, slots)
  }
})
