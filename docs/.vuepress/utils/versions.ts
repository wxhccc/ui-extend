import { NavbarGroup } from "vuepress"

export function versionCompare (origin: string, target: string) {
  const oriVerNums = origin.split('.')
  const targVerNums = target.split('.')
  let result = 0
  oriVerNums.some((num, index) => {
    const numVal = Number(num)
    const compNum = Number(targVerNums[index])
    if(numVal - compNum !== 0) {
      result = numVal - compNum > 0 ? 1 : -1
      return true
    }
  })
  return result
}

const docsVersions = [
  { "main": "1.0", "version": "1.0.0" },
  { "main": "0.1", "version": "0.1.2" }
]


export function verNavCreator () {
  return {
    text: docsVersions[0].version,
    children: docsVersions.map((item, index) => {
      return {
        text: item.version,
        link: `https://${index ? `ui-extend.wxhice.com/${item.main}/index.html` : 'wxhccc.github.io/ui-extend/'}`
      }
    })
  } as NavbarGroup
}
