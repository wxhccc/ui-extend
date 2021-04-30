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
      filename: 'index.js',
      library: {
        type: 'commonjs2'
      }
    },
    externals: commonjs,
  }),
  merge(common(), {
    output: {
      filename: 'index.es.js',
      library: {
        type: 'module'
      }
    },
    externals: commonjs,
  }),
  merge(common(true), {
    output: {
      filename: 'index.docs.js',
      library: {
        type: 'commonjs2'
      }
    },
    externals: commonjs
  })
]
