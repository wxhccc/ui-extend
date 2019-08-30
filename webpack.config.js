const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const { umdDefault } = require('./config/externals');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'UIEXTENDS',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        sideEffects: false
      },
      {
        test: /\.(scss|css)$/,
        loader: ['vue-style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
      'UE': path.resolve(__dirname, 'src/'),
      'Comps': path.resolve(__dirname, 'components/')
    }
  },
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  externals: umdDefault,
  plugins: [new VueLoaderPlugin(), new WebpackBar(), new LodashModuleReplacementPlugin()]
}