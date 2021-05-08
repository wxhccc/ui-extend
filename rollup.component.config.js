const common = require('./webpack.config');
const merge = require('webpack-merge');
const Components = require('./components.json');
const { commonjs, componentUtils } = require('./config/externals');

const externals = componentUtils();
Object.keys(Components).forEach(key => {
  externals[`Comps/${key}`] = `./${key}`
})

module.exports = merge(common(), {
  mode: 'production',
  entry: Components,
  output: {
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  externals: commonjs.concat(externals)
})