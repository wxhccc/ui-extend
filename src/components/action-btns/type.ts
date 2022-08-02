import { UeButtonProps } from '@/ui-comps'

export type FunctionalBtnProp<T> = T | ((data: any, btn: ActionBtnIem, ...args: any[]) => T)

type BtnType = UeButtonProps['type']

export interface ActionBtnIem {
  /** 当前按钮上绑定的属性，可以为对象或函数，函数参数为传入数据和当前按钮对象（参数下同） */
  props?: FunctionalBtnProp<UeButtonProps>
  /** 当前按钮是否隐藏（完全隐藏，按钮不会存在），适合权限控 */
  hide?: FunctionalBtnProp<boolean>
  /** 当前按钮的type属性。也可通过`props`属性控制。 */
  btype?: FunctionalBtnProp<BtnType>
  /** 当前按钮的提示文字。 */
  text?: FunctionalBtnProp<string>
  /** 当前按钮在loading状态时的提示文字。 */
  loadingText?: FunctionalBtnProp<string>
  /** 当前按钮的唯一标示。在函数的btn参数中可用于确定按钮。也用在按钮的key属性上（缺省时会使用按钮索引值） */
  key?: string
  /** 当前按钮的loading状态标识值在`loading-flags`对象中的键名 */
  loadingKey?: string
  /** 按钮的点击事件函数 */
  click?: (data: any, btn: ActionBtnIem, ...args: any[]) => void
  /** 按钮点击后是否需要确认操作再执行`click`事件 */
  isConfirm?: FunctionalBtnProp<boolean>
  /** 确认消息框的提示文案 */
  confirmMsg?: FunctionalBtnProp<string>
}
