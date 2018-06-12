const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', path.resolve('src/front', 'app.js')],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    pathinfo: false
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  plugins: [new CleanWebpackPlugin(['dist'])],
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.html$/, use: [{ loader: 'vue-html' }] },
      { test: /\.css/, use: ['style', 'css'] },
      { test: /\.scss/, use: ['style', 'css', 'sass'] },
      { test: /\.(png|jpg|gif|svg)$/, loader: 'url?limit=100000&name=../img/[name].[ext]' },
      { test: /\.(woff(2)?|eot|otf|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'file?name=../fonts/[name].[ext]' }
    ]
  }
}
