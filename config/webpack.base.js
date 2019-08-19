const path = require('path');
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
				include: [
					path.resolve(ROOT_PATH, './src')
				],
				exclude: [
					path.resolve(ROOT_PATH, './src/static')
				],
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
				include: [
					path.resolve(ROOT_PATH, './src/static')
				],
				loader: 'url-loader',
				options: {
					name: 'img/[name].[ext]',
					limit: 1024
				}
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
					chunks: 'initial',
                    priority: 10
				},
				lib: {
					name: 'lib',
					filename: 'common/[name].[hash].js',
                    test: /src[\\/]lib/,
					chunks: 'initial',
                    priority: 10
				}
            }
        }
    },
	plugins: [
		new CleanWebpackPlugin()
	].concat(UTILS.getHtmlPlugins())
}