const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FEWP = require("friendly-errors-webpack-plugin");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const outputDirectory = "../dist";

module.exports = {
	entry: "./src/client/index.js",
	output: {
		path: path.join(__dirname, outputDirectory),
		filename: "bundle.js"
	},
	devServer: {
		port: 3000,
		open: false,
		quiet: true,
		historyApiFallback: true,
		proxy: {
			"/api": "http://localhost:8080"
		}
	},
	node: {
		fs: 'empty'
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(jpg|png|gif|svg|pdf|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name]-[hash:8].[ext]'
						},
					},
				]
			},
			{
				test: /.(scss|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use:
						"css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader",
				}),
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin([outputDirectory]),
		new Dotenv(),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			favicon: "./public/favicon.ico"
		}),
		new FEWP(),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "./index.html",
		}),
		new ExtractTextPlugin("style.css"),
	],
};
