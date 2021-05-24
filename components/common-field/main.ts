import {
  computed,
  DefineComponent,
  defineComponent,
  h,
  markRaw,
  mergeProps,
  resolveComponent,
  shallowRef,
  VNode
} from 'vue'
import { cloneDeep } from 'lodash-es'
import { resolveProps, vueTypeProp } from '../utils/component'
import { ON_UI_UPDATE_MODEL_VALUE, UI_MODEL_VALUE } from '../utils/const'
import { CommonFieldProps } from './types'

const fieldChild: Record<string, string> = {
  Select: 'Option',
  CheckboxGroup: 'Checkbox',
  RadioGroup: 'Radio'
}

type CFProps = CommonFieldProps

type ResolveComponent = Exclude<ReturnType<typeof resolveComponent>, string>

export default defineComponent({
  name: 'UeCommonField',
  props: {
    modelValue: vueTypeProp<any>(null),
    initValue: vueTypeProp<any>(null),
    isNumber: Boolean,
    data: vueTypeProp<CFProps['data']>(Array),
    props: vueTypeProp<CFProps['props']>([Object, Function]),
    component: vueTypeProp<CFProps['component']>([String, Function, Object]),
    childComponent: vueTypeProp<CFProps['childComponent']>([String, Function, Object]),
    dataItemRenader: vueTypeProp<CFProps['dataItemRenader']>([String, Function, Object]),
    // only for element-plus
    forbidValueFixed: Boolean,
    slots: vueTypeProp<CFProps['slots']>(Object)
  },
  $_ue_methods: ['callFieldMethod'],
  emits: ['update:modelValue'],
  setup(props, { attrs, emit, slots }) {
    const parseNumber = (value: string) => {
      return Number.isNaN(Number.parseFloat(value)) ? '' : Number.parseFloat(value)
    }

    const fieldValue = computed({
      get(): any {
        return props.initValue && props.modelValue === undefined
          ? cloneDeep(props.initValue)
          : cloneDeep(props.modelValue)
      },
      set(value) {
        let handleVal = value
        if (props.isNumber && typeof value === 'string') {
          handleVal = value.endsWith('.') || value === '-' ? value : parseNumber(value)
        }
        emit('update:modelValue', handleVal)
      }
    })

    const onBlurNumberHandler = computed(() =>
      props.isNumber
        ? {
            onBlur: (...args: unknown[]) => {
              if (typeof fieldValue.value === 'string') {
                fieldValue.value = parseNumber(fieldValue.value)
              }
              if (attrs.onBlur instanceof Function) attrs.onBlur(...args)
            }
          }
        : {}
    )

    const Field = shallowRef(
      typeof props.component === 'string'
        ? (resolveComponent(props.component) as DefineComponent)
        : props.component
    )

    const modelProps = computed(() => {
      if (!Field.value) return {}
      const isModelValue = Field.value.props && 'modelValue' in Field.value.props
      const modelValue = isModelValue ? 'modelValue' : UI_MODEL_VALUE
      const onUpdateModelValue = isModelValue ? 'onUpdate:modelValue' : ON_UI_UPDATE_MODEL_VALUE
      return {
        [modelValue]: fieldValue.value,
        [onUpdateModelValue]: (val: any) => (fieldValue.value = val),
        ref: 'field'
      }
    })

    const fieldProps = computed(() => {
      if (!Field.value) return {}
      return mergeProps(
        attrs,
        props.props ? resolveProps(props.props) : {},
        onBlurNumberHandler.value,
        modelProps.value
      )
    })

    const isItemNeedFixed = computed(() => {
      if (props.forbidValueFixed || typeof props.component !== 'string') return false
      return ['ElRadioGroup', 'ElCheckboxGroup'].includes(props.component)
    })

    const childField = computed<ResolveComponent | undefined>(() => {
      if (props.childComponent) {
        const childFieldComp =
          typeof props.childComponent === 'string'
            ? resolveComponent(props.childComponent)
            : markRaw(props.childComponent)
        if (typeof childFieldComp !== 'string') return childFieldComp
      }
      if (typeof props.component === 'string') {
        const noPrefixName = props.component.replace('El', '')
        const childFieldComp = fieldChild[noPrefixName]
          ? resolveComponent(`El${fieldChild[noPrefixName]}`)
          : ''
        if (typeof childFieldComp !== 'string') return childFieldComp
      }
      return undefined
    })

    const createDataItem = (item: UE.Option, index: number) => {
      const { value, label } = item
      const childNodes =
        props.dataItemRenader && props.dataItemRenader instanceof Function
          ? props.dataItemRenader(item, index)
          : undefined
      const ChildFieldComp = childField.value as DefineComponent

      return isItemNeedFixed.value
        ? h(
            ChildFieldComp,
            { ...item, label: value, key: value },
            { default: () => (childNodes ? childNodes : label) }
          )
        : h(ChildFieldComp, { ...item, key: value }, { default: () => childNodes })
    }

    const dataChildren = computed(() => {
      return Array.isArray(props.data) && props.data.length && childField.value
        ? props.data.map(createDataItem)
        : undefined
    })

    const fieldSlots = computed(() => ({
      ...(dataChildren.value ? { default: () => dataChildren.value } : {}),
      ...props.slots,
      ...slots
    }))

    return () => {
      if (!Field.value) return
      return h(Field.value, fieldProps.value, fieldSlots.value)
    }
  },
  methods: {
    /** public methods **/
    callFieldMethod(fn: string, ...args: any[]) {
      const field = this.$refs.field as any
      if (field && typeof field[fn] === 'function') return field[fn](...args)
    }
  }
})
