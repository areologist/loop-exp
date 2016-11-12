const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index.tsx'
    ],
    output: {
      path: path.resolve('dist'),
      publicPath: '/',
      filename: "bundle.js"
    },

    devtool: "source-map",

    resolve: {
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
      loaders: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        { test: /\.styl$/, loader: "style!css!stylus" },
        { test: /\.css$/, loader: "style!css" },
        { test: /\.html$/, loader: "raw" },
        { test: /\.png$/, loader: "file" },
        { test: /\.json$/, loader: "json" }
      ],

      preLoaders: [
        { test: /\.js$/, loader: "source-map-loader" }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body',
        hash: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new WebpackNotifierPlugin({ alwaysNotify: true })
    ],

    externals: {
    }
};
