const merge = require('webpack-merge'),
    webpack = require('webpack'),
    common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        host: '127.0.0.1',
        port: 8888,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});