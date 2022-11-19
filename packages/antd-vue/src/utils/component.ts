import { NamePath } from '@wxhccc/ue-shared'
import { FORM_ITEM_NAME } from '../ui-comps/const'

export const getFormItemName = <T extends { name?: NamePath }>(item: T) => {
  return item[FORM_ITEM_NAME]
}

export const getFormItemFullName = (name: NamePath = '', prevNames?: NamePath[]) => {
  const curPath = name ? [name] : []
  return Array.isArray(prevNames) ? prevNames.concat(curPath) : curPath
}