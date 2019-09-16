const path = require('path');
const common = require('./webpack.config');
const merge = require('webpack-merge');
const { commonjs } = require('./config/externals');

module.exports = [
  merge(common(true), {
    optimization: {
      minimize: true
    }
  }),
  merge(common(), {
    output: {
      filename: 'index.common.js',
      libraryTarget: 'commonjs2'
    },
    externals: commonjs,
  }),
  merge(common(true), {
    output: {
      filename: 'index.docs.js',
      libraryTarget: 'commonjs2'
    },
    externals: commonjs
  })
]
