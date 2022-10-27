import { computed, defineComponent, ref, h, mergeProps, Slots, VNodeProps } from 'vue'
import {
  UeFormItem,
  UeRow,
  UeCol,
  UeTooltip,
  UeSpace,
  UeFormItemProps,
  QuestionFilled,
  MODEL_VALUE,
  ON_UPDATE_MODEL_VALUE,
  UPDATE_MODEL_VALUE,
  FORM_ITEM_NAME
} from '@/ui-comps'
import { resolveProps, useProxyInstanceMethods, vueTypeProp } from '@wxhccc/ue-shared'
import { getFormItemFullName, getFormItemName } from '@/utils/component'
import CommomField, { CommonFieldProps } from '@/components/common-field'
import { ChildFormFieldItemOption, FormFieldItemOption, NamePath, TextType } from './types'

export * from './types'

export default defineComponent({
  name: 'UeFormFieldItem',
  inheritAttrs: false,
  props: {
    modelValue: vueTypeProp<any>(null),
    props: vueTypeProp<FormFieldItemOption['props']>([Object, Function]),
    name: vueTypeProp<FormFieldItemOption['name']>([String, Number]),
    prevNames: vueTypeProp<FormFieldItemOption['prevNames']>(Array),
    text: vueTypeProp<FormFieldItemOption['text']>([Boolean, String, Function]),
    slots: vueTypeProp<FormFieldItemOption['slots']>(Object),
    field: vueTypeProp<FormFieldItemOption['field']>(Object),
    labelTip: vueTypeProp<FormFieldItemOption['labelTip']>(String),
    children: vueTypeProp<FormFieldItemOption['children']>(Array)
  },
  emits: [UPDATE_MODEL_VALUE, 'change'],
  setup(props, { emit, slots, expose }) {
    const formItemRef = ref()

    const childrenItemsRef = ref<Record<string, any>>({})

    const handleName = computed(() => getFormItemName(props))
    const formItemNames = computed(() => getFormItemFullName(handleName.value, props.prevNames))
    const hasChild = computed(() => Array.isArray(props.children) && props.children.length > 0)

    const handleValue = computed({
      get(): any {
        return hasChild.value
          ? props.modelValue instanceof Object
            ? props.modelValue
            : {}
          : props.modelValue
      },
      set(val: any) {
        emit(UPDATE_MODEL_VALUE, val)
        if (val !== props.modelValue) {
          emit('change', val)
        }
      }
    })
    const hasLabelTip = computed(() => !!props.labelTip && typeof props.labelTip === 'string')

    const formItemProps = computed(() => {
      const fiProps = props.props ? resolveProps(props.props) : {}
      return {
        ...fiProps,
        [FORM_ITEM_NAME]: formItemNames.value
      } as Partial<UeFormItemProps>
    })
    const handleFormItemProps = computed(() => {
      if (hasLabelTip.value) {
        const { label, ...rest } = formItemProps.value
        return rest
      }
      return formItemProps.value
    })

    const formItemLabelSlot = computed(() => {
      return hasLabelTip.value
        ? {
            label: () =>
              h(UeSpace, null, {
                default: () => [
                  formItemProps.value.label,
                  h(
                    UeTooltip,
                    { title: props.labelTip, placement: 'top' },
                    { default: () => h(QuestionFilled) }
                  )
                ]
              })
          }
        : {}
    })

    const handledItemText = computed(() => {
      const { text } = props
      return text ? handleItemText(text, handleName.value, handleValue.value) : ''
    })
    const handledFieldContent = computed(() => {
      const { field, children } = props
      return hasChild.value
        ? handleMultItems(children as ChildFormFieldItemOption[])
        : handleFormItemField(field, handleName.value)
    })

    const formItemContent = computed(() => {
      return props.text ? handledItemText.value : handledFieldContent.value
    })

    const handleValueChange = (value: any, name?: NamePath) => {
      const newValue = hasChild.value && name ? { ...handleValue.value, [name]: value } : value
      emit(UPDATE_MODEL_VALUE, newValue)
    }
    const handleItemText = (text: TextType, name?: NamePath, value?: any) => {
      return text instanceof Function ? text(value, name) : typeof text !== 'boolean' ? text : value
    }
    const handleFormItemField = (field?: CommonFieldProps, name?: NamePath) => {
      if (!field) {
        return
      }
      const value = hasChild.value && name ? handleValue.value[name] : handleValue.value
      return h(
        CommomField,
        mergeProps(field, {
          class: 'ue-common-field',
          [MODEL_VALUE]: value,
          [ON_UPDATE_MODEL_VALUE]: (val: any) => handleValueChange(val, name)
        })
      )
    }
    const getChildFormItemProps = (child: ChildFormFieldItemOption) => {
      const { props, field } = child
      const handleName = getFormItemName(child)
      const prevNames = getFormItemFullName(handleName, formItemNames.value)
      const namePath = prevNames.join('.')
      return mergeProps((props ? resolveProps(props) : {}) as VNodeProps, {
        [FORM_ITEM_NAME]: prevNames,
        field,
        ref: (item) => (childrenItemsRef.value[namePath] = item)
      })
    }
    const handleMultItems = (children: ChildFormFieldItemOption[]) => {
      const span = 24 / children.length
      return h(
        UeRow,
        { type: 'flex', gutter: 20 },
        {
          default: () =>
            children.map((child, idx) => {
              const { key, colProps } = child
              const colKey: string | number = key || getFormItemName(child) || idx
              return h(
                UeCol,
                mergeProps((colProps ? resolveProps(colProps) : {}) as VNodeProps, {
                  span,
                  class: 'ue-sub-item-panel',
                  key: colKey
                }),
                {
                  default: () => handleChildItemContent(child)
                }
              )
            })
        }
      )
    }
    const handleChildItemContent = (item: ChildFormFieldItemOption) => {
      const { text, field, slots } = item
      const handleName = getFormItemName(item)
      if (text) {
        return handleItemText(text, handleName, handleName && handleValue.value[handleName])
      }
      const childFieldProps = getChildFormItemProps(item)
      const formItemContent = handleFormItemField(field, handleName)
      const formItemSlots = {
        ...slots,
        default: () => formItemContent
      }
      return h(UeFormItem, childFieldProps, formItemSlots)
    }

    const proxyMethods = useProxyInstanceMethods(formItemRef, ['resetField', 'clearValidate'])

    const getFormItemRefs = () => {
      return { ROOT: formItemRef.value,  ...childrenItemsRef.value }
    }

    expose({ ...proxyMethods, getFormItemRefs })

    return () => {
      const handleSlots = { ...formItemLabelSlot.value, ...props.slots, ...slots }
      return h(
        UeFormItem,
        mergeProps(
          {
            class: 'ue-form-field-item',
            key: `${handleName.value}`,
            ref: formItemRef
          },
          handleFormItemProps.value as VNodeProps
        ),
        {
          ...handleSlots,
          default: () => {
            const { default: defSlot } = handleSlots as Slots
            if (!(defSlot instanceof Function)) {
              return formItemContent.value
            }
            return [formItemContent.value, defSlot()]
          }
        }
      )
    }
  }
})
