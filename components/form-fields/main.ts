// <template>
//   <div class="ue-form-fields">
//     <template v-for="(item, index) of handledItems" >
//       <component
//         v-if="item.component"
//         :is="item.component"
//         :ref="item.prop || item.key"
//         v-bind="getCustomItemProps(item)"
//         v-on="item.fieldEvents"
//         :value="getValue(item.prop)"
//         @input="setValue(item.prop, $event)"
//         :key="getItemKey(item, index)"
//       >
//       </component>
//       <ue-form-field-item
//         v-else
//         :ref="item.prop || item.key"
//         v-bind="getFormFieldProps(item)"
//         :value="getValue(item.prop)"
//         @input="setValue(item.prop, $event)"
//         :key="getItemKey(item, index)"
//       >
//       </ue-form-field-item>
//     </template>
//     <slot></slot>
//   </div>
// </template>
import {
  h,
  defineComponent,
  toRef,
  ref,
  computed,
  VNodeChild,
  resolveComponent,
  mergeProps
} from 'vue'
import FormFieldItem from '../form-field-item'
import { cloneDeep, pick } from 'lodash-es'
import { defaultProp, resolveProps } from '../utils/component'
import { NamePath } from '../form-field-item/types'
import { MODEL_VALUE, ON_UPDATE_MODEL_VALUE, UPDATE_MODEL_VALUE } from '../utils/const'
import { FormFieldsItem } from './types'

const { hasOwnProperty } = Object.prototype
const formFieldItemProps = Object.keys((FormFieldItem as any).props)

type InnerFormFields = FormFieldsItem & {
  __watchers?: any[]
  __onChange?: (value: any) => void
}

export default defineComponent({
  name: 'UeFormFields',
  props: {
    [MODEL_VALUE]: defaultProp<Record<string, any>>(Object, () => ({})),
    items: defaultProp<FormFieldsItem[]>(Array, () => []),
    delayUpdate: Boolean
  },
  setup(props, { attrs, slots, emit }) {
    const cacheValue = ref(props[MODEL_VALUE])
    const modelValue = toRef(props, MODEL_VALUE)

    const handledItems = computed<InnerFormFields[]>(() => {
      const items = props.items.filter(item =>
        item.hide instanceof Function ? !item.hide() : !item.hide
      )
      const innerItems = cloneDeep(items) as InnerFormFields[]
      innerItems.forEach(item => {
        if (item.dependencies) listenCascader(item, innerItems)
      })
      return innerItems
    })

    const getValue = (name?: NamePath) => {
      return name !== undefined ? modelValue.value[name as string] : modelValue.value
    }

    const setValue = (name?: NamePath, value?: any) => {
      const newValue = {
        ...modelValue.value,
        ...(name !== undefined ? { [name]: value } : value)
      }
      if (!props.delayUpdate) return emit(UPDATE_MODEL_VALUE, newValue)
      window.setTimeout(() => {
        cacheValue.value = {
          ...modelValue.value,
          ...(name !== undefined ? { [name]: value } : value)
        }
        emit(UPDATE_MODEL_VALUE, cacheValue.value)
        cacheValue.value = {}
      }, 0)
    }

    const fieldItems = computed<VNodeChild>(() =>
      handledItems.value.map((item, index) => {
        const { name, key, props, __onChange: onChange } = item
        const itemKey = `${name || key || index}`

        const userProps = props ? resolveProps(props) : {}

        const itemProps: Record<string, any> = mergeProps(userProps, {
          ref: itemKey,
          key: itemKey,
          [MODEL_VALUE]: getValue(name),
          [ON_UPDATE_MODEL_VALUE]: (val: any) => setValue(name, val),
          ...(onChange ? { onChange } : {})
        })

        console.log(itemProps)

        if ('component' in item) {
          const Component =
            typeof item.component === 'string' ? resolveComponent(item.component) : item.component
          if (!Component || typeof Component === 'string') return
          const { cascadeData } = item
          return h(Component, mergeProps(itemProps, { cascadeData, onChange }))
        }
        const fieldItemProps = mergeProps(pick(item, formFieldItemProps), itemProps)
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
      const onChange = changeHandler.bind(undefined, cascaderField)
      cascaderField.__onChange = onChange
      !cascaderField.__watchers && (cascaderField.__watchers = [])
      cascaderField.__watchers.push(cascaderHandler.bind(undefined, item))
    }

    const cascaderHandler = (item: InnerFormFields, value?: any, init?: boolean) => {
      const { cascadeData, spliceStart, clearValue, name, cascadeHandler } = item
      const modelData = cascadeData && Array.isArray(cascadeData[value]) ? cascadeData[value] : []
      if (cascadeHandler instanceof Function) {
        cascadeHandler<InnerFormFields>(value, name, modelData, item)
      } else if ('field' in item && item.field) {
        const { data } = item.field
        Array.isArray(data)
          ? data.splice(spliceStart || 0, data.length, ...modelData)
          : (item.field.data = modelData)
      }
      if (!init && name && hasOwnProperty.call(value, name)) {
        setValue(name, clearValue)
        changeHandler(item, modelValue.value[name])
      }
    }

    const resetFieldData = () => {
      handledItems.value.forEach(item => {
        const { dependencies } = item
        dependencies &&
          hasOwnProperty.call(modelValue.value, dependencies) &&
          cascaderHandler(item, modelValue.value[dependencies], true)
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
