var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  // webpackが読み込むファイルを指定
  entry: {
    javascript: './app.jsx',
    html: './index.html'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'app.js'
  },
  resolve: {
    // require()する時に拡張子を省略可能にする
    extensions: ['', '.js', '.jsx']
  },
  // devtool: "source-map",
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
};
