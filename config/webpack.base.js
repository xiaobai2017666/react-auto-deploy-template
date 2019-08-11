const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '../');

module.exports = {
	entry: {
		index: [
            './src/index.js'
        ]
	},
	resolve: {
		alias: {
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
	}
}