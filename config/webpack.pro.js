const merge = require('webpack-merge');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const config = require('./webpack.base');

module.exports = merge(config, {
    mode: 'production',
    optimization: {
        minimize: true
    },
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'BASEURL': JSON.stringify('http://localhost:9000'),
    //     })
    // ]
});
