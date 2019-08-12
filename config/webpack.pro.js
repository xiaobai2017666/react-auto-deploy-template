const merge = require('webpack-merge');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const config = require('./webpack.base');

module.exports = merge(config, {
    mode: 'production',
    output: {
        path: path.resolve(ROOT_PATH, './dist'),
        filename: 'index.[hash].bundle.js'
    },
    optimization: {
        minimize: true
    },
});
