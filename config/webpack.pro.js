const merge = require('webpack-merge');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const config = require('./webpack.base');

module.exports = merge(config, {
    mode: 'production',
    output: {
        filename: 'index.[hash].bundle.js',
		path: path.resolve(ROOT_PATH, './dist/[name]/')
    },
    optimization: {
        minimize: true
    },
});
