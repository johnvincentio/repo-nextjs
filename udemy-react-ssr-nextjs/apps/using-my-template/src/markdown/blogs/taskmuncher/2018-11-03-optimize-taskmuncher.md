---
meta-title: "Optimizing TaskMuncher with Webpack 4 | John Vincent"
meta-description: "John Vincent's Optimizing TaskMuncher with Webpack 4"
meta-keywords: "Taskmuncher, React, Webpack, Code splitting, Caching"

title: "Optimizing TaskMuncher with Webpack 4"
subtitle: ""
lead: ""

category: [Taskmuncher, React, Webpack, Code splitting, Caching]
permalink: /taskmuncher/optimize-taskmuncher/
---

Let's discuss updating Webpack 4 TaskMuncher Optimizations.

<!-- end -->

# Optimizing TaskMuncher

For extensive discussions regarding TaskMuncher, please see [TaskMuncher Overview](/taskmuncher/overview/)

For a prelude to this discussion, please see [Update TaskMuncher to Webpack v4, Babel v7, Material-UI v3](/taskmuncher/update-taskmuncher-v2/)

The optimization of TaskMuncher led to [TaskMuncher Performance](/taskmuncher/taskmuncher-performance/)

[Webpack Code Splitting](https://webpack.js.org/guides/code-splitting/)

[Webpack Caching](https://webpack.js.org/guides/caching/)

[Webpack Lazy Loading](https://webpack.js.org/guides/lazy-loading/)

[Using Webpack](https://survivejs.com/webpack/introduction/)

## Code Splitting

Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.

## Lazy Loading

Lazy, or "on demand", loading is a great way to optimize your site or application. This practice essentially involves splitting your code at logical breakpoints, and then loading it once the user has done something that requires, or will require, a new block of code. This speeds up the initial load of the application and lightens its overall weight as some blocks may never even be loaded.

## TaskMuncher

The techniques are beyond the scope of this document. There are many very good sources.

The following briefly describes the TaskMuncher implementation.

### React Loadable

`react-loadable` is a higher-order component for loading components with dynamic imports. I chose `react-loadable` as it is so simple to implement.

Add the following:

```
npm i react-loadable --save
npm i @babel/plugin-syntax-dynamic-import --save-dev
```

Add to .babelrc

```
{
  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

thus now have

```
{
  "presets": ["@babel/env", "@babel/react"],
  "plugins": [
    "@babel/proposal-object-rest-spread",
    "@babel/proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

### webpack.config.js

```
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const copyWebpackPluginOptions = 'warning'; // info, debug, warning

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const transforms = require('./transforms');

const SCSS_FOLDER = path.resolve(__dirname, './scss');
const ICONS_FOLDER = path.resolve(__dirname, './icons');
const DIST_FOLDER = path.resolve(__dirname, './dist');
const INCLUDE_SCSS_FOLDER = path.resolve(__dirname, './src');

const HTMLPlugin = new HtmlWebpackPlugin({
	template: './templates/index.hbs',
	file: './index.html',
	hash: false,
	chunksSortMode: 'none',
	// inlineSource: 'manifest~.+\\.js',
	HOME_URL: transforms.HOME_URL,
	TITLE: transforms.TITLE,
	DESCRIPTION: transforms.DESCRIPTION,
	KEYWORDS: transforms.KEYWORDS,
	AUTHOR: transforms.AUTHOR,
	AUTHOR_IMAGE: transforms.AUTHOR_IMAGE,
	TWITTER_USERNAME: transforms.TWITTER_USERNAME,
	GOOGLE_PROFILE: transforms.GOOGLE_PROFILE,
	GOOGLE_SITE_VERIFICATION: transforms.GOOGLE_SITE_VERIFICATION,
	GOOGLE_ANALYTICS_UA: transforms.GOOGLE_ANALYTICS_UA,
	GOOGLE_ANALYTICS_URL: transforms.GOOGLE_ANALYTICS_URL,
	FACEBOOK_APP_ID: transforms.FACEBOOK_APP_ID
});

const extractSCSSBundle = new MiniCssExtractPlugin({
	filename: '[name].[contenthash].css',
	chunkFilename: '[id].[contenthash].css'
});

const PRODUCTION_MODE = process.env.NODE_ENV === 'production';

const config = {};

config.entry = ['./src/index.jsx', './scss/styles.scss'];

config.optimization = {
	splitChunks: {
		cacheGroups: {
			commons: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendor',
				chunks: 'initial'
			}
		}
	},
	runtimeChunk: {
		name: 'manifest'
	},
	minimizer: [
		new UglifyJsPlugin({
			sourceMap: true,
			uglifyOptions: {
				ecma: 8,
				mangle: false,
				keep_classnames: true,
				keep_fnames: true
			}
		})
	]
};

config.plugins = [

	// list all React app required env variables
	new webpack.EnvironmentPlugin(['NODE_ENV', 'GOOGLE_APP_ID']),

	HTMLPlugin,

	// create css bundle
	extractSCSSBundle,

	// copy images
	new CopyWebpackPlugin([{ from: 'src/images', to: 'images' }], {
		debug: copyWebpackPluginOptions
	}),

	// copy static assets
	new CopyWebpackPlugin([{ from: 'static/sitemap.xml', to: '.' }], {
		debug: copyWebpackPluginOptions
	}),
	new CopyWebpackPlugin([{ from: 'static/google9104b904281bf3a3.html', to: '.' }], {
		debug: copyWebpackPluginOptions
	}),
	new CopyWebpackPlugin([{ from: 'static/robots.txt', to: '.' }], {
		debug: copyWebpackPluginOptions
	}),
	new CopyWebpackPlugin([{ from: 'static/favicon_package', to: '.' }], {
		debug: copyWebpackPluginOptions
	})
];

config.module = {
	rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.(sass|scss)$/,
			include: INCLUDE_SCSS_FOLDER,
			exclude: [SCSS_FOLDER, /node_modules/],
			use: ['style-loader', 'css-loader', 'sass-loader']
		},
		{
			test: /\.(sass|scss)$/,
			include: SCSS_FOLDER,
			exclude: [INCLUDE_SCSS_FOLDER, /node_modules/],
			use: [
				{
					loader: MiniCssExtractPlugin.loader
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						modules: true,
						localIdentName: '[local]___[hash:base64:5]'
					}
				},
				{
					loader: 'sass-loader'
				}
			]
		},
		{
			test: /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			// include: [FONTS_FOLDER, ICONS_FOLDER],
			include: [ICONS_FOLDER],
			loader: 'file-loader?name=assets/[name].[ext]'
		}
	]
};

config.resolve = {
	extensions: ['.js', '.jsx']
};

if (PRODUCTION_MODE) {
	config.output = {
		path: DIST_FOLDER,
		publicPath: '/',
		chunkFilename: '[name].[chunkhash].bundle.js',
		filename: '[name].[chunkhash].bundle.js'
	};
	config.mode = 'production';
	config.devtool = 'cheap-module-source-map';
}

if (!PRODUCTION_MODE) {
	config.output = {
		path: DIST_FOLDER,
		chunkFilename: '[name].bundle.js',
		filename: '[name].bundle.js'
	};

	config.mode = 'development';
	config.devtool = 'inline-source-map';

	config.devServer = {
		contentBase: DIST_FOLDER,
		compress: false,
		// inline: true,
		port: 8065,
		clientLogLevel: 'info',
		proxy: {
			'/api/**': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				secure: false
			}
		}
	};
}

module.exports = config;
```

#### config.optimization

This code splits the code into bundles

* vendor - node_modules
* manifest - describes what files webpack should load
* main - application code

Will also split into bundles code that is lazy loaded.

#### config.output

Note that production uses

```
chunkFilename: '[name].[chunkhash].bundle.js',
filename: '[name].[chunkhash].bundle.js'
```

which will generate a bundle with a different filename if the contents of the file have changed. This will ensure that cached files will not be referenced by the browser if a newer version is available. This is called Cache Busting.

Cache busting is not useful in development, thus

```
chunkFilename: '[name].bundle.js',
filename: '[name].bundle.js'
```

### html-webpack-plugin

This plugin interacts with the above optimizations. The bundles that have been created are added by the plugin to the `index.html`

```
<link href="/1.42284c7d3da4035df30b.css" rel="stylesheet"></head>

<body>
	<div id="root"></div>
<script type="text/javascript" src="/main.211380e843cdd5ab81b9.bundle.js"></script>
<script type="text/javascript" src="/vendor.348028e469699b4c4e1b.bundle.js"></script>
<script type="text/javascript" src="/manifest.87a618c1f83c717e6bdd.bundle.js"></script>
</body>

</html>
```

## Lazy Loading

Now the table is set to split up the application code and lazy load some parts of the application.

### Code Splitting by Routes

An obvious place to split up the code. The non-logged in user and member code are different so let's split them up.

#### Non Member including Home Page

All this code is in `HomeMain.jsx` and is only referenced from `routes/index.jsx`. The changes are straightforward.

Remove the direct reference

```
// import HomeMain from '../components/containers/HomeMain';
```

Add reference to `react-loadable`

```
import Loadable from 'react-loadable';
```

Add reference to a `Loading` component

```
import Loading from '../components/containers/Loading';
```

Create the `Loading` component

```
import React from 'react';
import PropTypes from 'prop-types';

const Loading = props => {
	const { pastDelay } = props;
	return <span>{pastDelay ? <h3>Loading...</h3> : null}</span>;
};

Loading.propTypes = {
	pastDelay: PropTypes.bool.isRequired
};

export default Loading;
```

Create an Async component `AsyncHomeMain` which will be invoked to lazy load `HomeMain`

```
const AsyncHomeMain = Loadable({
	loader: () => import('../components/containers/HomeMain'),
	loading: Loading,
	delay: 200,
	render(loaded, props) {
		const Component = loaded.default;
		return <Component {...props} />;
	}
});
```

Change all the routes from using `HomeMain` to `AsyncHomeMain`

For example

```
<Route exact path="/" render={props => <HomeMain datatype="home" {...props} />} />

<Route exact path="/join" render={props => <HomeMain datatype="register" {...props} />} />
```

becomes

```
<Route exact path="/" render={props => <AsyncHomeMain datatype="home" {...props} />} />

<Route exact path="/join" render={props => <AsyncHomeMain datatype="register" {...props} />} />
```

#### Member

All this code is in `MemberMain.jsx` and is only referenced from `routes/index.jsx`. The changes are straightforward.

The changes are essentially the same as for a non-member

Remove the direct reference

```
// import MemberMain from '../components/containers/MemberMain';
```

Create an Async component `AsyncMemberMain` which will be invoked to lazy load `MemberMain`

```
const AsyncMemberMain = Loadable({
	loader: () => import('../components/containers/MemberMain'),
	loading: Loading,
	delay: 200,
	render(loaded, props) {
		console.log('--- AsyncMemberMain::render(); loaded ', loaded, ' props ', props);
		console.log(' loaded.default ', loaded.default);
		const Component = loaded.default;
		return <Component {...props} />;
	}
});

```

Change all the routes from using `MemberMain` to `AsyncMemberMain`

For example

```
<PrivateRoute permission="free" path="/starred" render={props => <MemberMain datatype="starred" {...props} />} />

<PrivateRoute
	permission="free"
	path="/calendar/:param"
	render={props => <MemberMain datatype="calendar" {...props} />}
/>

<PrivateRoute permission="free" path="/goals" render={props => <MemberMain datatype="goals" {...props} />} />

<PrivateRoute
	permission="free"
	path="/projects"
	render={props => <MemberMain datatype="projects" {...props} />}
/>
```

becomes

```
<PrivateRoute
	permission="free"
	path="/starred"
	render={props => <AsyncMemberMain datatype="starred" {...props} />}
/>

<PrivateRoute
	permission="free"
	path="/calendar/:param"
	render={props => <AsyncMemberMain datatype="calendar" {...props} />}
/>

<PrivateRoute permission="free" path="/goals" render={props => <AsyncMemberMain datatype="goals" {...props} />} />

<PrivateRoute
	permission="free"
	path="/projects"
	render={props => <AsyncMemberMain datatype="projects" {...props} />}
/>
```

### Code Splitting by Component

The calendar uses the 3rd party calendar component `react-big-calendar` which itself is quite large. As the calendar is separate and only invoked in one place (in the member section code), it is an obvious candidate for code splitting and lazy loading.

The code is very similar to the above.

`MemberMain.jsx`

```
import Loadable from 'react-loadable';

// import ViewCalendar from '../calendar/ViewCalendar';

const AsyncCalendar = Loadable({
	loader: () => import('../calendar/ViewCalendar'),
	loading: Loading,
	delay: 200
});
```

and

```
renderCalendar() {
	const { goals } = this.props;
	const { param } = this.props.match.params;
	return <ViewCalendar events={events} onEventDrop={this.onCalendarEventDrop} />;
}
```

becomes

```
renderCalendar() {
	const { goals } = this.props;
	const { param } = this.props.match.params;
	return <AsyncCalendar events={events} onEventDrop={this.onCalendarEventDrop} />;
}
```
	
	
