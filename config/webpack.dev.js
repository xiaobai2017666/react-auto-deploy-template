const merge = require('webpack-merge');
const webpack =require('webpack');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const UTILS = require('./utils');
const MOCK = require('./mock');
const proxy = require('http-proxy-middleware');
const baseConfig = require('./webpack.base');

const CONFIG = {
    mode: 'development',
    devServer: {
        contentBase: path.join(ROOT_PATH, './src/module'),
        port: 6789,
        hot: true,
        before(app) {
            if(UTILS.isParam('mock',process.argv)) {
                MOCK(app);
            }else {
                app.use(
                    '/api',
                    //                   联调地址
                    proxy({
                        target: 'http://localhost:5656',
                        changeOrigin: true,
                        pathRewrite: {
                            '^/api/': '/',
                        },
                    })
                )
            }
        },
    },
    plugins: [],
}











module.exports = function() {
    return new Promise((resolve) => {
        UTILS.PortDetect(CONFIG.devServer)
            .then((port) => {
                CONFIG.plugins.push(
                    new webpack.DefinePlugin({
                        'PREFIX': JSON.stringify(`http://localhost:${port}/api`),
                    })
                );

                resolve(merge(baseConfig,CONFIG));
            })
    });
}