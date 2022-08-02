import { computed, defineComponent, h, mergeProps, Slots, VNodeProps } from 'vue'
import { omit } from 'lodash-es'
import { QuestionFilled } from '@/ui-comps/icons'
import { UeFormItem, UeRow, UeCol, UeTooltip, UeSpace } from '@/ui-comps'
import { MODEL_VALUE, ON_UPDATE_MODEL_VALUE, UPDATE_MODEL_VALUE } from '@/utils/const'
import CommomField, { CommonFieldProps } from '../common-field'
import {
  ChildFormFieldItemOption,
  FormFieldItemOption,
  FormItemProps,
  NamePath,
  TextType
} from './types'
import { resolveProps, vueTypeProp } from '@/utils/component'

export * from './types'

export default defineComponent({
  name: 'FormFieldItem',
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
  setup(props, { emit, slots }) {
    const handleFormItemName = (name: NamePath = '', prevNames?: NamePath[]) => {
      const curPath = name ? [name] : []
      return Array.isArray(prevNames) ? prevNames.concat(curPath) : curPath
    }
    const formItemNames = computed(() => handleFormItemName(props.name, props.prevNames))
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
      return mergeProps(fiProps as VNodeProps, {
        prop: formItemNames.value
      }) as unknown as FormItemProps
    })
    const handleFormItemProps = computed(() =>
      hasLabelTip.value ? omit(formItemProps.value, 'label') : formItemProps.value
    )

    const formItemLabelSlot = computed(() => {
      return hasLabelTip.value
        ? {
            label: () =>
              h(UeSpace, [
                formItemProps.value.label,
                h(UeTooltip, { title: props.labelTip }, h(QuestionFilled))
              ])
          }
        : {}
    })

    const handledItemText = computed(() => {
      const { name, text } = props
      return text ? handleItemText(text, name, handleValue.value) : ''
    })
    const handledFieldContent = computed(() => {
      const { name, field, children } = props
      return hasChild.value
        ? handleMultItems(children as ChildFormFieldItemOption[])
        : handleFormItemField(field, name)
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
          class: 'me-common-field',
          [MODEL_VALUE]: value,
          [ON_UPDATE_MODEL_VALUE]: (val: any) => handleValueChange(val, name)
        })
      )
    }
    const getChildFormItemProps = (child: ChildFormFieldItemOption) => {
      const { name, props, field } = child
      const prevNames = handleFormItemName(name, formItemNames.value)
      return mergeProps((props ? resolveProps(props) : {}) as VNodeProps, {
        prop: prevNames,
        field,
        ref: `${name}`
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
              const { key, name, colProps } = child
              const colKey: string | number = key || name || idx
              return h(
                UeCol,
                mergeProps((colProps ? resolveProps(colProps) : {}) as VNodeProps, {
                  span,
                  class: 'me-sub-item-panel',
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
      const { text, name, field, slots } = item
      if (text) {
        return handleItemText(text, name, name && handleValue.value[name])
      }
      const childFieldProps = getChildFormItemProps(item)
      const formItemContent = handleFormItemField(field, name)
      const formItemSlots = {
        ...slots,
        default: () => formItemContent
      }
      return h(UeFormItem, childFieldProps, formItemSlots)
    }

    return () => {
      const handleSlots = { ...formItemLabelSlot.value, ...props.slots, ...slots }
      return h(
        UeFormItem,
        mergeProps(handleFormItemProps.value, {
          class: 'me-form-field-item',
          key: `${props.name}`,
          ref: 'formItem'
        }),
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
