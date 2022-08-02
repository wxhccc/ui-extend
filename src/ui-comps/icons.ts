import { DefineComponent, defineComponent, h } from 'vue'
import { ElIcon } from 'element-plus'
import {
  Search,
  QuestionFilled as Question,
  DocumentCopy,
  Hide,
  Check,
  Close,
  Edit
} from '@element-plus/icons-vue'

const createIconComponent = (name: string, Search: DefineComponent) =>
  defineComponent({
    name,
    setup() {
      return () => h(ElIcon, { default: () => h(Search) })
    }
  })

export const SearchOutlined = createIconComponent('SearchOutlined', Search)
export const QuestionFilled = createIconComponent('QuestionFilled', Question)
export const CopyOutlined = createIconComponent('CopyOutlined', DocumentCopy)
export const EyeOutlined = createIconComponent('EyeOutlined', Hide)
export const CheckOutlined = createIconComponent('CheckOutlined', Check)
export const CloseOutlined = createIconComponent('CloseOutlined', Close)
export const EditOutlined = createIconComponent('EditOutlined', Edit)
