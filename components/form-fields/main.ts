import {
  h,
  defineComponent,
  ref,
  computed,
  VNodeChild,
  resolveComponent,
  mergeProps,
  reactive,
  getCurrentInstance
} from 'vue'
import { cloneDeep, pick } from 'lodash-es'
import FormFieldItem from '../form-field-item'
import { vueTypeProp, resolveProps } from '../utils/component'
import { FormFieldsItem, FormFieldsOption } from './types'
import { NamePath } from '../utils/types'

const { hasOwnProperty } = Object.prototype
const formFieldItemProps = Object.keys((FormFieldItem as any).props)

type InnerFormFields = FormFieldsItem & {
  __watchers?: any[]
  __onChange?: (value: any) => void
}

export default defineComponent({
  name: 'UeFormFields',
  props: {
    modelValue: vueTypeProp<Record<string, any>>(Object, () => ({})),
    items: vueTypeProp<FormFieldsItem[]>(Array, () => []),
    delayUpdate: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const cacheValue = ref(props.modelValue)

    const handledItems = computed<InnerFormFields[]>(() => {
      const items = props.items.filter(item =>
        item.hide instanceof Function ? !item.hide() : !item.hide
      )
      const innerItems = reactive(cloneDeep(items)) as InnerFormFields[]
      innerItems.forEach(item => {
        if (item.dependencies) listenCascader(item, innerItems)
      })
      return innerItems
    })

    const getValue = (name?: NamePath) => {
      return name !== undefined ? props.modelValue[name as string] : props.modelValue
    }

    const setValue = (name?: NamePath, value?: any, delay?: boolean) => {
      const newValue = {
        ...props.modelValue,
        ...(name !== undefined ? { [name]: value } : value)
      }
      if (!delay && !props.delayUpdate) return emit('update:modelValue', newValue)
      window.setTimeout(() => {
        Object.assign(cacheValue.value, props.modelValue, {
          ...(name !== undefined ? { [name]: value } : value)
        })
        emit('update:modelValue', cacheValue.value)
        cacheValue.value = {}
      }, 0)
    }

    const fieldItems = computed<VNodeChild>(() =>
      handledItems.value.map((item, index) => {
        const { name, key, __onChange: onChange } = item
        const itemKey = `${name || key || index}`

        const userProps = item.props ? resolveProps(item.props) : {}

        const itemProps: Record<string, any> = mergeProps(userProps, {
          ref: itemKey,
          key: itemKey,
          modelValue: getValue(name),
          'onUpdate:modelValue': (val: any) => setValue(name, val)
        })

        if ('component' in item) {
          const Component =
            typeof item.component === 'string' ? resolveComponent(item.component) : item.component
          if (!Component || typeof Component === 'string') return
          const { cascadeData } = item
          return h(Component, mergeProps(itemProps, { cascadeData, onChange }))
        }
        const fieldItemProps = mergeProps(item as FormFieldsOption, itemProps) as FormFieldsOption
        if (onChange && fieldItemProps.field) {
          fieldItemProps.field.onChange = onChange
        }
        return h(FormFieldItem, fieldItemProps)
      })
    )

    const changeHandler = (item: InnerFormFields, value: any) => {
      const { __watchers } = item
      Array.isArray(__watchers) && __watchers.forEach(watcher => watcher(value))
    }

    // 级联数据项监听器
    const listenCascader = (item: InnerFormFields, handledItems: InnerFormFields[]) => {
      const { dependencies } = item
      const cascaderField = handledItems.find(item => item.name === dependencies)
      if (!cascaderField) return
      cascaderField.__onChange = changeHandler.bind(undefined, cascaderField)
      !cascaderField.__watchers && (cascaderField.__watchers = [])
      cascaderField.__watchers.push(cascaderHandler.bind(undefined, item))
    }

    const cascaderHandler = (item: InnerFormFields, value?: any, init?: boolean) => {
      const { cascadeData, spliceStart = 0, clearValue, name, cascadeHandler } = item
      const modelData = cascadeData && Array.isArray(cascadeData[value]) ? cascadeData[value] : []
      if (cascadeHandler instanceof Function) {
        const instance = (getCurrentInstance() || {}).proxy
        cascadeHandler.call(instance, value, name, modelData, item)
      } else if ('field' in item && item.field) {
        const { data } = item.field
        Array.isArray(data)
        item.field.data =
          spliceStart > 0 && Array.isArray(data)
            ? data.slice(0, spliceStart).concat(modelData)
            : modelData
      }
      if (!init && name && props.modelValue[name] !== clearValue) {
        setValue(name, clearValue, true)
        changeHandler(item, value)
      }
    }

    const resetFieldData = () => {
      handledItems.value.forEach(item => {
        const { dependencies } = item
        dependencies &&
          hasOwnProperty.call(props.modelValue, dependencies) &&
          cascaderHandler(item, props.modelValue[dependencies], true)
      })
    }

    resetFieldData()

    return () =>
      h('div', mergeProps(attrs, { class: 'ue-form-fields' }), {
        ...slots,
        default: () => {
          if (!slots.default) return fieldItems.value
          return [fieldItems.value, slots.default()]
        }
      })
  },
  $_ue_methods: ['callItemMethod'],
  methods: {
    callItemMethod(name: NamePath, fnName: string, ...args: any[]) {
      const instances = this.$refs[name]
      if (!instances) return
      const instance = Array.isArray(instances) && instances.length ? instances[0] : instances
      instance[fnName] instanceof Function && instance[fnName](...args)
    },
    initCascaderFields() {
      // this.handledItems.forEach(item => {
      //   item.__watchers && item.__watchers.forEach(watcher => watcher(this.value[item.prop], true))
      // })
    }
  }
})
