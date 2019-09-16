const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals')

const base = {
  'vue': {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue'
  },
  'element-ui': {
    root: 'ELEMENT',
    commonjs: 'element-ui',
    commonjs2: 'element-ui'
  }
}

const elementRegex = /^element-ui\/.+$/i;

const lodashRegex = /^lodash\/.+$/i;

const plugins = ['video.js', 'viewerjs', 'cropperjs', 'numeral', 'fecha']

module.exports = {
  base,
  elementRegex,
  lodashRegex,
  plugins,
  umdDefault: [base, elementRegex],
  commonjs: [nodeExternals(), base, elementRegex, lodashRegex].concat(plugins),
  componentUtils () {
    let externals = {}
    const utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
    const mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
    const createIterator = dir => file => {
      const fname = path.basename(file, '.js');
      externals[`UE/${dir}/${fname}`] = `./${dir}/${fname}`
    }
    utilsList.forEach(createIterator('utils'))
    mixinsList.forEach(createIterator('mixins'))
    return externals
  }
}