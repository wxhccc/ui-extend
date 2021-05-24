import { App } from 'vue'
import { version } from '../package.json'
import ActionBtns from './action-btns'
// import DataTable from './data-table';
import Cropper from './cropper'
import CommonField from './common-field'
import FormBtns from './form-btns'
import FormFieldItem from './form-field-item'
import FormFields from './form-fields'
import Viewer from './viewer'
import InfoTable from './info-table'
// import CommonListPage from './common-list-page';
// import PagedTable from './paged-table';
// import MultiAlert from './multi-alert';
// import PagedList from './paged-list';
import RemoteCascader from './remote-cascader'
// import SearchForm from './search-form';
import Ticker from './ticker'
import TreeField from './tree-field'
import VideoPlayer from './video-player'
// import WaterfallPane from './waterfall-pane';

const components = [
  ActionBtns,
  // DataTable,
  Cropper,
  CommonField,
  FormBtns,
  FormFieldItem,
  FormFields,
  Viewer,
  InfoTable,
  // CommonListPage,
  // MultiAlert,
  // PagedList,
  // PagedTable,
  RemoteCascader,
  // SearchForm,
  // Drawer,
  Ticker,
  TreeField,
  VideoPlayer
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
  ActionBtns,
  // DataTable,
  Cropper,
  CommonField,
  FormBtns,
  FormFieldItem,
  FormFields,
  Viewer,
  InfoTable,
  // CommonListPage,
  // MultiAlert,
  // PagedList,
  // PagedTable,
  RemoteCascader,
  // SearchForm,
  Ticker,
  TreeField,
  VideoPlayer
  // WaterfallPane
}
