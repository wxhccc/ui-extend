import { AnyFunction } from "@wxhccc/ue-shared"

export interface TipsTexts {
  /** 加载中 */
  loading?: string
  /** 无更多数据 */
  noMore?: string
  /** 获取更多 */
  getMore?: string
  /** 无更多数据 */
  dataEmpty?: string
}
export interface ScrollPaneProps<T = any> {
  /** 是否在加载中 */
  loading?: boolean
  /** 数据项需要去重时使用的key，适用于对象数组 */
  uniqueKey?: string
  /** 列表数据数组。为对象数组时可以利用`unique-key`去重 */
  data?: T[]
  /** 数据的总条数，非必要。如果提供了有效值并且(去重)数据条数大于等于总数时，滚动条滚动到底部时不再触发 */
  total?: number
  /** 组件内部是通过`total`和(去重)数据条数的比较来判断是否无更多数据，对于存在数据去重的情况下，这个对比可能不会准确，可设置此属性为`true`以覆盖内部逻辑 */
  noMoreData?: boolean
  /** 提示文案配置对象 */
  tipsTexts?: TipsTexts
  /** 防抖时延，单位为 */
  debounceWait?: number
  /** 滚动条到达底部时会调用的函数。`loading`值为`true`, `total`小于(去重)数据条数 时不会触发。 */
  load: AnyFunction
  /** 滚动条触发“到底”事件时离底部的像素值（阀值）  */
  triggerPixel?: number
  /** 监测load函数运行时忽略总数限制 */
  loadIgnoreTotal?: boolean
}
