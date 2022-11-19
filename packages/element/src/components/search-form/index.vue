<script setup lang="ts">
import { ref, computed } from 'vue'
import { pick, cloneDeep, isFunction } from 'lodash-es'
import { awaitWrapper } from '@wxhccc/es-util'
import { resolveFunctional, useIgnoreWatch, vueTypeProp, useProxyInstanceMethods, useStorage, AnyObject } from '@wxhccc/ue-shared'
import { UeForm, UeButton, ueFormProps, UeFormInstance, UeFormProps } from '@/ui-comps'
import UeFormFields from '@/components/form-fields'
import { FormFieldsItem } from '@/components/form-fields/types'
import { SearchFormProps, SearchButtonOptions } from './type'
import { getFormItemName } from '@/utils/component'

const storeSession = useStorage('SearchForm')

const props = defineProps({
  ...ueFormProps,
  items: vueTypeProp<SearchFormProps['items']>(Array, () => [], true),
  modelValue: vueTypeProp<SearchFormProps['modelValue']>(Object, () => ({})),
  searching: Boolean,
  buttonTrigger: vueTypeProp<boolean>(Boolean, true),
  showReset: Boolean,
  validateModel: Boolean,
  singleLine: Boolean,
  buttonOptions: vueTypeProp<SearchFormProps['buttonOptions']>(Object),
  formRulesCreator: vueTypeProp<SearchFormProps['formRulesCreator']>(Function),
  restore: Boolean,
  needStore: Boolean,
  storeKey: vueTypeProp<string>(String, 'data'),
  filterDisabled: Boolean
})
const emit = defineEmits<{
  (e: 'search', value: AnyObject): void
  (e: 'update:modelValue', value: AnyObject): void
  (e: 'change', value: AnyObject): void
}>()

const form = ref<UeFormInstance>()

// 通知各表单项组件恢复了表单数据
const notifyRestoreToFormItems = (data: AnyObject) => {
  props.items.forEach((item) => {
    if ('onRestored' in item && isFunction(item.onRestored)) {
      item.onRestored(data)
    }
  })
}

// 获取初始表单数据
const getInitFormData = () => {
  const { storeKey, restore } = props
  const data = storeSession('store', storeKey)
  if (restore && data) {
    emit('update:modelValue', data)
    // 通知所有设置了监听函数的表单项
    notifyRestoreToFormItems(data)
    return data as AnyObject
  }
  return { ...props.modelValue }
}

const formData = ref(getInitFormData())

const formProps = computed(() => pick(props, Object.keys(ueFormProps)))

const handleValue = computed({
  get(): AnyObject {
    const { modelValue, buttonTrigger } = props
    return modelValue !== undefined && !buttonTrigger ? modelValue : formData.value
  },
  set(value: AnyObject) {
    if (props.buttonTrigger) {
      formData.value = value
      return
    }
    props.needStore && storeSession('store', props.storeKey, value)
    ignoreWatch.value = true
    emit('update:modelValue', value)
    emit('change', value)
  }
})

const btnItemOpts = computed((): SearchButtonOptions => {
  return {
    searchBtnProps: { type: 'primary' },
    btnText: '查询',
    resetText: '重置',
    ...props.buttonOptions
  }
})

const formRules = computed((): UeFormProps['rules'] => {
  const { rules, formRulesCreator } = props
  if (rules) {
    return rules
  }
  if (isFunction(formRulesCreator)) {
    return formRulesCreator(formData.value)
  }
  return undefined
})

/** bussiness **/


// 输出数据过滤，去掉diabled的数据项
const outFormDataFilter = () => {
  const result: AnyObject = cloneDeep(formData.value)
  props.items.forEach((item: FormFieldsItem) => {
    const isHide = resolveFunctional(item.hide)
    const fieldName = getFormItemName(item)
    if (fieldName && isHide) {
      delete result[fieldName]
    }
    if ('children' in item && Array.isArray(item.children)) {
      item.children.forEach((field) => {
        const childFieldName = getFormItemName(field)
        if (childFieldName && isHide) {
          delete result[childFieldName]
        }
      })
    }
  })
  return result
}
/** events **/
const onReset = () => {
  handleValue.value = {}
  form.value?.resetFields()
  onSearch()
}
// 发送搜索表单数据
const onSearch = async () => {
  if (props.validateModel && form.value) {
    const [err] = await awaitWrapper(form.value.validate())
    if (err) {
      return
    }
  }
  const outFormData = props.filterDisabled ? outFormDataFilter() : cloneDeep(formData.value)
  props.needStore && storeSession('store', props.storeKey, outFormData)
  emit('search', outFormData)
  emit('update:modelValue', outFormData)
}

const proxyMethods = useProxyInstanceMethods<UeFormInstance>(form, [
  'validate',
  'validateField',
  'scrollToField',
  'resetFields',
  'clearValidate'
])

const { ignoreWatch } = useIgnoreWatch(
  () => props.modelValue,
  () => {
    if (props.buttonTrigger) {
      formData.value = { ...props.modelValue }
    }
  }
)
defineExpose({ ...proxyMethods })
</script>
<script lang="ts">
export default { name: 'UeSearchForm' }
</script>
<template>
  <ue-form
    ref="form"
    :class="['ue-search-form', { 'single-line': formProps.singleLine }]"
    v-bind="formProps"
    :model="formData"
    :rules="formRules"
  >
    <ue-form-fields
      v-if="items && items.length"
      v-model="handleValue"
      class="base-form-fields"
      :items="items"
    >
      <slot name="button" :on-search="onSearch">
        <div v-if="buttonTrigger" class="search-form-btns">
          <ue-button v-bind="btnItemOpts.searchBtnProps" :loading="searching" @click="onSearch">
            {{ btnItemOpts.btnText }}
          </ue-button>
          <ue-button v-if="showReset" v-bind="btnItemOpts.resetBtnProps" @click="onReset">
            {{ btnItemOpts.resetText }}
          </ue-button>
          <slot name="extraBtns"></slot>
        </div>
      </slot>
    </ue-form-fields>
    <slot></slot>
  </ue-form>
</template>

<style lang="scss">
.ue-search-form {
  .base-form-fields {
    display: flex;
  }
  .ue-form-fields {
    flex-wrap: wrap;
    .form-field {
      width: 100%;
    }
    .ue-form-field-item {
      margin: 0 20px 12px 0;
      & > .ant-form-item-control,
      & > .ant-form-item-control-wrapper > .ant-form-item-control {
        line-height: 32px;
        min-width: 80px;
      }
    }
  }
  &.single-line {
    .ue-form-fields {
      flex-wrap: nowrap;
      .ue-form-field-item {
        margin-bottom: 0;
        & > .ant-col {
          line-height: 32px;
        }
      }
    }
  }
  .search-form-btns {
    white-space: nowrap;
    margin-left: auto;
    .ant-btn {
      margin-left: 16px;
    }
  }
}
</style>
