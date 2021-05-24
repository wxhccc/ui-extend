import { StrOrNum } from 'components/utils/types'
import { CascaderProps } from '../ui-comps/cascader'

export interface RemoteCascaderProps extends CascaderProps {
  load: (
    level: number,
    curValue?: StrOrNum,
    modelValue?: StrOrNum[],
    optionItem?: UE.Option
  ) => void
  options?: UE.TreeNodeData[]
  modelValue?: StrOrNum[]
  initFirstChange?: boolean
  initValue?: StrOrNum[]
  initInOrder?: boolean
}
