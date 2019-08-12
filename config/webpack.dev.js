const merge = require('webpack-merge');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const config = require('./webpack.base');

module.exports = merge(config, {
    mode: 'development',
    output: {
		path: path.resolve(ROOT_PATH, './dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true
    },
});
