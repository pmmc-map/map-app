const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = process.env.PORT || 3000;

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'static/[name].[hash].js',
		publicPath: '/',
	},
	devtool: 'source-map',
	module: {
		rules: [
			// First Rule
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},

			// Second Rule
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							// Allows to configure how many loaders
							// before css-loader should be applied
							// to @import(ed) resources
							importLoaders: 1,
							localsConvention: 'camelCase',
							// Create source maps for CSS files
							sourceMap: true,
						},
					},
					{
						// PostCSS will run before css-loader and will
						// minify and autoprefix our CSS rules.
						loader: 'postcss-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
	],
};
