<template>
  <ue-form ref="form" class="ue-search-form" :model="formData" v-bind="formProp" v-on="$listeners" @submit.native.prevent>
    <div v-if="items && items.length" class="base-form-panel">
      <ue-form-fields
        :items="items"
        v-model="formData"
      >
        <slot name="button" :onSearch="onSearch">
          <ue-form-item v-if="buttonTrigger" class="ue-form-field-item" v-bind="btnItemOpts.formItemProps">
            <ue-button v-bind="btnItemOpts.buttonProps" @click="onSearch" :loading="searching" >{{btnItemOpts.btnText}}
            </ue-button>
          </ue-form-item>
        </slot>
      </ue-form-fields>
    </div>
    <slot></slot>
  </ue-form>
</template>

<script>
import FormFields from 'Comps/form-fields';
import { Form, FormItem, Button } from 'UE/ui-comps';
import { FormMethods } from 'UE/ui-comps/form';
import refFnProxyMixin from 'UE/mixins/ref-fn-proxy';
import { cloneDeep, pick } from 'UE/utils/lodash';
import storageMixin from 'UE/mixins/component-storage';

export const formDefProps = {
  inline: true,
  labelPosition: 'left'
};

export default {
  name: 'UeSearchForm',
  mixins: [
    storageMixin(),
    refFnProxyMixin('form', FormMethods)
  ],
  components: {
    'UeForm': Form,
    'UeFormItem': FormItem,
    'UeButton': Button,
    [FormFields.name]: FormFields
  },
  props: {
    ...Form.props,
    inline: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      required: true
    },
    data: Object,
    searching: Boolean,
    restore: Boolean,
    storeKey: {
      type: String,
      default: 'data'
    },
    buttonTrigger: {
      type: Boolean,
      default: true
    },
    buttonItemOptions: Object,
    needStore: Boolean
  },
  data () {
    return {
      $_formData_watch: this.handleWatchMethod(this.buttonTrigger),
      formData: this.getInitFormData()
    }
  },
  created () {
    this.formData
  },
  computed: {
    formProp () {
      return Object.assign({}, pick(this.$props, Object.keys(Form.props)))
    },
    btnItemOpts () {
      return Object.assign({
        formItemProps: {},
        buttonProps: { plain: true, type: 'primary' },
        btnText: '查询'
      }, this.buttonItemOptions)
    }
  },
  watch: {
    '$route.name' () {
      this.formData = this.getInitFormData();
    },
    'buttonTrigger': 'handleWatchMethod',
    'data': {
      handler (value) {
        this.formData = value;
      },
      deep: true
    }
  },
  methods: {
    /** utils **/
    buttonOptions (item) {
      return Object.assign({}, item)
    },
    handleWatchMethod (newValue) {
      if(!newValue) {
        return this.$watch('formData', this.onSearch, { deep: true });
      }
      this.$_formData_watch && this.$_formData_watch()
    },
    /** bussiness **/
    // 获取初始表单数据
    getInitFormData () {
      const { storeKey, restore, initData } = this;
      const data = this.$_mixin_storeSession('store', storeKey);
      if (restore && data) {
        this.$emit('update:data', data);
        return data;
      }
      return initData || {};
    },
    // 输出数据过滤，去掉diabled的数据项
    outFormDataFilter () {
      let result = {}
      this.items.forEach(item => {
        const isHide = typeof item.hide === 'function' ? item.hide() : item.hide;
        if (item.prop) {
          !item.isHide && this.formData[item.prop] !== undefined && (result[item.prop] = this.formData[item.prop]);
        } else if (Array.isArray(item.children)) {
          item.children.forEach(field => {
            field.prop && !isHide && this.formData[field.prop] !== undefined && (result[field.prop] = this.formData[field.prop]);
          });
        }
      })
      return result
    },
    /** events **/
    // 发送搜索表单数据
    onSearch () {
      const outFormData = this.outFormDataFilter();
      this.needStore && this.$_mixin_storeSession('store', this.storeKey, outFormData);
      this.$emit('search', outFormData);
      this.$emit('update:data', outFormData)
    }
  }
}
</script>
<style lang="scss">
.ue-search-form {
  .base-form-panel {
    padding: 16px 0;
  }
  /deep/ .ue-form-fields {
    .ue-form-field {
      width: 100%;
    }
    .ue-form-field-item {
      margin: 9px 40px 9px 0;
      label {
        font-weight: normal;
      }
      & > .el-form-item__content {
        width: 220px;
      }
    }
  }
}
</style>
