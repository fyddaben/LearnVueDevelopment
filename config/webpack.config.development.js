'use strict';
var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var srcDir = path.resolve(__dirname, '../src');
var AssetsPlugin = require('assets-webpack-plugin');

var glob = require('glob');
var domain = global.domain;
var entries = function() {
    var  jsDir = path.resolve(srcDir, 'js')
    var  entryFiles = glob.sync(jsDir + '/*.{js,jsx,vue}')
    var  map = {}

    entryFiles.forEach(function(filePath) {
      var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
      var fileArray = [];
      fileArray.push(filePath);
      fileArray.push("webpack-dev-server/client?http://" + domain.static_ip + ':' + domain.static_port);
      fileArray.push("webpack/hot/only-dev-server");
      map[filename] = fileArray;
    });
    return map;
};
var entriPath = entries();
var jsLoaderStr = 'vue-loader';
var scssLoaderStr = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader');
var pluginList = [];
var jsOutputName = '';
pluginList.push(
  new webpack.HotModuleReplacementPlugin()
);
pluginList.push(
  new ExtractTextPlugin("css/[name].css")
);
jsOutputName = 'js/[name].js';
module.exports = {
  entry: entriPath,
  output: {
    path: path.resolve(__dirname, '../' + domain.static_dir),
    // 主要用于code spling, 静态资源域名地址
    publicPath: domain.cdn,
    filename: jsOutputName,
  },
  module: {
    loaders: [
      {
        test: /\.(vue)?$/,
        loader: 'vue',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        loader: scssLoaderStr
      }
    ]
  },
  plugins: pluginList
};



