import { App } from 'vue'
import { version } from '../package.json'
import Loading from './ui-comps/loading'
import ActionBtns from '@/components/action-btns'
// import DataTable from '@/components/data-table'
import Cropper from '@/components/cropper'
import CommonField from '@/components/common-field'
import FormBtns from '@/components/form-btns'
import FormFieldItem from '@/components/form-field-item'
import FormFields from '@/components/form-fields'
import InfoTable from '@/components/info-table'
// import CommonListPage from '@/components/common-list-page'
// import PagedTable from '@/components/paged-table'
import MultiAlert from '@/components/multi-alert'
import PagedList from '@/components/paged-list'
// import RemoteCascader from '@/components/remote-cascader'
// import SearchForm from '@/components/search-form'
import SearchInput from '@/components/search-input'
import Ticker from '@/components/ticker'
import TreeField from '@/components/tree-field'
// import VideoPlayer from '@/components/video-player'
// import WaterfallPane from '@/components/waterfall-pane'

const components = [
  Loading,
  ActionBtns,
  Cropper,
  CommonField,
  FormBtns,
  FormFieldItem,
  FormFields,
  InfoTable,
  MultiAlert,
  PagedList,
  SearchInput,
  Ticker,
  TreeField
]

const install = function (app: App) {
  components.forEach((component) => app.component(component.name, component))
}

export {
  Loading,
  ActionBtns,
  Cropper,
  CommonField,
  FormBtns,
  FormFieldItem,
  FormFields,
  InfoTable,
  MultiAlert,
  PagedList,
  SearchInput,
  Ticker,
  TreeField
}

export default {
  version,
  install,
  Loading,
  ActionBtns,
  Cropper,
  CommonField,
  FormBtns,
  FormFieldItem,
  FormFields,
  InfoTable,
  MultiAlert,
  PagedList,
  SearchInput,
  Ticker,
  TreeField
}
