const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const UTIL = require('./utils');

console.log(UTIL);

module.exports = {
	entry: {
		index: [
            './src/index.js'
        ]s
	},
	resolve: {
		alias: {
			'@': path.resolve(ROOT_PATH, './src/module'),
			'REQUEST': path.resolve(ROOT_PATH, './src/request'),
			'ROUTER': path.resolve(ROOT_PATH, './src/router'),
			'LANGUAGE': path.resolve(ROOT_PATH, './src/language'),
			'STATIC': path.resolve(ROOT_PATH, './src/static')
            // ...
		},
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: [
						"@babel/env",
						"@babel/preset-react"
					]
				}
			  },
			{
				test: /\.(png|gif|jpg|jpeg|woff|eot|ttf|svg)$/,
				exclude: /node_modules/,
				loader: 'url-loader',
				options: {
					name: 'img/[name].[ext]',
					limit: 1024
				}
			}
		]
	},
	plugins: [
        new HtmlWebpackPlugin({
			template: path.resolve(ROOT_PATH, './src/index.html')
		})
	]
}