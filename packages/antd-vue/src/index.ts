import type { App } from 'vue'
import { version } from '../package.json'
import Loading from './ui-comps/loading.vue'
import ActionBtns from '@/components/action-btns'
import CopyClipboard from '@/components/copy-clipboard'
import MediaContainer from '@/components/media-container'
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
import ScrollPane from '@/components/scroll-pane'
import TreeTransfer from '@/components/tree-transfer'
import Cropper from '@/components/cropper'

export type { LoadingProps } from './ui-comps/loading.vue'
export * from '@/components/action-btns'
export * from '@/components/copy-clipboard'
export * from '@/components/media-container'
export * from '@/components/common-field'
export * from '@/components/form-btns'
export * from '@/components/form-field-item'
export * from '@/components/form-fields'
export * from '@/components/info-table'
export * from '@/components/common-list-page'
export * from '@/components/paged-table'
export * from '@/components/multi-alert'
export * from '@/components/paged-list'
export * from '@/components/remote-cascader'
export * from '@/components/search-form'
export * from '@/components/search-input'
export * from '@/components/ticker'
export * from '@/components/tree-field'
export * from '@/components/scroll-pane'
export * from '@/components/tree-transfer'
export * from '@/components/cropper'

export * from '@wxhccc/ue-shared'
export * from '@/optionals'

const components = {
  Loading,
  ActionBtns,
  CopyClipboard,
  MediaContainer,
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
  PagedTable,
  SearchForm,
  CommonListPage,
  RemoteCascader,
  ScrollPane,
  TreeTransfer,
  Cropper
}

const install = function (app: App) {
  Object.entries(components).forEach(([_key, component]) =>
    app.component(component.name, component)
  )
  const provideKeys = ['UeLoadingOptions', 'UeConfirmOptions', 'UeDefaultPageSize']
  provideKeys.forEach((key) => app.provide(key, undefined))
}

export {
  Loading,
  ActionBtns,
  CopyClipboard,
  MediaContainer,
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
  PagedTable,
  SearchForm,
  CommonListPage,
  RemoteCascader,
  ScrollPane,
  TreeTransfer,
  Cropper
}

export default {
  version,
  install,
  ...(components as any)
}
