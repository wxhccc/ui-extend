<template>
  <div class="ue-paged-list">
    <ue-loading v-if="loading" v-bind="handledLoading"></ue-loading>
    <slot :rows="dataList"></slot>
    <div class="pagination-container">
      <ue-pagination
        v-if="isPaginationShow"
        v-on="paginationEvents"
        v-bind="handlePagination"
        :page-size="pageSize"
        :current-page.sync="curPage"
        :total="dataTotal"
        @size-change="handleSizeChange"
      >
        <template #default>
          <slot name="pagination-layout"></slot>
        </template>
      </ue-pagination>
    </div>
  </div>
</template>

<script>
import { Loading, Pagination } from 'UE/ui-comps';
import storageMixin from 'UE/mixins/component-storage';

const propsDefault = {
  background: true
};

export default {
  name: 'UePagedList',
  components: {
    'UeLoading': Loading,
    'UePagination': Pagination
  },
  mixins: [storageMixin()],
  props: {
    paginationProps: Object,
    paginationEvents: Object,
    loading: {
      type: Boolean,
      default: false
    },
    loadingProps: {
      type: [String, Object],
      default: '给我一点时间'
    },
    pagedData: Object,
    propKeys: Object,
    extraForm: Object,
    getPagedData: {
      type: Function,
      default: () => () => {}
    },
    refresh: Boolean,
    storeKey: {
      type: String,
      default: 'data'
    },
    initData: Object,
    fetchAccessKey: [Number, String],
    createdAutoSend: Boolean,
    restore: Boolean,
    needStore: Boolean
  },
  data () {
    const { storeKey, restore, initData } = this;
    return Object.assign(
      { pageSize: 20, curPage: 1 },
      initData,
      {
        $_isRestoring: restore,
        $_oldExtraForm: {}
      },
      restore && this.$_mixin_storeSession('pagination', storeKey)
    );
  },
  created () {
    this.createdAutoSend && this.getInitPageData();
  },
  computed: {
    handledPropKey () {
      return Object.assign({ total: 'total', rows: 'rows', pageSize: 'size', curPage: 'page' }, this.propKeys);
    },
    orderRules () {
      this.curPage = 1;
      return this.orderRules;
    },
    handlePagination () {
      return Object.assign({}, propsDefault, this.paginationProps);
    },
    handledLoading () {
      const { loadingProps } = this;
      return typeof loadingProps === 'string' ? { text: loadingProps } : loadingProps
    },
    dataList () {
      const { rows } = this.handledPropKey;
      return this.pagedData && Array.isArray(this.pagedData[rows]) ? this.pagedData[rows] : [];
    },
    dataTotal () {
      const { total } = this.handledPropKey
      return (this.pagedData && this.pagedData[total]) ? Number(this.pagedData[total]) : 0;
    },
    params () {
      const { pageSize, curPage } = this.handledPropKey;
      return Object.assign({}, this.extraForm, { [pageSize]: this.pageSize, [curPage]: this.curPage });
    },
    isPaginationShow () {
      const { restore, curPage, dataTotal } = this;
      return (curPage === 1) || !restore || (restore && dataTotal);
    }
  },
  watch: {
    'extraForm': {
      handler: 'handleExtraForm',
      deep: true
    },
    'params': 'sendFetchParam',
    'refresh': 'refreshList'
  },
  $_ue_methods: ['getStoreData', 'sendRequest', 'clearStoreData'],
  methods: {
    /** utils **/
    getInitPageData () {
      const { restore, $_mixin_storeSession, storeKey } = this;
      if (restore && $_mixin_storeSession('params', storeKey)) {
        Promise.resolve(this.getPagedData($_mixin_storeSession('params', storeKey))).finally(() => {
          this.$_isRestoring = false;
        });
      } else {
        this.sendFetchParam();
      }
    },
    /** bussiness **/
    handleExtraForm (newVal, oldVal) {
      const { $_oldExtraForm } = this;
      if (newVal !== oldVal || JSON.stringify(newVal) !== $_oldExtraForm) {
        this.$_oldExtraForm = JSON.stringify(newVal);
        this.curPage = 1;
        this.$emit('extra-form-change', newVal, this.$_oldExtraForm)
      }
    },
    sendFetchParam () {
      if (this.$_isRestoring) return;
      this.needStore && this.storeData();
      const fetchAccessKey = this.fetchAccessKey || +new Date();
      this.getPagedData(this.params, fetchAccessKey);
    },
    refreshList (newVal) {
      if (newVal) {
        this.sendFetchParam()
        this.$emit('update:refresh', false)
      }
    },
    storeData () {
      const { curPage, pageSize } = this;
      this.$_mixin_storeSession('pagination', this.storeKey, { curPage, pageSize });
      this.$_mixin_storeSession('params', this.storeKey, this.params);
    },
    /** public methods **/
    getStoreData () {
      return {
        pagination: this.$_mixin_storeSession('pagination', this.storeKey),
        params: this.$_mixin_storeSession('params', this.storeKey)
      }
    },
    sendRequest () {
      this.sendFetchParam()
    },
    clearStoreData (module = ['params', 'pagination']) {
      const modules = Array.isArray(module) ? module : [module];
      modules.forEach(item => {
        this.$_mixin_storeSession(item, this.storeKey, null, true);
      });
    },
    /** events **/
    handleSizeChange (val) {
      this.pageSize = val;
    }

  }
}

</script>
<style lang="scss">
.ue-paged-list {
  .pagination-container {
    margin-top: 4px;
    padding: 18px 0;
    text-align: center;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
