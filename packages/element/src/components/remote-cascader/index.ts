import { defineComponent, h, reactive, computed, watch } from 'vue'
import { awaitWrapper } from '@wxhccc/es-util'
import { isFunction } from 'lodash-es'
import { AnyFunction, StrOrNum, useVModel, vueTypeProp } from '@wxhccc/ue-shared'
import { ON_UI_UPDATE_MODEL_VALUE, UeCascader, UeCascaderFields, UI_MODEL_VALUE, UeCascaderOption } from '@/ui-comps'

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
}

export default defineComponent({
  name: 'UeRemoteCascader',
  props: {
    modelValue: vueTypeProp<RemoteCascaderProps['modelValue']>(Array, () => []),
    load: vueTypeProp<RemoteCascaderProps['load']>(Function, undefined, true),
    initFirstChange: Boolean,
    initValue: vueTypeProp<RemoteCascaderProps['initValue']>(Array, () => []),
    initInOrder: Boolean
  },
  emits: {
    'update:modelValue': (value?: ModelValue) => true,
    'fullValueChange': (value?: UeCascaderOption[]) => true
  },
  setup(props, { emit, attrs, slots }) {
    const state = reactive({
      rootFetch: null as null | any[],
      initLoading: false,
      options: [] as UeCascaderOption[]
    })
    let innerOptions: UeCascaderOption[] = []

    const handleValue = useVModel(props, 'modelValue', emit)

    const propsOptions = computed(() => ({
      value: 'value',
      label: 'label',
      children: 'children',
      ...(attrs.props as any),
      lazy: true,
      lazyLoad
    } as Required<UeCascaderFields>))

    const onUpdateValue = (value?: ModelValue) => (handleValue.value = value)

    const handleItemChange = async (value: ModelValue) => {
      let lastItem = state.options
      const { value: valueProp, label, children: cProp } = propsOptions.value
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const val = value[i]
          const curItem = lastItem && lastItem.find((item) => item[valueProp] === val)
          const children = curItem && curItem[cProp] ? curItem[cProp] as UeCascaderOption[] : []
          if (!children.length) {
            (curItem as UeCascaderOption)[cProp] = await fetchReturnHandle(i + 1, val, value, curItem)
          }
          lastItem = curItem ? curItem[cProp] as UeCascaderOption[] : []
        }
      }
    }

    const lazyLoad = async (node: any, resolve: AnyFunction) => {
      const { level, value, pathValues, data } = node
      const result = await fetchReturnHandle(level, value, pathValues, data, node)
      const nodes: UeCascaderOption[] = Array.isArray(result) ? result : []
      if (!state.options.length) {
        state.options = nodes
        innerOptions = nodes.slice()
      } else {
        let lastItem = innerOptions
        let curNode: UeCascaderOption | undefined
        const { value: vKey, children } = propsOptions.value
        const fullValues = (pathValues as ModelValue).map((val) => {
          curNode = lastItem.find((item) => item[vKey] === val)
          lastItem = curNode ? curNode[children] as UeCascaderOption[] : []
        })
        if (curNode) {
          curNode[children as 'children'] = nodes
        }
      }
      resolve(nodes)
    }
    const fetchReturnHandle = async (...args: Parameters<LoadMethod>) => {
      const value = await props.load(...args)
      return Array.isArray(value) ? value : []
    }
    const fetchInitValue = (originValues: ModelValue) => {
      const values = originValues.slice(0)
      if (!Array.isArray(values) || !values.length) return
      const { initInOrder } = props
      state.initLoading = true
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
        const { value, children } = propsOptions.value
        if (!state.options.length && Array.isArray(results[0])) {
          state.options = results[0]
        }
        let parentNode = state.options
        values.forEach((val, index) => {
          const curNode = parentNode.find((item) => item[value] === val)
          if (curNode &&
            curNode[children] &&
            !(curNode[children] as UeCascaderOption[]).length &&
            results[index + 1]) {
            curNode[children] = results[index + 1]
          }
          parentNode = curNode && curNode[children] ? curNode[children] as UeCascaderOption[] : []
        })
      }
      resoveReady()
    }
    const resoveReady = () => {
      state.initLoading = false
    }
    const getFullValue = (values: ModelValue) => {
      const { onChange } = attrs
      if (isFunction(onChange)) {
        onChange(values)
      }
      let lastItem = innerOptions
      const { value, children } = propsOptions.value
      const fullValues = values.map((val, index) => {
        const curItem = lastItem.find((item) => item[value] === val)
        lastItem = curItem ? curItem[children] as UeCascaderOption[] : []
        return curItem as UeCascaderOption
      })
      emit('fullValueChange', fullValues)
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

    return () =>
      h(
        UeCascader,
        {
          [UI_MODEL_VALUE]: handleValue.value,
          [ON_UI_UPDATE_MODEL_VALUE]: onUpdateValue,
          options: state.options,
          props: propsOptions.value,
          disabled: state.initLoading,
          onChange: getFullValue
        },
        slots
      )
  }
})
