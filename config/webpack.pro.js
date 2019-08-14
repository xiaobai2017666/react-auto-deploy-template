const merge = require('webpack-merge');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const config = require('./webpack.base');

module.exports = merge(config, {
    mode: 'production',
    output: {
        filename: '[name]/bundle.[hash].js',
		path: path.resolve(ROOT_PATH, './dist')
    },
    optimization: {
        minimize: true
    },
});
