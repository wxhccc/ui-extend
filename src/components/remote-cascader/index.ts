import { defineComponent, h, reactive, computed, watch } from 'vue'
import { UeCascader } from '@/ui-comps'
import { vueTypeProp } from '@/utils/component'
import { useVModel } from '@vueuse/core'
import { awaitWrapper } from '@wxhccc/es-util'
import { isFunction } from 'lodash-es'

type ModelValue = StrOrNum[]

export type LoadMethod = (
  level: number,
  value?: StrOrNum,
  values?: ModelValue,
  data?: any,
  node?: any
) => Promise<any[]>

export interface RemoteCascaderProps {
  /** 绑定值, 类型视版本决定。需要回填时必须为数组 */
  modelValue?: ModelValue
  /** 数据动态请求函数，需要返回能resolve数据的Promise对象. 参数分别为当前数据层级，当前数据值，完整数据值数组，当前数据对象，当前节点（如果存在） */
  load: LoadMethod
  /** 是否将value的第一次变化理解为初始化，适用于数据回填。 */
  initFirstChange?: boolean
  /** 始化数据，如不能确保value第一次变化是初始化（比如结构化数据工具获取的数据即使实际值没变也会导致change），请使用此属性 */
  initValue?: ModelValue
  /** 是否按顺序初始化数据，设置为true时耗时会大幅增加，但下一次`load`调用时能获取到上一层的数据对象。 */
  initInOrder?: boolean
  /** 组件数据是否是options完全受控，又或者是懒加载使用resolve模式，element-plus */
  isResolve?: boolean
}

export default defineComponent({
  name: 'UeRemoteCascader',
  props: {
    modelValue: vueTypeProp<RemoteCascaderProps['modelValue']>(Array, () => []),
    load: vueTypeProp<RemoteCascaderProps['load']>(Function, undefined, true),
    initFirstChange: Boolean,
    initValue: vueTypeProp<RemoteCascaderProps['initValue']>(Array, () => []),
    initInOrder: Boolean,
    isResolve: vueTypeProp<boolean>(Boolean, true)
  },
  emits: ['update:modelValue', 'full-value-change'],
  setup(props, { emit, attrs, slots }) {
    const state = reactive({
      rootFetch: null as null | any[],
      initLoading: false,
      options: [] as any[]
    })
    const handleValue = useVModel(props, 'modelValue', emit)

    const propsOptions = computed(() => {
      return {
        value: 'value',
        label: 'label',
        children: 'children',
        ...(attrs.props as any),
        ...(props.isResolve ? { lazy: true, lazyLoad } : {})
      }
    })

    const onUpdateValue = (value?: ModelValue) => (handleValue.value = value)

    const handleItemChange = async (value: ModelValue) => {
      if (!state.options.length) {
        state.options = await getRootList()
      }
      let lastItem = state.options
      const { value: valueProp, label, children } = propsOptions.value
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const val = value[i]
          const curItem = lastItem && lastItem.find((item) => item[valueProp] === val)
          curItem &&
            curItem[children] &&
            !curItem[children].length &&
            (curItem[children] = await fetchReturnHandle(i + 1, val, value, curItem))
          lastItem = curItem && curItem[children]
        }
      }
    }
    const getRootList = async () => {
      state.rootFetch = await fetchReturnHandle(0)
      return state.rootFetch
    }
    const lazyLoad = async (node: any, resolve: AnyFunction) => {
      const { level, value, path, data } = node
      const result = await fetchReturnHandle(level, value, path, data, node)
      resolve(Array.isArray(result) ? result : [])
    }
    const fetchReturnHandle = async (...args: Parameters<LoadMethod>) => {
      const value = await props.load(...args)
      return Array.isArray(value) ? value : []
    }
    const fetchInitValue = (originValues: ModelValue) => {
      const values = originValues.slice(0)
      if (!Array.isArray(values) || !values.length) return
      const { isResolve, initInOrder } = props
      if (isResolve) {
        state.initLoading = true
      }
      if (initInOrder) {
        handleItemChange(values).finally(resoveReady)
      } else {
        fetchAtSomeTime(values)
      }
    }
    const fetchAtSomeTime = async (values: ModelValue) => {
      const fetchQueue = values.map((val, index) => {
        return index === 0 && state.rootFetch
          ? state.rootFetch
          : fetchReturnHandle(index, val, values)
      })
      const [, results] = await awaitWrapper(Promise.all(fetchQueue))
      if (results) {
        const { value, label, children } = propsOptions.value
        if (!state.options.length && Array.isArray(results[0])) {
          state.options = results[0]
        }
        let parentNode = state.options
        values.forEach((val, index) => {
          const curNode = parentNode.find((item) => item[value] === val)
          curNode &&
            curNode[children] &&
            !curNode[children].length &&
            results[index + 1] &&
            (curNode[children] = results[index + 1])
          parentNode = curNode && curNode[children]
        })
      }
      resoveReady()
    }
    const resoveReady = () => {
      state.initLoading = false
    }
    const getFullValue = (value: ModelValue) => {
      const { onChange } = attrs
      if (isFunction(onChange)) {
        onChange(value)
      }
      let lastItem = state.options
      const fullValues = value.map((val, index) => {
        const curItem = lastItem.find((item) => item.value === val)
        lastItem = curItem ? curItem.children : []
        return curItem
      })
      emit('full-value-change', fullValues)
    }

    const unwatchFirstChange = watch(
      () => props.modelValue,
      (newValue) => {
        if (props.initFirstChange && newValue) {
          fetchInitValue(newValue)
        }
        unwatchFirstChange()
      }
    )

    const unwatchInitValue = watch(
      () => props.initValue,
      (newValue) => {
        if (Array.isArray(newValue)) {
          fetchInitValue(newValue)
          handleValue.value = newValue
          unwatchInitValue()
        }
      }
    )

    if (!props.isResolve) {
      const values = props.modelValue || []
      values.length ? fetchInitValue(values) : handleItemChange(values)
    }

    return () =>
      h(
        UeCascader,
        {
          modelValue: handleValue.value,
          'onUpdate:modelValue': onUpdateValue,
          options: state.options,
          props: propsOptions.value,
          disabled: state.initLoading,
          onChange: getFullValue
        },
        slots
      )
  }
})
