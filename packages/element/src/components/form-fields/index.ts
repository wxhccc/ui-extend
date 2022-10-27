import {
  h,
  defineComponent,
  ref,
  computed,
  VNodeChild,
  resolveComponent,
  mergeProps,
  reactive,
  VNodeProps,
  markRaw
} from 'vue'
import { cloneDeep, get, isFunction, set } from 'lodash-es'
import { resolveProps, vueTypeProp } from '@wxhccc/ue-shared'
import FormFieldItem from '@/components/form-field-item'
import { getFormItemFullName, getFormItemName } from '@/utils/component'
import { FormFieldsItem, FormFieldsOption, FormFieldsProps } from './types'

export * from './types'

const { hasOwnProperty } = Object.prototype

type InnerFormFields = FormFieldsItem & {
  __watchers?: AnyFunction<unknown>[]
  __onChange?: (value: unknown) => void
}

export default defineComponent({
  name: 'UeFormFields',
  props: {
    modelValue: vueTypeProp<NonNullable<FormFieldsProps['modelValue']>>(Object, () => ({})),
    items: vueTypeProp<NonNullable<FormFieldsProps['items']>>(Array, () => []),
    delayUpdate: Boolean
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit, expose }) {
    const cacheValue = ref(props.modelValue)

    const formItemRefs = ref<Record<string, any>>({})

    const handledItems = computed<InnerFormFields[]>(() => {
      const items = props.items.filter((item) =>
        isFunction(item.hide) ? !item.hide() : !item.hide
      )
      items.forEach((item) => {
        if ('field' in item && item.field) {
          const { component, childComponent } = item.field
          if (typeof component !== 'string') {
            item.field.component = markRaw(component)
          }
          if (childComponent && typeof childComponent !== 'string') {
            item.field.childComponent = markRaw(childComponent)
          }
        }
        if ('component' in item && item.component && typeof item.component !== 'string') {
          item.component = markRaw(item.component)
        }
      })
      const innerItems = reactive(items) as InnerFormFields[]
      innerItems.forEach((item) => {
        if (item.dependencies) {
          listenCascader(item, innerItems)
        }
      })
      return innerItems
    })

    const getValue = (item: InnerFormFields) => {
      const { prevNames } = item
      const handleName = getFormItemName(item)
      let prevValue = props.modelValue
      // 如果配置了prevNames，需要拼接属性来获取参数
      if (prevNames && Array.isArray(prevNames) && prevNames.length) {
        prevValue = get(props.modelValue, prevNames, {})
      }
      return handleName !== undefined ? prevValue[handleName as string] : prevValue
    }

    const emitUpdate = (val: AnyObject) => {
      emit('update:modelValue', val)
      emit('change', val)
    }
    const setValue = (item: InnerFormFields, value?: unknown, delay?: boolean) => {
      const { prevNames } = item
      const handleName = getFormItemName(item)
      const cloneValues = cloneDeep(props.modelValue)

      const changeValue = (handleName !== undefined ? { [handleName]: value } : value) as AnyObject
      // 如果配置了prevNames，需要拼接属性来获取参数
      if (prevNames && Array.isArray(prevNames) && prevNames.length) {
        const prevValue = get(props.modelValue, prevNames, {})
        set(cloneValues, prevNames, { ...prevValue, ...changeValue })
      } else {
        Object.assign(cloneValues, changeValue)
      }
      if (!delay && !props.delayUpdate) {
        return emitUpdate(cloneValues)
      }
      window.setTimeout(() => {
        Object.assign(cacheValue.value, props.modelValue, {
          ...((handleName !== undefined ? { [handleName]: value } : value) as AnyObject)
        })
        emitUpdate(cacheValue.value)
        cacheValue.value = {}
      }, 0)
    }

    const fieldItems = computed<VNodeChild>(() =>
      handledItems.value.map((item, index) => {
        const { key, __onChange: onChange } = item
        const handleName = getFormItemName(item)
        const itemKey = `${handleName || key || index}`
        const itemNamePath = getFormItemFullName(handleName, item.prevNames).join('.')

        const userProps = (item.props ? resolveProps(item.props) : {}) as VNodeProps

        const itemProps = mergeProps(userProps, {
          ref: (item) => formItemRefs.value[itemNamePath] = item,
          key: itemKey,
          modelValue: getValue(item),
          'onUpdate:modelValue': (val: AnyObject) => setValue(item, val)
        })

        if ('slotName' in item && item.slotName) {
          const slot = slots[item.slotName]
          return isFunction(slot) ? slot() : null
        } else if ('component' in item) {
          const Component =
            typeof item.component === 'string' ? resolveComponent(item.component) : item.component
          if (!Component || typeof Component === 'string') {
            return
          }
          const { cascadeData } = item
          return h(Component, mergeProps(itemProps, { cascadeData, onChange }))
        }
        const fieldItemProps = mergeProps(item as VNodeProps, itemProps) as FormFieldsOption
        if (onChange && fieldItemProps.field) {
          fieldItemProps.field.onChange = onChange
        }
        return h(FormFieldItem, fieldItemProps)
      })
    )

    const changeHandler = (item: InnerFormFields, value: unknown) => {
      const { __watchers } = item
      Array.isArray(__watchers) && __watchers.forEach((watcher) => watcher(value))
    }

    // 级联数据项监听器
    const listenCascader = (item: InnerFormFields, handledItems: InnerFormFields[]) => {
      const { dependencies } = item
      const cascaderField = handledItems.find((i) => getFormItemName(i) === dependencies)
      if (!cascaderField) {
        return
      }
      cascaderField.__onChange = changeHandler.bind(undefined, cascaderField)
      !cascaderField.__watchers && (cascaderField.__watchers = [])
      const handler = (value?: unknown, init?: boolean) => cascaderHandler(item, value, init)
      cascaderField.__watchers.push(handler)
    }

    const cascaderHandler = (item: InnerFormFields, value?: unknown, init?: boolean) => {
      const { cascadeData, spliceStart = 0, clearValue, cascadeHandler } = item
      const handleName = getFormItemName(item)
      const modelData =
        cascadeData && Array.isArray(cascadeData[value as string])
          ? cascadeData[value as string]
          : []
      if (isFunction(cascadeHandler)) {
        cascadeHandler(value, handleName, modelData, item, getFormItemRefs())
      } else if ('field' in item && item.field) {
        const { data } = item.field
        Array.isArray(data)
        item.field.data =
          spliceStart > 0 && Array.isArray(data)
            ? data.slice(0, spliceStart).concat(modelData)
            : modelData
      }
      if (!init && handleName && props.modelValue[handleName] !== clearValue) {
        setValue(item, clearValue, true)
        changeHandler(item, value)
      }
    }

    const resetFieldData = () => {
      handledItems.value.forEach((item) => {
        const { dependencies } = item
        dependencies &&
          hasOwnProperty.call(props.modelValue, dependencies) &&
          cascaderHandler(item, props.modelValue[dependencies], true)
      })
    }

    const initCascaderFields = () => {
      handledItems.value.forEach((item) => {
        if (!item.__watchers) {
          return
        }
        item.__watchers.forEach((watcher) =>
          watcher(props.modelValue[getFormItemName(item) as string], true)
        )
      })
    }

    resetFieldData()

    const getFormItemRefs = () => formItemRefs.value

    expose({ initCascaderFields, getFormItemRefs })

    return () =>
      h(
        'div',
        { class: 'ue-form-fields' },
        {
          ...slots,
          default: () => {
            if (!slots.default) {
              return fieldItems.value
            }
            return [fieldItems.value, slots.default()]
          }
        }
      )
  }
})
