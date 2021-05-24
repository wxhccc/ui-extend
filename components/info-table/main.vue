<template>
  <ue-row class="ue-info-table" type="flex">
    <ue-col v-for="(item, index) in handleCells" v-bind="handleCellProp(item.props, item)" :key="item.key || item.prop || index" class="ue-info-table-td">
      <span v-if="item.label" class="label-td">
        <slot name="label" v-bind="{ cell: item, data: handleData }"><component :is="item.icon" v-if="item.icon" />{{ item.label }} </slot>
      </span>
      <ue-form-field-item
        v-if="isEdit && item.canEdit && item.fieldProps"
        class="ue-info-table-field-item"
        v-bind="getItemFieldProps(item)"
        :model-value="handleValue[item.name]"
        @update:modelValue="val => setValue(item.name, val)"
      >
      </ue-form-field-item>
      <span v-else class="value-td">
        <slot name="value" v-bind="{ value: handleData[item.name], cell: item, data: handleData }">
          {{ getItemValue(item) }}
        </slot>
      </span>
    </ue-col>
  </ue-row>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Row, Col } from '../ui-comps/row-col'
import FormFieldItem from '../form-field-item'
import { Cell, InfoTableProps } from './types'
import { vueTypeProp } from '../utils/component'
import { FunctionalType, StrOrNum } from '../utils/types'

export default defineComponent({
  name: 'UeInfoTable',
  components: {
    UeRow: Row,
    UeCol: Col,
    [FormFieldItem.name]: FormFieldItem
  },
  props: {
    isEdit: Boolean,
    data: vueTypeProp<InfoTableProps['data']>(Object),
    formDataHandler: vueTypeProp<InfoTableProps['formDataHandler']>(Function),
    modelValue: vueTypeProp<InfoTableProps['modelValue']>(Object),
    cells: vueTypeProp<InfoTableProps['cells']>(Array),
    extraData: vueTypeProp<InfoTableProps['extraData']>(Object),
    setEmptyCell: vueTypeProp<InfoTableProps['setEmptyCell']>([Boolean, Function], true)
  },
  emits: ['change', 'update:modelValue'],
  setup(props) {
    const formData = ref<InfoTableProps['modelValue']>({})
    const handleValue = computed(() => (props.modelValue !== undefined ? props.modelValue || {} : formData.value))
    const handleData = computed(() => ({ ...props.extraData, ...props.data }))
    return { formData, handleValue, handleData }
  },
  computed: {
    handleCells(): Cell[] {
      return Array.isArray(this.cells) ? this.cells.filter(item => item && !this.handleCellProp(item.hide, item)) : []
    }
  },
  methods: {
    setValue(name: StrOrNum, val: any) {
      if (!name) return
      this.formData[name] = val
      if (this.modelValue !== undefined) {
        const newValue = { ...this.modelValue, [name]: val }
        this.$emit('update:modelValue', newValue)
      }
    },
    handleCellProp<T>(propValue: FunctionalType<T>, item: Cell) {
      return propValue instanceof Function ? propValue.call(this, this.data, item, this.extraData) : propValue
    },
    getItemFieldProps(item: Cell) {
      return { name: item.name, ...item.fieldProps }
    },
    getItemValue(item: Cell) {
      const { handleData, setEmptyCell } = this
      const value = item.value || (item.formatter instanceof Function ? item.formatter(handleData[item.name], handleData) : handleData[item.name])
      if (!value && value !== 0 && setEmptyCell) {
        return setEmptyCell instanceof Function ? setEmptyCell(value, handleData) : '--'
      }
      return value
    }
  }
})
</script>
<style lang="scss">
$--color-primary: #409eff !default;
.ue-info-table {
  display: flex;
  padding-left: 1px;
  flex-wrap: wrap;
  align-items: stretch;
  .label-td,
  .value-td {
    display: inline-block;
    font-size: 14px;
    padding: 12px 10px;
    overflow: hidden;
  }
  .value-td {
    color: #4a4a4a;
    flex: 1;
  }
  .label-td {
    color: #4a4a4a;
    font-weight: 700;
    background: transparentize($--color-primary, 0.9);
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
    .el-form-item__content {
      width: 100%;
      height: 100%;
      .ue-form-field,
      .ue-form-field input {
        height: 100%;
      }
      .el-form-item__error {
        z-index: 1;
      }
    }
  }
}
</style>
