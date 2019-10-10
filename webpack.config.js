const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.[hash].js',
		publicPath: '/',
	},
	devtool: 'inline-source-map',
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
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		host: 'localhost',
		port: port,
		historyApiFallback: true,
		open: true,
		hot: true,
	},
};
