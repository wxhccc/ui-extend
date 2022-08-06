import { DefineComponent, defineComponent, h, AllowedComponentProps } from 'vue'
import { ElIcon, IconProps } from 'element-plus'
import {
  Search,
  QuestionFilled as Question,
  DocumentCopy,
  Hide,
  Check,
  Close,
  Edit,
  Loading,
  ArrowLeft,
  ArrowRight
} from '@element-plus/icons-vue'

const createIconComponent = (
  name: string,
  component: DefineComponent,
  props?: IconProps & AllowedComponentProps
) =>
  defineComponent({
    name,
    setup() {
      return () => h(ElIcon, props, h(component))
    }
  })

export const SearchOutlined = createIconComponent('SearchOutlined', Search)
export const QuestionFilled = createIconComponent('QuestionFilled', Question)
export const CopyOutlined = createIconComponent('CopyOutlined', DocumentCopy)
export const EyeOutlined = createIconComponent('EyeOutlined', Hide)
export const CheckOutlined = createIconComponent('CheckOutlined', Check)
export const CloseOutlined = createIconComponent('CloseOutlined', Close)
export const EditOutlined = createIconComponent('EditOutlined', Edit)
export const LoadingOutlined = createIconComponent('LoadingOutlined', Loading, {
  class: 'is-loading'
})
export const ArrowLeftOutlined = createIconComponent('ArrowLeftOutlined', ArrowLeft)
export const ArrowRightOutlined = createIconComponent('ArrowRightOutlined', ArrowRight)
