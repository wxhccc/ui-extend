import { Tabs, TabPane, Button } from 'UE/ui-comps';
import PagedTable from 'Comps/paged-table';
import SearchForm from 'Comps/search-form';
import storageMixin from 'UE/mixins/component-storage';
import { getPublicMethodNames, getComponentFnProxy } from 'UE/utils/component';
import { cloneDeep, omit, pick } from 'UE/utils/lodash';

const ueMethods = getPublicMethodNames(PagedTable);

export default {
  name: 'UeCommonListPage',
  mixins: [
    storageMixin(),
    getComponentFnProxy(PagedTable),
  ],
  components: {
    [SearchForm.name]: SearchForm,
    [PagedTable.name]: PagedTable,
    'UeTabs': Tabs,
    'UeTabPane': TabPane,
    'UeButton': Button
  },
  props: {
    ...PagedTable.props,
    rowKey: {
      type: [String, Function],
      default: 'id'
    },
    exportUrl: String,
    exportOptions: Object,
    tabsProps: Object,
    tabFormKey: String,
    searchForms: [Array, Object],
    searchParamsHandler: Function,
    currentSearchParams: Object,
    currentTab: String,
    operation: Object
  },
  data () {
    return {
      curTab: this.getStoreValue('tabKey') || this.getActiveTab(),
      searchParams: this.getStoreValue('searchParams') || {}
    }
  },
  computed: {
    hasTabs () {
      return Array.isArray(this.searchForms) && this.searchForms.length > 0;
    },
    exportOpts () {
      const { btnProps } = this.exportOptions || {};
      return Object.assign({ text: '数据导出' }, this.exportOptions, {
        btnProps: {
          type: 'text',
          icon: 'el-icon-download',
          ...btnProps
        }
      });
    },
    pagedTableProps () {
      return pick(this.$props, Object.keys(PagedTable.props));
    },
    storeProps () {
      return pick(this.$props, ['needStore', 'restore', 'storeKey']);
    },
    currentTabKey () {
      this.storeValue('tabKey', this.curTab);
      this.$emit('update:currentTab', this.curTab);
    },
    curSearchForm () {
      const { searchParams, curTab, hasTabs, tabFormKey } = this;
      const curSearchForm = hasTabs ? (searchParams[curTab] || {}) : searchParams;
      hasTabs && tabFormKey && (curSearchForm[tabFormKey] = curTab);
      return curSearchForm;
    },
    handleOperation () {
      return this.operation && Object.assign({ show: true }, this.operation);
    },
    handleExtraForm () {
      const searchParams = { ...this.extraForm, ...this.curSearchForm };
      this.$emit('update:currentSearchParams', searchParams);
      return searchParams;
    }
  },
  watch: {
    'storeKey' () {
      this.curTab = this.getActiveTab();
      this.searchForm = {};
    }
  },
  $_ue_methods: ueMethods,
  methods: {
    /** utils **/
    getStoreValue (moduleStr, defaultValue) {
      const { storeKey, restore } = this;
      const result = restore && this.$_mixin_storeSession(moduleStr, storeKey);
      return result || defaultValue;
    },
    storeValue (modelStr, value) {
      const { storeKey, needStore } = this;
      needStore && this.$_mixin_storeSession(modelStr, storeKey, value);
    },
    getActiveTab () {
      return Array.isArray(this.searchForms) && this.searchForms[0].name ? this.searchForms[0].name : ''
    },
    getSearchFormProps (item, name) {
      const { storeProps } = this;
      return Object.assign({}, omit(item, ['name', 'label', 'defaultSlot', 'buttonSlot']), storeProps, name && { storeKey: `${storeProps.storeKey}-${name}` });
    },
    // business
    // 合并操作按钮默认属性
    opeBtnProps (props = {}) {
      return Object.assign({ type: 'primary' }, props)
    },
    formSearching (formData) {
      const formdata = this.searchParamsHandler ? this.searchParamsHandler(formData) : formData;
      const { hasTabs, curTab, searchParams } = this;
      hasTabs ? this.$set(searchParams, curTab, formdata) : (this.searchParams = formdata);
      this.storeValue('searchParams', cloneDeep(this.searchParams));
    }
  }
}
