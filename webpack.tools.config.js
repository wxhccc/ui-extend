const path = require('path');
const common = require('./webpack.config');
const merge = require('webpack-merge');

module.exports = merge(common(), {
  mode: 'production',
  entry: {
    'utils': './src/utils/index.js',
    'mixins': './src/mixins/index.js',
    'optional': './src/optionals/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].min.js',
    library: ['UIEXTENDS', '[name]']
  },
  optimization: {
    minimize: true
  }
})
