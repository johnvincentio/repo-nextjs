---

meta-title: "React, Material-UI and Sass | John Vincent"
meta-description: "Configuring React, Material-UI and Sass"
meta-keywords: "React, Material-UI"

title: "React Material-UI "
subtitle: "Configuring React, Material-UI and Sass"
lead: ""

category: [React, Material-UI]
permalink: /material-ui/react-material-ui/
---

This article describes how to configure React with Material-UI and Sass.

<!-- end -->

# General

[Material-UI](https://material-ui-next.com/)

# Installation

I am working with the next version of Material-UI

Install Material-UI

```
npm install --save material-ui@next
npm install --save material-ui-icons@next
```

or, more specifically

```
npm install --save material-ui@1.0.0-beta.37
npm install --save material-ui-icons@1.0.0-beta.36
```

Material-UI encourages the use of some non-standard language features. Install these

```
npm install babel-plugin-transform-class-properties --save-dev
npm install babel-plugin-transform-object-rest-spread --save-dev
```

Update `.babelrc`

```
{
"presets": ["env", "react"],
"plugins": ["transform-object-rest-spread", "transform-class-properties"]
}
```

Update `.eslintrc`

```
{
	"extends": ["airbnb", "prettier"],
	"env": {
		"browser": true
	},
	"parser": "babel-eslint",
	"globals": {},
	"rules": {
		"no-console": 0,
		"max-len": [
			"error",
			{
				"code": 100,
				"tabWidth": 2,
				"comments": 100,
				"ignoreTrailingComments": true,
				"ignoreUrls": true,
				"ignorePattern": "^import\\s.+\\sfrom\\s.+;$"
			}
		],
		"indent": [2, "tab", { "SwitchCase": 1 }],
		"no-tabs": 0,
		"react/jsx-indent": ["off", 2],
		"react/jsx-indent-props": ["off", 2],
		"jsx-a11y/anchor-is-valid": [
			"error",
			{
				"components": ["Link"],
				"specialLink": ["to"]
			}
		]
	},
	"plugins": ["react", "jsx-a11y", "import"]
}
```

The advanced language features required the use of the babel-eslint parser.

```
npm install babel-eslint --save-dev
```

Update `webpack.config.js`

```
const webpack = require('webpack');
const path = require('path');

const APP_FOLDER = path.resolve(__dirname, './src');
const SCSS_FOLDER = path.resolve(__dirname, './scss');
const ASSETS_FOLDER = path.resolve(__dirname, './src/assets');
const DIST_FOLDER = path.resolve(APP_FOLDER, './dist');
// const DIST_FOLDER_STYLE = path.resolve(DIST_FOLDER, './css');

const INCLUDE_SCSS_FOLDER = path.resolve(__dirname, './src');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSCSSBundle = new ExtractTextPlugin({
	filename: '[name].bundle.css',
	allChunks: true
});

require('dotenv').config(); // load from .env file

const config = {
	// entry: ['./src/index.jsx', './src/scss/index.scss', './src/components/main.scss'],
	entry: ['./src/index.jsx', './scss/index.scss'],

	output: {
		path: DIST_FOLDER,
		filename: 'bundle.js'
	},

	devtool: 'inline-source-map', // development
	// devtool: 'eval-source-map',		// development
	//	devtool: 'source-map',	// production
	devServer: {
		contentBase: DIST_FOLDER,
		compress: false, // true
		// inline: true,
		port: 8045,
		clientLogLevel: 'info',
		proxy: {
			'/api/**': { target: 'http://localhost:3001', changeOrigin: true, secure: false }
		}
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			// {
			// 	// regular css files
			// 	test: /\.css$/,
			// 	loader: extractCSS.extract({
			// 		fallback: 'style-loader/url!file-loader',
			// 		use: ['css-loader'],
			// 		publicPath: DIST_FOLDER_STYLE
			// 	})
			// },

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
				loader: extractSCSSBundle.extract(['css-loader', 'sass-loader'])
			},
			{
				test: /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				include: ASSETS_FOLDER,
				loader: 'file-loader?name=assets/[name].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new webpack.EnvironmentPlugin(['NODE_ENV', 'API_KEY']),
		extractSCSSBundle,
		new CopyWebpackPlugin([{ from: 'index.html', to: '.' }], { debug: 'info' })
	]
};

module.exports = config;
```

Notice there are 2 Sass sections. 

* The Sass code that is to bundled into `styles.css` is in `./scss`. This code is compiled, loaded and bundled using `extractSCSSBundle`
* The Sass code that is to be injected as styles into a React component is in the `./src` folder. The Sass code is expected to be alongside the component that imports it. This code is compiled, loaded and injected with style-loader into the JavaScript.

# Basic Configuration

The usual entry point, `index.jsx`

```
import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router } from 'react-router-dom';

import { MuiThemeProvider } from 'material-ui/styles';

import { baseTheme } from './themes/theme';

import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<MuiThemeProvider theme={baseTheme}>
			<Router>
				<Root store={store} />
			</Router>
		</MuiThemeProvider>,
		document.getElementById('root')
	);
});
```

Uses `baseTheme`

```
import { createMuiTheme } from 'material-ui/styles';

import purple from 'material-ui/colors/purple';
import blue from 'material-ui/colors/blue';
import cyan from 'material-ui/colors/cyan';

export const baseTheme = createMuiTheme({
	palette: {
		primary: { main: blue[500] },
		secondary: { main: cyan[500] }
	},
	typography: {
...
	}
});
```

## Sass Injection

Component Scss

```
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';

import './scss.scss';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff'
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000'
		}
	}
});

const Scss = () => (
	<MuiThemeProvider theme={theme}>
		<Button color="primary">Primary Button</Button>
		<Button color="secondary">Secondary Button</Button>
		<br />
		<Button classes={ { root: 'main' } }>button, classes root: main, injected</Button>
		<Button classes={ { root: 'jv2' } }>button, classes root: jv2, injected</Button>
		<div className="alphabetagamma">div, class alphabetagamma, from bundle</div>
		<div className="delta">div, class delta, from bundle</div>
		<div className="main">div, class main, injected</div>
	</MuiThemeProvider>
);

export default Scss;
```

The Sass to inject, `./scss.scss`

```
.main {
  background-color: red !important;
  width: 150px;
  height: 160px;
}

.jv2 {
  background-color: brown !important;
  width: 250px;
  height: 260px;
}
```

Notice the use of !important to override the Material-UI choice of color.

Breaking this down.

```
<MuiThemeProvider theme={theme}>
```

loaded the theme.

```
<Button color="primary">Primary Button</Button>
<Button color="secondary">Secondary Button</Button>
```

use this theme.

```
<Button classes={ { root: 'main' } }>button, classes root: main, injected</Button>
<Button classes={ { root: 'jv2' } }>button, classes root: jv2, injected</Button>
```

instructs the Material-UI Button component to use classes defined in `scss.scss`

```
<div className="main">div, class main, injected</div>
```

instructs the div to use class "main", which is defined in `scss.scss`

```
<div className="alphabetagamma">div, class alphabetagamma, from bundle</div>
<div className="delta">div, class delta, from bundle</div>
```

refer to classes that are defined in the scss bundle, for example

`index.scss`

```
@import 'test';
```

`_test.scss`

```
.alphabetagamma {
  width: 300px;
  height: 300px;
  background-color: green;
}

.delta {
  width: 200px;
  height: 200px;
  background-color: yellow;
}
```

