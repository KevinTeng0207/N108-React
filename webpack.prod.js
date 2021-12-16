const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name]-[chunkhash].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            Config: __dirname + '/config.json'
        }
    },
    optimization: {
        minimizer: [
            // 壓縮JS
            new TerserPlugin({
                test: /\.js(x)?(\?.*)?$/i,
                exclude: /node_modules/,
                terserOptions: {
                    compress: {
                        warnings: false, // 當刪除沒有用處的代碼時，顯示警告
                        drop_console: true // 刪除console.*函數
                    },
                    output: {
                        beautify: false, // 是否美化輸出代碼
                        comments: false // 保留所有註釋
                    }
                }
            }),
            // 壓縮CSS
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});