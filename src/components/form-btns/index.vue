<script setup lang="ts">
import { computed } from 'vue'
import { vueTypeProp } from '@/utils/component'
import { UeMessageBox, UeButtonProps } from '@/ui-comps'
import type { BtnType, FormBtnsProps } from './types'
import { awaitWrapper } from '@wxhccc/es-util'

type FBProps = FormBtnsProps

const props = defineProps({
  sending: Boolean,
  form: vueTypeProp<FBProps['form']>(Object),
  submit: vueTypeProp<FBProps['submit']>(Function),
  cancel: vueTypeProp<FBProps['cancel']>(Function),
  isCancel: vueTypeProp<boolean>(Boolean, true),
  submitOnly: Boolean,
  btnKeys: vueTypeProp<FBProps['btnKeys']>(Array),
  isValidate: Boolean,
  submitConfirm: Boolean,
  btnProps: vueTypeProp<FBProps['btnProps']>([Object, Function], () => ({} as UeButtonProps)),
  texts: vueTypeProp<FBProps['texts']>(Object, () => ({})),
  size: vueTypeProp<FBProps['size']>(String)
})
const emit = defineEmits<{
  (e: 'validate-error', error: any): void
}>()
const allBtnKeys: BtnType[] = ['cancel', 'submit', 'reset']

const selfBtnKeys = computed(() => {
  const { isCancel, submitOnly } = props
  return allBtnKeys.filter((key) =>
    submitOnly ? key === 'submit' : key !== (isCancel ? 'reset' : 'cancel')
  )
})
const propBtnKeys = computed(() => {
  const { btnKeys } = props
  return Array.isArray(btnKeys) && btnKeys.filter((key) => allBtnKeys.includes(key))
})
const handleBtnKeys = computed(() => {
  return Array.isArray(propBtnKeys.value) ? propBtnKeys.value : selfBtnKeys.value
})
const handleWords = computed(() => {
  return {
    sureBtn: '提交',
    cancelBtn: '取消',
    resetBtn: '重置',
    sending: '提交中...',
    confirmWord: '确认提交?',
    ...props.texts
  }
})

/**** methods ****/
/** utils **/
const callMethod = (fnName: 'submit' | 'cancel') => {
  const fn = props[fnName]
  fn instanceof Function && fn()
}
const handleBtnProps = (key: BtnType) => {
  const { btnProps, size } = props
  return { size, ...(btnProps instanceof Function ? btnProps(key) : btnProps) }
}
/** business **/
/** events **/
const submitHandle = async () => {
  const { isValidate, submitConfirm, form } = props
  if (!isValidate && !submitConfirm) {
    callMethod('submit')
    return
  }
  form
    ?.validate()
    .then(() => {
      if (!submitConfirm) {
        return callMethod('submit')
      }
      UeMessageBox.confirm(handleWords.value.confirmWord, '系统提示')
        .then(() => callMethod('submit'))
        .catch((e) => undefined)
    })
    .catch((e) => {
      emit('validate-error', e)
    })
}
const resetForm = () => {
  props?.form?.resetFields()
}
</script>
<script lang="ts">
export default { name: 'FormBtns' }
</script>

<template>
  <div class="me-form-btns">
    <template v-for="item in handleBtnKeys">
      <a-button
        v-if="item === 'submit'"
        :key="item"
        class="me-button"
        type="primary"
        :loading="sending"
        v-bind="handleBtnProps(item)"
        @click="submitHandle"
        >{{ sending ? handleWords.sending : handleWords.sureBtn }}</a-button
      >
      <a-button
        v-if="item === 'cancel'"
        :key="item"
        class="me-button"
        :disabled="sending"
        v-bind="handleBtnProps(item)"
        @click="callMethod('cancel')"
        >{{ handleWords.cancelBtn }}</a-button
      >
      <a-button
        v-if="item === 'reset'"
        :key="item"
        class="me-button"
        :disabled="sending"
        v-bind="handleBtnProps(item)"
        @click="resetForm"
      >
        {{ handleWords.resetBtn }}
      </a-button>
    </template>
  </div>
</template>

<style lang="scss">
.ue-form-btns {
  padding: 10px 0;
  .-button {
    min-width: 80px;
    margin-right: 20px;
  }
}
</style>
