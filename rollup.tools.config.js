const path = require('path');
const common = require('./webpack.config');
const merge = require('webpack-merge');

module.exports = merge(common(), {
  mode: 'production',
  entry: {
    'utils': './src/utils/index.ts',
    'mixins': './src/mixins/index.ts',
    'optional': './src/optionals/index.ts'
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
