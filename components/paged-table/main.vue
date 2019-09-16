<template>
  <ue-paged-list
    ref="UePagedList"
    class="ue-paged-table"
    v-bind="pagedListProps"
    v-on="$listeners"
    :extraForm="handledExtraForm"
  >
    <template v-slot="{ rows }">
      <ue-data-table
        ref="UeDataTable"
        v-bind="tableProps"
        :data="rows"
        :columns="columns"
        v-on="tableEvents"
        @sort-change="handleSortChange"
      >
      </ue-data-table>
    </template>
  </ue-paged-list>
</template>

<script>
import PagedList from 'Comps/paged-list';
import DataTable from 'Comps/data-table';
import storageMixin from 'UE/mixins/component-storage';
import { getPublicMethodNames, getComponentFnProxy } from 'UE/utils/component';
import { pick } from 'UE/utils/lodash';

const ueMethods = getPublicMethodNames(PagedList, DataTable);

export default {
  name: 'UePagedTable',
  components: {
    [PagedList.name]: PagedList,
    [DataTable.name]: DataTable
  },
  mixins: [
    storageMixin(),
    getComponentFnProxy(PagedList),
    getComponentFnProxy(DataTable)
  ],
  props: {
    ...DataTable.props,
    ...PagedList.props,
    dataTableProps: Object,
    dataTableEvents: Object,
    initSort: Object,
    sortPropKeys: Object
  },
  data () {
    const { storeKey, restore, initSort } = this;
    return Object.assign(
      { ueSort: initSort || {} },
      restore && this.$_mixin_storeSession('listTable', storeKey)
    );
  },
  computed: {
    pagedListProps () {
      return pick(this.$props, Object.keys(PagedList.props));
    },
    sortKeys () {
      return Object.assign({ orderby: 'orderby', order: 'order' }, this.sortPropKeys);
    },
    tableProps () {
      return Object.assign({}, this.ueDefaultSort(), pick(this.$props, Object.keys(DataTable.props), this.dataTableProps))
    },
    tableEvents () {
      return { ...this.$listeners, ...this.dataTableEvents };
    },
    handledExtraForm () {
      const { sortKeys: { orderby, order }, ueSort } = this;
      const sortArgs = ueSort.orderby ? { [orderby]: ueSort.orderby, [order]: ueSort.order } : {};
      return Object.assign({}, sortArgs, this.extraForm);
    }
  },
  $_ue_methods: ueMethods,
  methods: {
    // utils
    ueDefaultSort () {
      return this.restore && this.ueSort.orderby ? { defaultSort: { prop: this.ueSort.orderby, order: this.ueSort.sort } } : {};
    },
    // bussiness
    /** events **/
    handleSortChange (values) {
      if (values.column && values.column.sortable === 'custom' && values.prop && values.order) {
        const sort = {
          orderby: values.prop,
          order: (values.order === 'descending' ? 'desc' : 'asc')
        };
        this.$_mixin_storeSession('listTable', this.storeKey, { sort });
        this.sort = sort;
      }
    }

  }
}

</script>
<style lang="scss">
.ue-paged-table {
  .pagination-container {
    margin-top: 4px;
    padding: 18px 0;
    text-align: center;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
