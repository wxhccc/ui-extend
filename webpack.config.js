const path = require('path');
const { VueLoaderPlugin }  = require('vue-loader');
const WebpackBar = require('webpackbar');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { umdDefault } = require('./config/externals');

module.exports = (elementNotSplit) => ({
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'lib'),
    library: {
      type: 'umd',
      export: 'default'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: ['\\.vue$'],
          // transpileOnly: true
        },
        exclude: /node_modules/
      },
      
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: !elementNotSplit ? {
          plugins: [
            [
              'babel-plugin-import',
              {
                libraryName: 'ant-design-vue',
                libraryDirectory: '', // default: lib
                style: true,
              }
            ]
          ]
        } : {},
        exclude: /node_modules/,
        sideEffects: false
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.md', '.json'],
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
  externalsPresets: { node: true },
  externals: umdDefault,
  plugins: [new VueLoaderPlugin(), new WebpackBar(), new LodashModuleReplacementPlugin()]
})