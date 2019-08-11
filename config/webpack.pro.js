const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');
const config = require('./webpack.base');

module.exports = merge(config, {
	devtool: false,
	output: {
		path: path.resolve(ROOT_PATH, './dist')
    },
    mode: 'production',
    optimization: {
        minimize: true
    },
	plugins: [
		// new webpack.DllReferencePlugin({
		// 	context: ROOT_PATH,
		// 	manifest: require('../static/vendor/vendor-manifest.json'),
		// 	sourceType: 'var'
        // }),
        new HtmlWebpackPlugin()
	]
});
