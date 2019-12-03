const path = require( 'path' );

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		libraryTarget: 'this',
		path: path.resolve( __dirname, 'dist' ),
	},
	externals: {
		/* eslint-disable key-spacing */
		react:                   'React',
		'react-dom':             'ReactDOM',
		'@wordpress/api-fetch':  { this: [ 'wp', 'apiFetch' ] },
		'@wordpress/compose':    { this: [ 'wp', 'compose' ] },
		'@wordpress/components': { this: [ 'wp', 'components' ] },
		'@wordpress/data':       { this: [ 'wp', 'data' ] },
		'@wordpress/dom-ready':  { this: [ 'wp', 'domReady' ] },
		'@wordpress/edit-post':  { this: [ 'wp', 'editPost' ] },
		'@wordpress/plugins':    { this: [ 'wp', 'plugins' ] },
		'@wordpress/url':        { this: [ 'wp', 'url' ] },
		/* eslint-enable */
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@wordpress/default',
						],
					},
				},
			},
		],
	},
};
