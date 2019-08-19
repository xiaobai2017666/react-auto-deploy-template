const merge = require('webpack-merge');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const config = require('./webpack.base');

module.exports = merge(config, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true
    },
});
