const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader')

module.exports = {
  entry: ['@babel/polyfill', path.resolve('src/front/app.js')],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    pathinfo: false
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  plugins: [new CleanWebpackPlugin(['dist']), new VueLoaderPlugin()],
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['vue-style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|jpg|gif|svg)$/, loader: 'url-loader?limit=100000&name=../img/[name].[ext]' },
      { test: /\.(woff(2)?|eot|otf|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'file-loader?name=../fonts/[name].[ext]' }
    ]
  }
}
