<template>
  <div class="ue-form-btns">
    <template v-for="item in handleBtnKeys">
      <ue-button v-if="item === 'submit'" class="ue-button" type="primary" @click="submitHandle" v-bind="handleBtnProps(btnProps, item)" :loading="sending" :key="item">{{sending ? handleWords.sending : handleWords.sureBtn}}</ue-button>
      <ue-button v-if="item === 'cancel'" class="ue-button" v-bind="handleBtnProps(btnProps, item)" @click="callMethod('cancel')" :key="item">{{handleWords.cancelBtn}}</ue-button>
      <ue-button v-if="item === 'reset'" class="ue-button" v-bind="handleBtnProps(btnProps, item)" @click="resetForm" :key="item">{{handleWords.resetBtn}}</ue-button>
    </template>
  </div>
</template>
<script>
import { Button } from 'UE/ui-comps';

const allBtnKeys = ['submit', 'cancel', 'reset'];

export default {
  name: 'UeFormBtns',
  components: {
    'UeButton': Button
  },
  props: {
    sending: Boolean,
    parentRefs: Object,
    refKey: {
      type: String,
      default: 'form'
    },
    submit: Function,
    cancel: Function,
    isCancel: Boolean,
    submitOnly: Boolean,
    btnKeys: Array,
    isValidate: Boolean,
    submitConfirm: Boolean,
    btnProps: {
      type: [Object, Function],
      default: () => ({})
    },
    texts: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    selfBtnKeys () {
      const { isCancel, submitOnly } = this;
      return allBtnKeys.filter(key => submitOnly
        ? (key === 'submit')
        : (key !== (isCancel ? 'reset' : 'cancel'))
      )
    },
    propBtnKeys () {
      const { btnKeys } = this;
      return btnKeys && Array.isArray(btnKeys) && btnKeys.filter(key => allBtnKeys.includes(key));
    },
    handleBtnKeys () {
      const { selfBtnKeys, propBtnKeys } = this;
      return Array.isArray(propBtnKeys) ? propBtnKeys : selfBtnKeys;
    },
    handleWords () {
      return Object.assign({ sureBtn: '提交', cancelBtn: '取消', resetBtn: '重置', sending: '提交中...', confirmWord: '确认提交?' }, this.texts);
    }
  },
  methods: {
    /** utils **/
    form () {
      const { parentRefs, refKey } = this;
      return parentRefs && refKey ? parentRefs[refKey] : null;
    },
    callMethod (fnName) {
      const fn = this[fnName];
      typeof fn === 'function' && fn(this.refKey);
    },
    handleBtnProps (props, key) {
      return typeof props === 'function' ? props(key) : props;
    },
    /** business **/
    /** events **/
    submitHandle () {
      const { isValidate, submitConfirm, handleWords } = this;
      if (isValidate || submitConfirm) {
        const form = this.form();
        form && form.validate && form.validate((res, object) => {
          res
            ? (submitConfirm
                ? this.$confirm(handleWords.confirmWord, '系统提示', {
                    type: 'warning',
                    callback: (action, instance) => {
                      action === 'confirm' && this.callMethod('submit')
                    }
                  })
                : this.callMethod('submit')
              )
            : this.$emit('validate-error', object);
        });
      } else {
        this.callMethod('submit');
      }
    },
    resetForm () {
      const form = this.form();
      form && form.resetFields && form.resetFields();
    }
  }
}
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
