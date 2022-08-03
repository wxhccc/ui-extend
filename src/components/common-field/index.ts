import {
  computed,
  DefineComponent,
  defineComponent,
  h,
  mergeProps,
  Slots,
  VNode,
  Component,
  markRaw,
  ref,
  resolveComponent
} from 'vue'
import { cloneDeep } from 'lodash-es'
import { ON_UI_UPDATE_MODEL_VALUE, UI_MODEL_CHECKED, UI_MODEL_VALUE } from '@/utils/const'
import { resolveProps, vueTypeProp } from '@/utils/component'

const fieldChild: Record<string, string> = {
  ElSelect: 'ElOption',
  ElCheckboxGroup: 'ElCheckbox',
  ElRadioGroup: 'ElRadio'
}

export interface CommonFieldProps<
  V = any,
  FP extends AnyObject = AnyObject,
  D extends Option = Option
> extends AnyObject {
  /** 表单域绑定值 */
  modelValue?: V
  /** 初始值 */
  initValue?: V
  /** 是否将绑定值转换为数字类型，主要用于Input组件 */
  isNumber?: boolean
  /** 是否需要去掉字符串类型的绑定值前后的空格，仅在离开焦点时过滤，以保留字符串中间的空格 */
  needTrim?: boolean
  /** 可枚举子元素的数据对象数组，比如Select，RadioGroup等，也可以是有子元素的自定义组件 */
  data?: D[]
  /** 表单域组件的绑定对象，具有更高优先级，以便在属性冲突时可以设置属性 */
  props?: Functional<FP>
  /** 表单域组件名称（需要已经全局注册的组件），或者传入非响应式的组件对象（避免warning） */
  component: string | Component
  /** 表单域组件的子组件，规则同上 */
  childComponent?: string | Component
  /** 子组件的默认插槽自定义渲染函数 */
  dataItemRenader?: (item: D, index: number) => VNode
  /** 表单域组件的插槽对象，部分插槽无法覆盖 */
  slots?: Slots
}

type CFProps = CommonFieldProps

export default defineComponent({
  name: 'UeCommonField',
  inheritAttrs: false,
  props: {
    modelValue: vueTypeProp<any>(null),
    initValue: vueTypeProp<any>(null),
    isNumber: Boolean,
    needTrim: vueTypeProp<boolean>(Boolean),
    data: vueTypeProp<CFProps['data']>(Array),
    props: vueTypeProp<CFProps['props']>([Object, Function]),
    component: vueTypeProp<CFProps['component']>([String, Function, Object]),
    childComponent: vueTypeProp<CFProps['childComponent']>([String, Function, Object]),
    dataItemRenader: vueTypeProp<CFProps['dataItemRenader']>([String, Function, Object]),
    slots: vueTypeProp<CFProps['slots']>(Object),
    libPrefix: vueTypeProp<string>(String, 'El')
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit, slots, expose }) {
    const field = ref()

    const parseNumber = (value: string) => {
      return Number.isNaN(Number.parseFloat(value)) ? '' : Number.parseFloat(value)
    }

    const fieldValue = computed({
      get(): any {
        const value =
          props.initValue !== undefined && props.modelValue === undefined
            ? props.initValue
            : props.modelValue
        return value instanceof Object ? cloneDeep(value) : value
      },
      set(value) {
        let handleVal = value
        if (props.isNumber && typeof value === 'string') {
          handleVal = value.endsWith('.') || value === '-' ? value : parseNumber(value)
        }
        emit('update:modelValue', handleVal)
        if (handleVal !== props.modelValue) {
          emit('change', handleVal)
        }
      }
    })

    // 如果设置了initValue且没有传入modelValue，则在created阶段触发更新，以防止未修改提交没有值
    if (props.initValue !== undefined && props.modelValue === undefined) {
      fieldValue.value = fieldValue.value
    }

    const Field = computed(() => {
      const { component } = props
      const comp = typeof component === 'string' ? resolveComponent(component) : component
      return comp ? markRaw(comp as DefineComponent) : null
    })

    const childField = computed(() => {
      const { component, childComponent: cc } = props
      let comp = typeof cc === 'string' ? resolveComponent(cc) : cc
      if (!comp && typeof component === 'string' && fieldChild[component]) {
        comp = resolveComponent(fieldChild[component])
      }
      return comp ? markRaw(comp as DefineComponent) : null
    })

    const isModelValue = computed(() => Field.value?.props && 'modelValue' in Field.value.props)
    const isModelCheck = computed(() => Field.value?.props && 'checked' in Field.value.props)

    const baseFieldProps = computed(() => {
      if (!Field.value) {
        return {}
      }
      const onUpdateModelValue = isModelValue.value
        ? 'onUpdate:modelValue'
        : isModelCheck.value
        ? ON_UI_UPDATE_MODEL_VALUE
        : ON_UI_UPDATE_MODEL_VALUE

      const optionsData = !childField.value && props.data ? { options: props.data } : {}

      return mergeProps(props.props ? resolveProps(props.props) : {}, optionsData, {
        [onUpdateModelValue]: (val: any) => (fieldValue.value = val),
        ref: field
      })
    })

    const createDataItem = (item: Option, index: number) => {
      const { value, label } = item
      const { dataItemRenader } = props
      const childNodes = dataItemRenader instanceof Function ? dataItemRenader(item, index) : label
      const ChildFieldComp = childField.value as DefineComponent

      return h(ChildFieldComp, { ...item, key: `${value}` }, { default: () => childNodes })
    }

    const dataChildren = computed(() => {
      const { data } = props
      return Array.isArray(data) && data.length && childField.value
        ? data.map(createDataItem)
        : undefined
    })

    const fieldSlots = computed(() => ({
      ...(dataChildren.value ? { default: () => dataChildren.value } : {}),
      ...props.slots,
      ...slots
    }))

    const onBlurNumberHandler =
      props.isNumber || props.needTrim
        ? {
            onBlur: (...args: unknown[]) => {
              if (typeof fieldValue.value === 'string') {
                let value: StrOrNum = fieldValue.value
                if (props.needTrim) {
                  value = value.trim()
                }
                if (props.isNumber) {
                  value = parseNumber(fieldValue.value)
                }
                fieldValue.value = value
              }
              if (attrs.onBlur instanceof Function) {
                attrs.onBlur(...args)
              }
            }
          }
        : {}

    // 将modelValue和其他props属性分开，避免不必要的计算
    const fieldProps = computed(() => {
      const modelValue = isModelValue.value
        ? 'modelValue'
        : isModelCheck.value
        ? UI_MODEL_CHECKED
        : UI_MODEL_VALUE
      return {
        ...attrs,
        ...onBlurNumberHandler,
        ...baseFieldProps.value,
        [modelValue]: fieldValue.value
      }
    })
    const callFieldMethod = (fn: string, ...args: any[]) => {
      const instance = field.value
      if (instance && typeof instance[fn] === 'function') {
        return instance[fn](...args)
      }
    }
    expose({ callFieldMethod })

    return () => {
      if (!Field.value) {
        return null
      }
      return h(Field.value, fieldProps.value, fieldSlots.value)
    }
  }
})
