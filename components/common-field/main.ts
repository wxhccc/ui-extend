import {
  computed,
  DefineComponent,
  defineComponent,
  h,
  mergeProps,
  resolveComponent,
  toRef,
  toRefs,
  VNode
} from 'vue'
import { cloneDeep } from 'lodash-es'
import { resolveProps, defaultProp } from '../utils/component'
import { ON_UPDATE_MODEL_VALUE, UI_MODEL_VALUE, UPDATE_MODEL_VALUE } from '../utils/const'
import { FieldOption } from './types'

const fieldChild: Record<string, string> = {
  Select: 'Option',
  CheckboxGroup: 'Checkbox',
  RadioGroup: 'Radio'
}

type ResolveComponent = Exclude<ReturnType<typeof resolveComponent>, string>

export default defineComponent({
  name: 'UeCommonField',
  props: {
    modelValue: defaultProp<any>(null),
    field: defaultProp<FieldOption>(Object, () => ({}))
  },
  $_ue_methods: ['callFieldMethod'],
  emits: [UPDATE_MODEL_VALUE],
  setup(props, { attrs, emit, slots }) {
    const { component, childComponent, data, props: fProps } = toRefs(props.field)
    const isNumber = toRef(props.field, 'isNumber')
    const parseNumber = (value: string) => {
      return Number.isNaN(Number.parseFloat(value)) ? '' : Number.parseFloat(value)
    }

    const fieldValue = computed({
      get(): any {
        const initValue = toRef(props.field, 'initValue')
        return initValue.value && props.modelValue === undefined
          ? cloneDeep(initValue.value)
          : cloneDeep(props.modelValue)
      },
      set(value) {
        let handleVal = value
        if (isNumber.value && typeof value === 'string') {
          handleVal = value.endsWith('.') || value === '-' ? value : parseNumber(value)
        }
        emit(UPDATE_MODEL_VALUE, handleVal)
      }
    })

    const onBlurNumberHandler = isNumber.value
      ? {
          onBlur: (...args: unknown[]) => {
            if (typeof fieldValue.value === 'string') {
              fieldValue.value = parseNumber(fieldValue.value)
            }
            if (attrs.onBlur instanceof Function) attrs.onBlur(...args)
          }
        }
      : {}

    const fieldProps = computed(() =>
      mergeProps(
        attrs,
        fProps && fProps.value ? resolveProps(fProps.value) : {},
        onBlurNumberHandler,
        {
          [UI_MODEL_VALUE]: fieldValue.value,
          [ON_UPDATE_MODEL_VALUE]: (val: any) => (fieldValue.value = val),
          ref: 'field'
        }
      )
    )

    const Field =
      typeof component.value === 'string'
        ? (resolveComponent(component.value) as DefineComponent)
        : component.value

    const isItemNeedFixed = computed(() => {
      const forbidValueFixed = toRef(props.field, 'forbidValueFixed')
      if (forbidValueFixed.value || typeof component.value !== 'string') return false
      return ['ElRadioGroup', 'ElCheckboxGroup'].includes(component.value)
    })

    const childField = computed<ResolveComponent | undefined>(() => {
      if (childComponent && childComponent.value) {
        const childFieldComp =
          typeof childComponent.value === 'string'
            ? resolveComponent(childComponent.value)
            : childComponent.value
        if (typeof childFieldComp !== 'string') return childFieldComp
      }
      if (typeof component.value === 'string') {
        const noPrefixName = component.value.replace('El', '')
        const childFieldComp = fieldChild[noPrefixName]
          ? resolveComponent(`El${fieldChild[noPrefixName]}`)
          : ''
        if (typeof childFieldComp !== 'string') return childFieldComp
      }
      return undefined
    })

    const createDataItem = (item: UE.Option, index: number) => {
      const dataItemRenader = toRef(props.field, 'dataItemRenader')
      const { value, label } = item
      const childNodes =
        dataItemRenader.value && typeof dataItemRenader.value === 'function'
          ? dataItemRenader.value(item, index)
          : undefined
      const ChildFieldComp = childField.value as DefineComponent
      return isItemNeedFixed.value
        ? h(
            ChildFieldComp,
            { ...item, label: value },
            { default: () => (childNodes ? childNodes : label) }
          )
        : h(ChildFieldComp, { ...item }, { default: () => childNodes })
    }

    const dataChildren = computed(() => {
      return data && Array.isArray(data.value) && data.value.length && childField.value
        ? data.value.map(createDataItem)
        : undefined
    })

    const dataSlots = toRef(props.field, 'slots')
    const fieldSlots = { ...dataSlots.value, ...slots }
    if (dataChildren.value) {
      fieldSlots.default = () => dataChildren.value as VNode[]
    }

    return () => {
      if (!Field) return
      return h(Field, fieldProps.value, fieldSlots)
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
