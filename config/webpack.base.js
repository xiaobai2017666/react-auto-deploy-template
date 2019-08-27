const path = require('path');
// const webpack =require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const UTILS = require('./utils');

module.exports = {
	entry: UTILS.getEntries(),
	output: {
        filename: '[name]/bundle.[hash].js',
		path: path.resolve(ROOT_PATH, './dist')
    },
	resolve: {
		alias: {
			'@': path.resolve(ROOT_PATH, './src/lib'),
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
				test: /\.(css)$/,
				include: [
					path.resolve(ROOT_PATH, './src/module'),
					path.resolve(ROOT_PATH, './src/lib')
				],
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(js|jsx)$/,
				include: [
					path.resolve(ROOT_PATH, './src')
				],
				exclude: [
					path.resolve(ROOT_PATH, './src/static')
				],
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								"@babel/env",
								"@babel/preset-react"
							]
						}
					}
				]
			},
			{
				test: /\.(png|gif|jpg|jpeg|svg)$/,
				include: [
					path.resolve(ROOT_PATH, './src/static/img')
				],
				use: [
					{
						loader: 'url-loader',
						options: {
							name: 'img/[name].[ext]',
							limit: 1024
						}
					}
				]
			},
			{
				test: /\.(woff|eot|ttf)$/,
				include: [
					path.resolve(ROOT_PATH, './src/static/font')
				],
				use: [
					{
						loader: 'url-loader',
						options: {
							name: 'font/[name].[ext]'
						}
					}
				]
			}
		]
	},
	optimization: {
        splitChunks: {
            cacheGroups: {
                modules: {
					name: 'modules',
					filename: 'common/[name].[hash].js',
                    test: /node_modules/,
					chunks: 'all',
                    priority: 10
				},
				lib: {
					name: 'lib',
					filename: 'common/[name].[hash].js',
                    test: /src[\\/]lib/,
					chunks: 'initial',
					enforce: true,
                    priority: 10
				}
            }
        }
    },
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['!/common']
		})
	].concat(UTILS.getHtmlPlugins())
}