// показывает в каком порядке собираются модули
// webpack --display-modules
// показывает в каком порядке собираются модули и почему
// webpack --display-modules-v
// создает json для графического изображения связей и последовательности на webpack.github.io/analyse
// webpack --json --profile >stats.json

// окружение (параметры которые передаются с командой)
const NODE_ENV = process.env.NODE_ENV || 'dev'
// подключение вебпака (для работы с плагинами)
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const Babel = require("babel-core").transform("code", {
//   plugins: [["transform-react-jsx-props"]]
// });
const fs = require('fs')
const filesBuildArr = []
const path = require('path');

const route = {
	src: __dirname + '/src/',
	pages: __dirname + '/src/',
	dist: __dirname +'/dist/'
}

// if (NODE_ENV == 'add') throw 'page success created'

module_ava = {
	context: __dirname,
	// entry: (function () {
	// 	var files = {}
	// 	fs.readdirSync(__dirname + '/src/').reduce(function (entries, name) {
	// 		if (name.indexOf('-build') > 0) {
	// 			var name_cut = name.replace('-build.js', '')
	// 			files[name_cut] = './'+name

	// 			filesBuildArr.push(name_cut)
	// 		}
	// 	}, {})
	// 	return files
	// })(),
	entry: {
		index: route.pages + 'webpack.require.js',
	},
	output: {
		path: route.dist,
		filename: "js/[name].js",
		publicPath: '/'
	},
	watch: process.env.NODE_ENV == 'pro' ? true : false,
	watchOptions: {
		aggregateTimeout: 100
	},
	plugins: [
		// new Babel({}),
	    // ["transform-react-jsx"],
		new HtmlWebpackPlugin({
			// chunks: [''],
			template: './src/index.pug',
			// inject: 'head',
			environment: 'FURME',
			filename: 'index.html'
		}),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        // }),
        new ExtractTextPlugin("css/[name].css")
	],
	resolve: {
		alias: {
			// Styles: path.resolve(__dirname, 'src/global/styles/'),
		}
	},
	devServer: {
		host: '0.0.0.0',
		port: 8080,
        contentBase: route.dist,
		proxy: {
		  "/api": {
		    target: "http://localhost:3000",
		    pathRewrite: {"^/api" : ""}
		  }
		},
		historyApiFallback: {
			  rewrites: [
			    { from: /^\/$/, to: '/index.html' },
			    { from: /^\/test/, to: '/index.html' },
			    { from: /^\/gifts/, to: '/index.html' },
			    { from: /./, to: '/index.html' }
			  ]
		}
	},
	// external/s: {
		// babylon: './babylon/libs'
	// },
	module: {
		rules: [
			{
				test: /\.styl$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: { importLoaders: 1, url: false } },
						'autoprefixer-loader',
						'stylus-loader',
					]
				})

			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: { importLoaders: 1 } },
						'autoprefixer-loader',
						'sass-loader',
					]
				})

			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'autoprefixer-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
				]
			},
			{
				test: /\.pug$/,
				use: [
					'pug-loader?pretty'
				]
			},
			{
				test: /\.jsx$/,
				use: [
					'babel-loader',
				]

			},
			{
				test: /\.js$/,
				use: [
					'babel-loader',
				]

			},
			{
			 	test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
				use: [
					'file?name=[path][name].[ext]'
				]
			},



		]

	}
}

// for (var i = filesBuildArr.length - 1; i >= 0; i--) {
// 	var file_name = filesBuildArr[i]
// 	module_ava.plugins.push(
// 		new HtmlWebpackPlugin({
// 			chunks: [file_name],
// 			template: './'+file_name+'/'+file_name+'.pug',
// 			filename: file_name+'.html'
// 		})
// 	)
// }


module.exports = module_ava
