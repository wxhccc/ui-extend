import { App } from 'vue';
import { version } from '../package.json';
// import ActionBtns from 'Comps/action-btns';
// import DataTable from 'Comps/data-table';
// import Cropper from 'Comps/cropper';
// import CommonField from 'Comps/common-field';
// import FormBtns from 'Comps/form-btns';
// import FormFieldItem from 'Comps/form-field-item';
// import FormFields from 'Comps/form-fields';
// import Viewer from 'Comps/viewer';
// import InfoTable from 'Comps/info-table';
// import CommonListPage from 'Comps/common-list-page';
// import PagedTable from 'Comps/paged-table';
// import MultiAlert from 'Comps/multi-alert';
// import PagedList from 'Comps/paged-list';
// import RemoteCascader from 'Comps/remote-cascader';
// import SearchForm from 'Comps/search-form';
// import SearchInput from 'Comps/search-input';
// import Drawer from 'Comps/drawer';
import Ticker from 'Comps/ticker'
// import TreeField from 'Comps/tree-field';
// import VideoPlayer from 'Comps/video-player';
// import WaterfallPane from 'Comps/waterfall-pane';

const components = [
  // ActionBtns,
  // DataTable,
  // Cropper,
  // CommonField,
  // FormBtns,
  // FormFieldItem,
  // FormFields,
  // Viewer,
  // InfoTable,
  // CommonListPage,
  // MultiAlert,
  // PagedList,
  // PagedTable,
  // RemoteCascader,
  // SearchForm,
  // SearchInput,
  // Drawer,
  Ticker,
  // TreeField,
  // VideoPlayer,
  // WaterfallPane
]

const install = function (app: App) {
  components.forEach((component: UE.Component) => app.use(component))
}

// if (typeof window !== undefined && window.Vue) {
//   install(window.Vue);
// }

export default {
  version,
  install,
  //ActionBtns,
  // DataTable,
  // Cropper,
  // CommonField,
  // FormBtns,
  // FormFieldItem,
  // FormFields,
  // Viewer,
  // InfoTable,
  // CommonListPage,
  // MultiAlert,
  // PagedList,
  // PagedTable,
  // RemoteCascader,
  // SearchForm,
  // SearchInput,
  // Drawer,
  Ticker,
  // TreeField,
  // VideoPlayer,
  // WaterfallPane
}