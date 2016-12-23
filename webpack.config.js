var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendors: [
            path.resolve('src/front', 'app.js'),
            "webpack-material-design-icons"
        ],
    },
    output: {
        path: path.resolve('dist'),
        publicPath: "/dist/",
        filename: "build.js"
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {test: /\.vue?$/, loader: 'vue'},      
            {test: /\.html$/, loader: 'vue-html'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.(jpe?g|png)(\?[a-z0-9=\.]+)?$/i, loader: 'url-loader?limit=100000&name=./img/[name].[ext]'},
            {test: /\.(woff(2)?|eot|otf|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'file-loader?name=./fonts/[name].[ext]'},

        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else { module.exports.devtool = '#source-map' }