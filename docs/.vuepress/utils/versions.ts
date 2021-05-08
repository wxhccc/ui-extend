import path from 'path'

export function versionCompare (origin, target) {
  const oriVerNums = origin.split('.')
  const targVerNums = target.split('.')
  let result = 0
  oriVerNums.some((num, index) => {
    if(num - targVerNums[index] !== 0) {
      result = num - targVerNums[index] > 0 ? 1 : -1
      return true
    }
  })
  return result
}

export function updateVerFile (main, version) {
  const filePath = path.resolve(__dirname, '../../../docs-versions.json')
  const versions = require(filePath) || []
  const match = versions.find(item => item.main === main)
  if (match && versionCompare(version, match.version) < 1) return
  const fs = require('fs')
  match ? (match.version = version) : versions.unshift({ main, version })
  fs.writeFileSync(filePath, JSON.stringify(versions))
}

export function  verNavCreator () {
  const versions = require('../../../docs-versions.json')
  return {
    text: versions[0].version,
    items: versions.map((item, index) => {
      return {
        text: item.version,
        link: `https://${index ? `ui-extend.wxhice.com/${item.main}/index.html` : 'wxhccc.github.io/ui-extend/'}`
      }
    })
  }
}
