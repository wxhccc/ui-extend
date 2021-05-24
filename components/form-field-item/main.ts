import { computed, defineComponent, h, mergeProps, ref, VNode } from 'vue'
import FormItem, { FIELD_NAME, FormItemProps, publicMethods } from '../ui-comps/form-item'
import { Row, Col } from '../ui-comps/row-col'
import CommomField, { CommonFieldProps } from '../common-field'
import { useProxyInstanceMethods } from '../utils/hooks'
import { vueTypeProp, resolveProps } from '../utils/component'
import { NamePath } from '../utils/types'
import { ChildFormFieldItemOption, FormFieldItemOption, TextType } from './types'

export default defineComponent({
  name: 'UeFormFieldItem',
  props: {
    modelValue: vueTypeProp<any>(null),
    props: vueTypeProp<FormFieldItemOption['props']>([Object, Function]),
    name: vueTypeProp<FormFieldItemOption['name']>([String, Number]),
    prevNames: vueTypeProp<FormFieldItemOption['prevNames']>(Array),
    text: vueTypeProp<FormFieldItemOption['text']>([Boolean, String, Function]),
    slots: vueTypeProp<FormFieldItemOption['slots']>(Object),
    field: vueTypeProp<FormFieldItemOption['field']>(Object),
    children: vueTypeProp<FormFieldItemOption['children']>(Array)
  },
  emits: ['update:modelValue'],
  setup(props) {
    const handleFormItemName = (name: NamePath = '', prevNames?: NamePath[]) => {
      const curPath = name ? [name] : []
      return Array.isArray(prevNames) ? prevNames.concat(curPath) : curPath
    }
    const formItemNames = computed(() => handleFormItemName(props.name, props.prevNames))
    const hasChild = computed(() => Array.isArray(props.children) && props.children.length > 0)
    const formItem = ref()
    const proxyMethods = useProxyInstanceMethods(formItem, publicMethods)

    return {
      formItem,
      formItemNames,
      hasChild,
      handleFormItemName,
      ...proxyMethods
    }
  },
  computed: {
    handleValue: {
      get(): any {
        return this.hasChild
          ? typeof this.modelValue === 'object'
            ? this.modelValue
            : {}
          : this.modelValue
      },
      set(val: any) {
        this.$emit('update:modelValue', val)
      }
    },
    formItemProps(): FormItemProps {
      return mergeProps(this.$attrs, this.props ? resolveProps(this.props) : {}, {
        [FIELD_NAME]: this.formItemNames.join('.')
      })
    },
    formItemSlots(): any {
      return {
        ...this.slots,
        ...this.$slots,
        default: () => {
          if (!this.slots || !(this.slots.default instanceof Function)) {
            return this.formItemContent
          }
          return [this.formItemContent, this.slots.default()]
        }
      }
    },
    handledItemText(): string {
      const { name, text, handleValue } = this
      return text ? this.handleItemText(text, name, handleValue) : ''
    },
    handledFieldContent(): undefined | VNode {
      const { name, field, hasChild, children } = this
      return hasChild
        ? this.handleMultItems(children as ChildFormFieldItemOption[])
        : this.handleFormItemField(field, name)
    },
    formItemContent(): undefined | string | VNode {
      return this.text ? this.handledItemText : this.handledFieldContent
    }
  },
  methods: {
    handleValueChange(value: any, name?: NamePath) {
      const newValue = this.hasChild && name ? { ...this.handleValue, [name]: value } : value
      this.$emit('update:modelValue', newValue)
    },
    handleItemText(text: TextType, name?: NamePath, value?: any) {
      return text instanceof Function ? text(value, name) : typeof text !== 'boolean' ? text : value
    },
    handleFormItemField(field?: CommonFieldProps, name?: NamePath) {
      if (!field) return
      const value = this.hasChild && name ? this.handleValue[name] : this.handleValue
      const fieldProps = mergeProps(field, {
        class: 'ue-form-field',
        modelValue: value,
        'onUpdate:modelValue': (val: any) => this.handleValueChange(val, name)
      })
      return h(CommomField, fieldProps)
    },
    getChildFormItemProps(child: ChildFormFieldItemOption) {
      const { name, props, field } = child
      const prevNames = this.handleFormItemName(name, this.formItemNames)
      return mergeProps(props ? resolveProps(props) : {}, {
        [FIELD_NAME]: prevNames.join('.'),
        field,
        ref: `${name}`
      })
    },
    handleMultItems(children: ChildFormFieldItemOption[]) {
      const span = 24 / children.length
      return h(
        Row,
        { type: 'flex', gutter: 20 },
        {
          default: () =>
            children.map((child, idx) => {
              const { key, name, colProps } = child
              const colKey = key || name || idx
              return h(
                Col,
                mergeProps(
                  {
                    span,
                    class: 'ue-sub-item-panel',
                    key: colKey
                  },
                  colProps ? resolveProps(colProps) : {}
                ),
                {
                  default: () => this.handleChildItemContent(child)
                }
              )
            })
        }
      )
    },
    handleChildItemContent(item: ChildFormFieldItemOption) {
      const { text, name, field, slots } = item
      const handleValue = this.handleValue as Record<string, any>
      if (text) return this.handleItemText(text, name, name && handleValue[name])
      const childFieldProps = this.getChildFormItemProps(item)
      const formItemContent = this.handleFormItemField(field, name)
      const formItemSlots = {
        ...slots,
        default: () => formItemContent
      }
      return h(FormItem, childFieldProps, formItemSlots)
    }
  },
  render() {
    const { formItemProps, formItemSlots } = this
    return h(
      FormItem,
      mergeProps(
        {
          class: 'ue-form-field-item',
          ref: 'formItem'
        },
        formItemProps
      ),
      formItemSlots
    )
  }
})
