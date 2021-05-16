<template>
  <div class="ue-form-btns">
    <template v-for="item in handleBtnKeys">
      <ue-button
        v-if="item === 'submit'"
        :key="item"
        class="ue-button"
        type="primary"
        :loading="sending"
        v-bind="handleBtnProps(item)"
        @click="submitHandle"
        >{{ sending ? handleWords.sending : handleWords.sureBtn }}</ue-button
      >
      <ue-button
        v-if="item === 'cancel'"
        :key="item"
        class="ue-button"
        v-bind="handleBtnProps(item)"
        @click="callMethod('cancel')"
        >{{ handleWords.cancelBtn }}</ue-button
      >
      <ue-button
        v-if="item === 'reset'"
        :key="item"
        class="ue-button"
        v-bind="handleBtnProps(item)"
        @click="resetForm"
        >{{ handleWords.resetBtn }}</ue-button
      >
    </template>
  </div>
</template>
<script lang="ts">
import { ComponentPublicInstance, defineComponent, PropType } from 'vue'
import Button, { ButtonProps } from '../ui-comps/button'
import confirm from '../ui-comps/confirm'
import { AnyFunction } from '../utils/types'
import { defaultProp } from '../utils/component'

export type BtnType = 'submit' | 'cancel' | 'reset'
const allBtnKeys: BtnType[] = ['submit', 'cancel', 'reset']
export type BtnsProps = ButtonProps | ((btnType: BtnType) => ButtonProps)
export interface FormInstance extends ComponentPublicInstance {
  validate: () => Promise<unknown>
  resetFields: AnyFunction<void>
}

export default defineComponent({
  name: 'UeFormBtns',
  components: {
    UeButton: Button
  },
  props: {
    sending: Boolean,
    form: defaultProp<FormInstance>(Object),
    submit: defaultProp<AnyFunction<void>>(Function),
    cancel: defaultProp<AnyFunction<void>>(Function),
    isCancel: Boolean,
    submitOnly: Boolean,
    btnKeys: defaultProp<BtnType[]>(Array),
    isValidate: Boolean,
    submitConfirm: Boolean,
    btnProps: defaultProp<BtnsProps>([Object, Function], () => ({})),
    texts: defaultProp<Record<string, string>>(Object, () => ({}))
  },
  emits: ['validate-error'],
  computed: {
    selfBtnKeys(): BtnType[] {
      const { isCancel, submitOnly } = this
      return allBtnKeys.filter(key =>
        submitOnly ? key === 'submit' : key !== (isCancel ? 'reset' : 'cancel')
      )
    },
    propBtnKeys(): false | BtnType[] {
      const { btnKeys } = this
      return Array.isArray(btnKeys) && btnKeys.filter(key => allBtnKeys.includes(key))
    },
    handleBtnKeys() {
      const { selfBtnKeys, propBtnKeys } = this
      return Array.isArray(propBtnKeys) ? propBtnKeys : selfBtnKeys
    },
    handleWords(): Record<string, string> {
      return {
        sureBtn: '提交',
        cancelBtn: '取消',
        resetBtn: '重置',
        sending: '提交中...',
        confirmWord: '确认提交?',
        ...this.texts
      }
    }
  },
  methods: {
    /** utils **/
    callMethod(fnName: 'submit' | 'cancel') {
      const fn = this[fnName]
      fn instanceof Function && fn()
    },
    handleBtnProps(key: BtnType) {
      const { btnProps } = this.$props
      return btnProps instanceof Function ? btnProps(key) : btnProps
    },
    /** business **/
    /** events **/
    submitHandle() {
      const { isValidate, submitConfirm, handleWords, form } = this
      if (isValidate || submitConfirm) {
        form &&
          form.validate &&
          form
            .validate()
            .then(() => {
              if (!submitConfirm) return this.callMethod('submit')

              confirm({
                content: handleWords.confirmWord,
                title: '系统提示'
              })
                .then(() => this.callMethod('submit'))
                .catch(() => undefined)
            })
            .catch(e => {
              this.$emit('validate-error', e)
            })
      } else {
        this.callMethod('submit')
      }
    },
    resetForm() {
      const { form } = this
      form && form.resetFields && form.resetFields()
    }
  }
})
</script>
<style lang="scss">
.ue-form-btns {
  padding: 10px 0;
  .ue-button {
    min-width: 120px;
    margin-right: 30px;
  }
}
</style>
