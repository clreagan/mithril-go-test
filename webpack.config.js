const path = require('path');
const webpack = require('webpack');

module.exports = env => {


	// Set the dev only variables
	server = "'http://localhost:8000'";

	return {
		entry: './src/index.jsx',
		devtool: 'inline-source-map',
		output: {
			filename: 'app.js',
			path: path.resolve(__dirname, 'dist')
		},
		devServer: {
			host: "localhost",
			port: 8000,
			https: false,
			contentBase: path.resolve(__dirname, 'dist'),
			historyApiFallback: true
		},
		resolve: {
			extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
		},
		plugins: [
			new webpack.DefinePlugin({
				__API__: server,
			})
		],
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/,
					exclude: /node_modules/,
					use: [
						'babel-loader',
						'ts-loader'
					]
				},
				{
					test: /\.(css|less)$/,
					use: [
						'style-loader',
						'css-loader',
						'less-loader'
					]
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'fonts/'
							}
						}
					]
				}
			]
		}
	}
};