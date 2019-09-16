<template>
  <ue-table
    class="ue-data-table"
    ref="table"
    v-bind="tableProps"
    v-on="$listeners"
    @selection-change="handleCheckboxChange"
  >
    <ue-deep-column
      v-for="(column, index) of handleColumns"
      :column="column"
      :data="{ selectionValue: $_selectionValue }"
      :empty-cell="emptyCellHandler"
      :key="column.key || column.prop || index"
    >
    </ue-deep-column>
  </ue-table>
</template>

<script>
import { Table } from 'UE/ui-comps';
import { TableMethods } from 'UE/ui-comps/table';
import refFnProxyMixin from 'UE/mixins/ref-fn-proxy';
import UeDeepColumn from './deep-column';
import { get, pick } from 'UE/utils/lodash'

const defEmptyCell = (value) => ((value || value === 0) ? value : '--')

const tbPropsDefault = {
  border: true,
  stripe: true
};

export default {
  name: 'UeDataTable',
  components: {
    'UeTable': Table,
    UeDeepColumn
  },
  mixins: [refFnProxyMixin('table', TableMethods)],
  props: {
    ...Table.props,
    columns: {
      type: Array,
      required: true
    },
    selectionKey: [String, Function],
    selectionValue: [Array, String, Number],
    setEmptyCell: [Function, Boolean]
  },
  provide () {
    return {
      getScopeRowKey: this.getScopeRowKey,
      getSelectItemValue: this.getSelectItemValue,
      handleRadioChange: this.handleRadioChange
    }
  },
  data () {
    return {
      selfSelectionValue: []
    }
  },
  computed: {
    $_selectionValue: {
      get () { return this.selectionValue || this.selfSelectionValue; },
      set (value) {
        this.selfSelectionValue = value;
        this.$emit('update:selectionValue', value);
      }
    },
    emptyCellHandler () {
      const { setEmptyCell } = this;
      return typeof setEmptyCell === 'function' ? setEmptyCell : (setEmptyCell && defEmptyCell);
    },
    handleColumns () {
      return this.columns.filter(item => (typeof item.hide === 'function' ? item.hide() : !item.hide))
    },
    selectionWatcher () {
      return {
        value: this.selectionValue,
        data: this.data
      };
    },
    tableProps () {
      return { ...tbPropsDefault, ...pick(this.$props, Object.keys(Table.props)) };
    },
    handledSelectionKey () {
      return this.selectionKey || this.rowKey;
    }
  },
  watch: {
    selectionWatcher: {
      handler: 'handleSelectionValueChange',
      deep: true
    }
  },
  $_ue_methods: TableMethods,
  methods: {
    getScopeRowKey (row) {
      return get(row, this.rowKey);
    },
    getSelectItemValue (row) {
      const selectionKey = this.handledSelectionKey;
      if (typeof selectionKey === 'string') {
        return row[selectionKey];
      } else if (typeof selectionKey === 'function') {
        return selectionKey(row);
      }
      return row;
    },
    handleSelectionValueChange () {
      if (!Array.isArray(this.selectionValue)) return;
      const { selectionValue, data, $refs: { table } } = this;
      table && data.forEach(row => {
        const value = this.getSelectItemValue(row);
        table.toggleRowSelection(row, selectionValue.indexOf(value) >= 0);
      });
    },
    /** events **/ 
    handleCheckboxChange (values) {
      if (!Array.isArray(this.selectionValue)) return;
      const { handledSelectionKey: selectionKey } = this;
      const keys = selectionKey ? values.map(this.getSelectItemValue) : values
      this.$_selectionValue = keys;
    },
    handleRadioChange (value) {
      this.$_selectionValue = value
    }
  }
}
</script>
<style lang="scss">
.ue-data-table {
  /deep/ .action-btn {
    margin: 4px 4px;
  }
}
</style>
