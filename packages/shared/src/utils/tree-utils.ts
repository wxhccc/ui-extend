import { AnalyseTreeData, TreeKeyNode } from '@wxhccc/es-util'
import { StrOrNum } from '../types'

type TreeKeyDataMap = Record<string, TreeKeyNode>

/**
 * 将一维的节点id数组转换为包含全选和半选数据的对象，根据单向模式或双向模式，结果有差异
 * @param treeData 分析之后得数据
 * @param values 传入得nodeKey数组
 * @param mode 模式，'one-way'=单向，仅分出半选 'two-way'=双向，需补充半选或全选父节点 'unknown'=未知，适用于外部传入数据，可能不完整
 */
export const handleTreeKeys = (treeData: AnalyseTreeData, values: StrOrNum[] = [], mode?: 'one-way' | 'two-way' | 'unknown') => {
  const { keyNodeMap, childKeysMaps } = treeData
  const checked = new Set<StrOrNum>()
  const halfChecked = new Set<StrOrNum>()
  const checkNodeChecked = (key: StrOrNum): boolean => {
    const childrenKeys = childKeysMaps[key] || []
    return childrenKeys.length === 0 || !childrenKeys.some(k => !values.includes(k))
  }
  // 如果有子节点，则递归判断子节点是否全部选中
  values.forEach((key) => {
    if (mode !== 'one-way') {
      checked.add(key)
      let prevParent = keyNodeMap[key]?.parent
      while (prevParent && !values.includes(prevParent.keyVlaue)) {
        const { keyVlaue } = prevParent
        if (!halfChecked.has(keyVlaue)) {
          checkNodeChecked(keyVlaue) ? checked.add(keyVlaue) : halfChecked.add(keyVlaue)
        }
        prevParent = prevParent.parent
      }
    }
    if (mode !== 'two-way') {
      checkNodeChecked(key) ? checked.add(key) : halfChecked.add(key)
    }

  })
   
  return { checked: Array.from(checked), halfChecked: Array.from(halfChecked) }
}