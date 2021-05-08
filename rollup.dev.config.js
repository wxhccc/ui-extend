const common = require('./webpack.config');
const merge = require('webpack-merge');
const { commonjs } = require('./config/externals');

module.exports = [
  merge(common(true), {
    output: {
      filename: 'index.js',
      library: {
        type: 'commonjs2'
      }
    },
    externals: commonjs,
    watch: true
  }),
  merge(common(true), {
    experiments: {
      outputModule: true
    },
    output: {
      filename: 'index.es.js',
      library: {
        type: 'module'
      }
    },
    externals: commonjs,
    watch: true
  })
]