const webpack = require('webpack');
const globalConfig = require('./src/config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// babel-loader的配置
const babelLoaderConfig = {
  presets: ['latest', 'stage-0', 'react'],
  plugins: [['import', {libraryName: 'antd', style: true}]],
  cacheDirectory: true,
};

const lessLoaderVars = {
  sidebarCollapsible: globalConfig.sidebar.collapsible,
};

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.js',
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },

  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      antdcss: 'antd/dist/antd.min.css',
    },
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader?' + JSON.stringify(babelLoaderConfig)],
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: 'style!css',
      }, {
        test: /\.less$/,
        loader: 'style!css!' + `less?{"sourceMap":true,"modifyVars":${JSON.stringify(lessLoaderVars)}}`,
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=25000',
      },
    ],
  },

  plugins: [
    new webpack.BannerPlugin('This file is created'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true')),  // magic globals, 用于打印一些调试的日志, webpack -p时会删除
    }),
    new HtmlWebpackPlugin({
      template: 'index.html.template',
      title: globalConfig.name,
      // 自定义favIcon
      favIcon: globalConfig.favicon,
      // 自定义, dev模式下要加载一些额外的js
      devMode: true,
    }),
  ],
};
