import { Select } from 'ant-design-vue'

export {
  Button as UeButton,
  Input as UeInput,
  Alert as UeAlert,
  Select as UeSelect,
  message as UeMessage,
  Tree as UeTree,
  Cascader as UeCascader,
  Pagination as UePagination,
  Table as UeTable,
  TableColumn as UeTableColumn,
  Checkbox as UeCheckbox,
  Radio as UeRadio,
  RadioGroup as UeRadioGroup,
  CheckboxGroup as UeCheckboxGroup,
  FormItem as UeFormItem,
  DatePicker as UeDatePicker,
  Form as UeForm,
  List as UeList,
  Row as UeRow,
  Col as UeCol,
  Tabs as UeTabs,
  TabPane as UeTabPane,
  Tooltip as UeTooltip,
  Space as UeSpace,
  Image as UeImage
} from 'ant-design-vue'

export const { Option: UeOption } = Select

import { formProps } from 'ant-design-vue/es/form/index'

export const ueFormProps = formProps() as Pick<ReturnType<typeof formProps>, 'rules'>

export type {
  ButtonProps as UeButtonProps,
  InputProps as UeInputProps,
  AlertProps as UeAlertProps,
  SelectProps as UeSelectProps,
  CascaderProps as UeCascaderProps,
  DatePickerProps as UeDatePickerProps,
  PaginationProps as UePaginationProps,
  TableProps as UeTableProps,
  TableColumn as Column,
  TableColumnProps as UeTableColumnProps,
  CheckboxProps as UeCheckboxProps,
  RadioProps as UeRadioProps,
  RadioGroupProps as UeRadioGroupProps,
  FormItemProps as UeFormItemProps,
  FormProps as UeFormProps,
  FormInstance as UeFormInstance,
  FormItemInstance as UeFormItemInstance,
  ListProps as UeListProps,
  RowProps as UeRowProps,
  ColProps as UeColProps,
  TabsProps as UeTabsProps,
  TooltipProps as UeTooltipProps,
  SpaceProps as UeSpaceProps,
  ImageProps as UeImageProps,
  TreeProps as UeTreeProps,
} from 'ant-design-vue'


export type { CascaderOptionType } from 'ant-design-vue/es/cascader'

export type { DataNode as TreeDataNode } from 'ant-design-vue/es/tree'

export type { ColumnProps as TbColumnProps } from 'ant-design-vue/es/table'

export type { TableRowSelection } from 'ant-design-vue/es/table/interface'

export type { RuleObject } from 'ant-design-vue/es/form'

export { default as UeLoading } from './loading.vue'

export { default as UeScrollbar } from './scrollbar.vue'

export type { LoadingProps } from './loading.vue'

export * from './confirm'

export * from './icons'

export * from './const'
