const path = require("path")
const webpack = require("webpack")

module.exports = {
  entry: [path.resolve("src/front", "app.js"), "webpack-material-design-icons"],
  output: {
    path: path.resolve("dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    },
    modules: [path.join(__dirname, "src"), "node_modules"]
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue" },
      { test: /\.js$/, loader: "babel", exclude: /node_modules/ },
      { test: /\.html$/, loader: "vue-html" },
      { test: /\.json?$/, loader: "json" },
      {
        test: /\.scss$/,
        use: ["style", "css", "sass"]
      },
      { test: /\.css$/, use: ["style", "css"] },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url?limit=100000&name=./img/[name].[ext]"
      },
      {
        test: /\.(woff(2)?|eot|otf|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        loader: "file?name=./fonts/[name].[ext]"
      },
      { test: /\.(pdf)$/, loader: "file?name=./documents/[name].[ext]" }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
}

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map"
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: '"production"' }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ])
}
