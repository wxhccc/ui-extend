import type { App } from 'vue'
import { version } from '../package.json'
import Loading from './ui-comps/loading'
import ActionBtns from '@/components/action-btns'
import DataTable from '@/components/data-table'
// import Cropper from '@/components/cropper'
import CommonField from '@/components/common-field'
import FormBtns from '@/components/form-btns'
import FormFieldItem from '@/components/form-field-item'
import FormFields from '@/components/form-fields'
import InfoTable from '@/components/info-table'
import CommonListPage from '@/components/common-list-page'
import PagedTable from '@/components/paged-table'
import MultiAlert from '@/components/multi-alert'
import PagedList from '@/components/paged-list'
import RemoteCascader from '@/components/remote-cascader'
import SearchForm from '@/components/search-form'
import SearchInput from '@/components/search-input'
import Ticker from '@/components/ticker'
import TreeField from '@/components/tree-field'
// import VideoPlayer from '@/components/video-player'
import ScrollPane from '@/components/scroll-pane'
import TreeTransfer from '@/components/tree-transfer'

// const Cropper = defineAsyncComponent(() => import('@/components/cropper'))

export * from '@/utils'
export * from '@/optionals'

const components = {
  Loading,
  ActionBtns,
  // Cropper,
  CommonField,
  FormBtns,
  FormFieldItem,
  FormFields,
  InfoTable,
  MultiAlert,
  PagedList,
  SearchInput,
  Ticker,
  TreeField,
  DataTable,
  PagedTable,
  SearchForm,
  CommonListPage,
  RemoteCascader,
  ScrollPane,
  TreeTransfer
}

const install = function (app: App) {
  Object.entries(components).forEach(([_key, component]) =>
    app.component(component.name, component)
  )
}

export {
  Loading,
  ActionBtns,
  // Cropper,
  CommonField,
  FormBtns,
  FormFieldItem,
  FormFields,
  InfoTable,
  MultiAlert,
  PagedList,
  SearchInput,
  Ticker,
  TreeField,
  DataTable,
  PagedTable,
  SearchForm,
  CommonListPage,
  RemoteCascader,
  ScrollPane,
  TreeTransfer
}

export default {
  version,
  install,
  ...components
}
