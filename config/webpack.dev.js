const merge = require('webpack-merge');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const UTILS = require('./utils');
const MOCK = require('./mock');
const PROXY = require('./proxy');
const config = require('./webpack.base');

module.exports = merge(config, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        hot: true,
        before(app,server) {
            if(UTILS.isParam('mock',process.argv)) {
                MOCK(app);
            }else {
                PROXY(app);
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'BASEURL': JSON.stringify('http://localhost:9000'),
        })
    ]
})