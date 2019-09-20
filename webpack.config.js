const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const { umdDefault } = require('./config/externals');

module.exports = (elementNotSplit) => ({
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'UIEXTEND',
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
        use: {
          loader: 'babel-loader',
          options: !elementNotSplit ? {
            plugins: [
              ["babel-plugin-component", {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
              }]
            ]
          } : {}
        },
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
})