const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals')

const base = {
  'vue': {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue'
  },
  'ant-design-vue': {
    root: 'AntdVue',
    commonjs: 'ant-design-vue',
    commonjs2: 'ant-design-vue'
  }
}

const antdVueRegex = /^ant-design-vue\/.+$/i;

const lodashRegex = /^lodash\/.+$/i;

const plugins = ['video.js', 'viewerjs', 'cropperjs', 'numeral', 'fecha']

module.exports = {
  base,
  antdVueRegex,
  lodashRegex,
  plugins,
  umdDefault: [base, antdVueRegex],
  commonjs: [nodeExternals(), base, antdVueRegex, lodashRegex].concat(plugins),
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