<script setup lang="ts">
import { computed } from 'vue'
import { isFunction } from 'lodash-es'
import { vueTypeProp } from '@wxhccc/ue-shared'
import { UeButton } from '@/ui-comps'
import { useUeConfirm } from '@/utils/hooks'
import { BtnType, FormBtnsProps } from './types'

const props = defineProps({
  sending: Boolean,
  form: vueTypeProp<FormBtnsProps['form']>(Object),
  submit: vueTypeProp<FormBtnsProps['submit']>(Function),
  cancel: vueTypeProp<FormBtnsProps['cancel']>(Function),
  isCancel: vueTypeProp<boolean>(Boolean, true),
  submitOnly: Boolean,
  btnKeys: vueTypeProp<FormBtnsProps['btnKeys']>(Array),
  isValidate: Boolean,
  submitConfirm: Boolean,
  confirmOptions: vueTypeProp<FormBtnsProps['confirmOptions']>(Object),
  btnProps: vueTypeProp<FormBtnsProps['btnProps']>([Object, Function], () => ({})),
  texts: vueTypeProp<FormBtnsProps['texts']>(Object, () => ({})),
  size: vueTypeProp<FormBtnsProps['size']>(String)
})

const emit = defineEmits<{
  (e: 'validate-error', error: any): void
}>()

const confirm = useUeConfirm()

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

const callMethod = (fnName: 'submit' | 'cancel') => {
  const fn = props[fnName]
  isFunction(fn) && fn()
}
const handleBtnProps = (key: BtnType) => {
  const { btnProps, size } = props
  return { size, ...(btnProps instanceof Function ? btnProps(key) : btnProps) }
}

const submitHandle = async () => {
  const { isValidate, submitConfirm, form, confirmOptions } = props
  if (!isValidate && !submitConfirm) {
    callMethod('submit')
    return
  }
  form?.validate()
    .then(() => {
      if (!submitConfirm) {
        return callMethod('submit')
      }
      confirm('系统提示', handleWords.value.confirmWord, () => callMethod('submit'), confirmOptions)
    })
    .catch((e: Error) => {
      emit('validate-error', e)
    })
}
const resetForm = () => {
  props.form?.resetFields()
}
</script>
<script lang="ts">
export default { name: 'UeFormBtns' }
</script>

<template>
  <div class="ue-form-btns">
    <template v-for="item in handleBtnKeys">
      <ue-button
        v-if="item === 'submit'"
        v-bind="handleBtnProps(item)"
        :key="item"
        class="ue-button"
        type="primary"
        :loading="sending"
        @click="submitHandle"
      >
        {{ sending ? handleWords.sending : handleWords.sureBtn }}
      </ue-button>
      <ue-button
        v-if="item === 'cancel'"
        v-bind="handleBtnProps(item)"
        :key="item"
        class="ue-button"
        :disabled="sending"
        @click="callMethod('cancel')"
      >
        {{ handleWords.cancelBtn }}
      </ue-button>
      <ue-button
        v-if="item === 'reset'"
        v-bind="handleBtnProps(item)"
        :key="item"
        class="ue-button"
        :disabled="sending"
        @click="resetForm"
      >
        {{ handleWords.resetBtn }}
      </ue-button>
    </template>
  </div>
</template>

<style lang="scss">
.ue-form-btns {
  padding: 10px 0;
  .ue-button {
    min-width: 80px;
    margin-right: 20px;
  }
}
</style>
