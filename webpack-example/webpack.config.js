const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: './app/index.jsx',
	output: { path: __dirname, filename: 'dist/bundle.js' },
	mode: 'development',
	module: {
		rules: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
};