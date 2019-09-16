<template>
  <ue-row class="ue-info-table" type="flex">
    <ue-col
      v-for="(item, index) in handleCells"
      class="ue-info-table-td"
      v-bind="handleCellProp(item.props, item)"
      :key="item.key || item.prop || index"
    >
      <span class="label-td" v-if="item.label || item.labelComponent">
        <component
          v-if="item.labelComponent"
          :is="item.labelComponent"
          v-bind="{ cell: item, data: handleData }"
        >
        </component>
        <template v-else>
          <i :class="item.icon" v-if="item.icon"></i>{{item.label}}
        </template>
      </span>
      <ue-form-field-item
        v-if="isEdit && item.canEdit && item.fieldProps"
        class="ue-info-table-field-item"
        v-bind="getItemFieldProps(item)"
        v-model="handleValue[item.prop]"
      >
      </ue-form-field-item>
      <span v-else class="value-td">
        <component
          v-if="item.valueComponent"
          :is="item.valueComponent"
          v-bind="{ cell: item, data: handleData }"
        >
        </component>
        <template v-else>
          {{getItemValue(item)}}
        </template>
      </span>
    </ue-col>
  </ue-row>
</template>
<script>
import { Row, Col } from 'UE/ui-comps';
import FormFieldItem from 'Comps/form-field-item';

export default {
  name: 'UeInfoTable',
  components: {
    'UeRow': Row,
    'UeCol': Col,
    [FormFieldItem.name]: FormFieldItem
  },
  props: {
    isEdit: Boolean,
    data: Object,
    formDataHandler: Function,
    value: Object,
    cells: Array,
    extraData: Object,
    setEmptyCell: {
      type: [Boolean, Function],
      default: true
    }
  },
  data () {
    return {
      formData: {}
    }
  },
  computed: {
    handleValue () {
      return this.value || this.formData;
    },
    handleData () {
      return Object.assign({}, this.extraData, this.data);
    },
    handleCells () {
      return Array.isArray(this.cells) ? this.cells.filter(item => item && !(this.handleCellProp(item.hide, item))) : [];
    }
  },
  watch: {
    handleValue: {
      handler () {
        this.$emit('change', this.formData);
        this.$emit('input', this.formData);
      },
      deep: true
    }
  },
  methods: {
    /** utils **/
    handleCellProp (propValue, item) {
      return typeof propValue === 'function' ? propValue.call(this, this.data, item, this.extraData) : propValue;
    },
    /** business **/
    getItemFieldProps (item) {
      return Object.assign({}, { prop: item.prop }, item.fieldProps);
    },
    getItemValue (item) {
      const { handleData, setEmptyCell, data } = this;
      const value = item.value || (typeof item.formatter === 'function' ? item.formatter(handleData[item.prop], handleData) : handleData[item.prop]);
      if (!value && value !== 0 && setEmptyCell) {
        return typeof setEmptyCell === 'function' ? setEmptyCell(data, handleData) : '--';
      }
      return value;
    }
    /** events **/
  }
}
</script>
<style lang="scss">
$--color-primary: #409eff!default;
.ue-info-table {
  padding-left: 1px;
  flex-wrap: wrap;
  align-items: stretch;
  .label-td, .value-td {
    display: inline-block;
    font-size: 14px;
    padding: 12px 10px;
    overflow: hidden;
  }
  .value-td {
    color: #4A4A4A;
    flex: 1;
  }
  .label-td {
    color: #4A4A4A;
    font-weight: 700;
    background: transparentize($--color-primary, .9);
    border-right: 1px solid #ebeef5;
    padding-left: 20px;
    padding-right: 20px;
    flex-shrink: 0;
    position: relative;
    i {
      position: absolute;
      display: block;
      left: 5px;
      top: 50%;
      width: 10px;
      height: 10px;
      margin-top: -5px;
    }
  }
  .el-col {
    padding: 0px;
    border: 1px solid #ebeef5;
    display: flex;
  }
  .ue-info-table-field-item {
    width: 100%;
    margin: 0;
    /deep/ .el-form-item__content {
      width: 100%;
      height: 100%;
      .ue-form-field, .ue-form-field input {
        height: 100%;
      }
      .el-form-item__error {
        z-index: 1;
      }
    }
  }
}
</style>