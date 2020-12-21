---
meta-title: "Update TaskMuncher to Webpack v4, Babel v7, Material-UI v3 | John Vincent"
meta-description: "John Vincent's Update TaskMuncher to Webpack 4, Babel 7, Material-UI 3"
meta-keywords: "Taskmuncher, React, Webpack"

title: "Update TaskMuncher to Webpack v4, Babel v7, Material-UI v3"
subtitle: ""
lead: ""

category: [Taskmuncher, React, Webpack]
permalink: /taskmuncher/update-taskmuncher-v2/
---

Let's discuss updating TaskMuncher to use Webpack 4, Babel 7 and Material-UI 3

<!-- end -->

# TaskMuncher v2

For extensive discussions regarding TaskMuncher, please see [TaskMuncher Overview](/taskmuncher/overview/)

Also helpful is [Optimizing TaskMuncher](/taskmuncher/optimize-taskmuncher/)

[Babel packages](https://github.com/babel/babel)

## Install Updated Packages

```
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev @babel/core babel-loader 
npm install --save-dev @babel/preset-env @babel/preset-react

npm install --save react react-dom

npm install --save-dev @babel/plugin-proposal-object-rest-spread
npm install --save-dev @babel/plugin-proposal-class-properties

npm install --save-dev copy-webpack-plugin

npm i --save-dev mini-css-extract-plugin

npm i --save-dev underscore

npm i --save dotenv

npm i --save-dev css-loader
npm i --save-dev file-loader

npm i --save moment
npm i --save material-ui-pickers

npm i react-big-calendar --save

npm i --save react-dnd

npm i --save classnames isomorphic-fetch prop-types

npm i --save react-redux react-responsive react-router-dom 

npm i --save redux redux-devtools redux-devtools-dock-monitor redux-devtools-log-monitor

npm i --save redux-logger redux-thunk 

npm i --save styled-components

npm i --save react-tag-input
npm i --save react-dnd-html5-backend

npm i --save @material-ui/core @material-ui/icons

npm i --save-dev sass-loader

npm i --save-dev style-loader

npm i --save-dev node-sass

npm i --save-dev html-webpack-plugin

npm i --save-dev eslint eslint-config-airbnb eslint-config-prettier eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

npm i --save-dev babel-eslint

npm i --save-dev webpack-bundle-analyzer

npm i --save-dev serve

npm i react-loadable --save
npm i @babel/plugin-syntax-dynamic-import --save-dev
```

Creates package.json

```
{
  "name": "taskmuncher-updated-client",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test-help": "jest --help",
    "test": "jest",
    "mocha-test": "mocha --recursive --compilers js:babel-register test/**/*.js",
    "start": "webpack-dev-server --hot --inline --mode development",
    "dev": "webpack --mode development --progress",
    "help": "webpack --help",
    "build": "webpack --mode production --progress",
    "production": "rm -rf dist && NODE_ENV=production npm run build",
    "statistics": "webpack --mode development --profile --json > statistics.json && webpack-bundle-analyzer statistics.json dist",
    "production-statistics": "rm -rf dist && NODE_ENV=production webpack --mode production --profile --json > production-statistics.json && webpack-bundle-analyzer production-statistics.json dist",
    "serve": "serve dist",
    "eslint_versions": "npm info eslint-config-airbnb@latest peerDependencies"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.1.2",
    "@babel/plugin-proposal-class-properties": "^7.1.0",
    "@babel/plugin-proposal-object-rest-spread": "^7.0.0",
    "@babel/plugin-syntax-dynamic-import": "^7.0.0",
    "@babel/preset-env": "^7.1.0",
    "@babel/preset-react": "^7.0.0",
    "babel-eslint": "^10.0.1",
    "babel-loader": "^8.0.4",
    "clean-webpack-plugin": "^0.1.19",
    "copy-webpack-plugin": "^4.5.3",
    "css-loader": "^1.0.0",
    "eslint": "^5.3.0",
    "eslint-config-airbnb": "^17.1.0",
    "eslint-config-prettier": "^3.1.0",
    "eslint-loader": "^2.1.1",
    "eslint-plugin-import": "^2.14.0",
    "eslint-plugin-jsx-a11y": "^6.1.1",
    "eslint-plugin-react": "^7.11.0",
    "file-loader": "^2.0.0",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.4.4",
    "node-sass": "^4.9.4",
    "sass-loader": "^7.1.0",
    "serve": "^10.0.2",
    "style-loader": "^0.23.1",
    "uglifyjs-webpack-plugin": "^2.0.1",
    "underscore": "^1.9.1",
    "webpack": "^4.20.2",
    "webpack-bundle-analyzer": "^3.0.3",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.9"
  },
  "dependencies": {
    "@material-ui/core": "^3.2.2",
    "@material-ui/icons": "^3.0.1",
    "classnames": "^2.2.6",
    "dotenv": "^6.1.0",
    "isomorphic-fetch": "^2.2.1",
    "material-ui-pickers": "^1.0.0-rc.17",
    "moment": "^2.22.2",
    "prop-types": "^15.6.2",
    "react": "^16.5.2",
    "react-big-calendar": "^0.20.1",
    "react-dnd": "^5.0.0",
    "react-dnd-html5-backend": "^5.0.1",
    "react-dom": "^16.5.2",
    "react-loadable": "^5.5.0",
    "react-redux": "^5.0.7",
    "react-responsive": "^5.0.0",
    "react-router-dom": "^4.3.1",
    "react-tag-input": "^5.2.3",
    "redux": "^4.0.1",
    "redux-devtools": "^3.4.1",
    "redux-devtools-dock-monitor": "^1.1.3",
    "redux-devtools-log-monitor": "^1.4.0",
    "redux-logger": "^3.0.6",
    "redux-thunk": "^2.3.0",
    "styled-components": "^4.0.0"
  }
}
```

## Update Babel

.babelrc

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




## ESLint

`.eslintrc.json`

```
{
  "extends": ["airbnb", "prettier", "prettier/react"],
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
        "code": 120,
        "tabWidth": 2,
        "comments": 120,
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
    ],
    "react/destructuring-assignment": ["off", "always"]
  },
  "plugins": ["react", "jsx-a11y", "import"]
}
```

### ESlint Errors

```
import * as actions from '../../redux/actions/';
```

changed to 

```
import * as actions from '../../redux/actions';
```

```
import { TaskCard } from './';
```

changed to

```
import { TaskCard } from '.';
```

## react-tag-input

The library changed requiring changes

`tasks/TaskDialog.jsx`

```
handleTagAddition(tag) {
	this.setState(state => ({ workingTags: [...state.workingTags, tag] }));
	}
```

`utilities/tagUtilities.js`

```
export function createTagSuggestionsList(taskTags, goals) {
	const allTags = uniqueTagsFromGoals(goals);
	const arr = [];
	allTags.forEach(allTag => {
		if (taskTags.findIndex(item => item.text.toLowerCase() === allTag.toLowerCase()) === -1) {
			arr.push({ id: allTag, text: allTag });
		}
	});
	return arr;
}
```

where the change is

```
arr.push({ id: allTag, text: allTag });
```

## react-big-calendar

Initialization of `moment` library has changed.

Changed

```
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
```

to

```
const localizer = BigCalendar.momentLocalizer(moment);
```

and added `localizer` as a paramater to component `DragAndDropCalendar`

```
<DragAndDropCalendar
	localizer={localizer}
	views={views}
	...
```

## Material-UI

### IconButton

Updated theme `themes/themes.js`

```
const baseTheme = createMuiTheme({
	overrides: {
		MuiIconButton: {
			root: {
				padding: 0
			}
		}
	},
```

which overrides the padding of the button containing the icon.

### Button change

Error is

```
checkPropTypes.js:19 Warning: Failed prop type: The `raised` variant will be removed in the next major release. `contained` is equivalent and should be used instead.
```

Problem is caused by Button variant change from raised to contained

For example, from `Contact.jsx`

```
<Button
	className={classnames(classes.button, classes.submitButton)}
	color="primary"
	variant="contained"
	type="submit"
>
	{'Send Message'}
</Button>
```

### Text Change

```
<Button
	className={classnames(classes.button, classes.submitButton)}
	color="primary"
	variant="contained"
	type="submit"
>
	{'Send Message'}
</Button>
```

from

```
	Send Message
```

### Replace Removed Icons

Changed:

```
import EditIcon from '@material-ui/icons/ModeEdit';
import CloneIcon from '@material-ui/icons/ContentCopy';
```

to:

```
import EditIcon from '@material-ui/icons/Edit';
import CloneIcon from '@material-ui/icons/FileCopy';
```

### Typography Migration

[Typography Migration](https://material-ui.com/style/typography/#migration-to-typography-v2)

Updated theme `themes/themes.js`

```
const baseTheme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
```

which forces the use of the latest variants.

The migration of variants is listed below

```
display4 => h1
display3 => h2
display2 => h3
display1 => h4
headline => h5
title => h6
subheading => subtitle1
body2 => body1
body1 (default) => body2 (default)
```

### Card

Parameter changed from `raised` to `contained="true"`


## html-webpack-plugin

This plugin has been improved and can now be used directly (as intended).

webconfig.config.js

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const transforms = require('./transforms');

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
```

index.hbs needed some changes to reference the options. For example

```
<meta name="description" content="<%= htmlWebpackPlugin.options.DESCRIPTION %>" />
```

transforms.js

```
require('dotenv').config();

function getEnv(name) {
	return process.env[name];
}

const transforms = {
	HOME_URL: getEnv('HOME_URL'),

	TITLE: getEnv('TITLE'),
	DESCRIPTION: getEnv('DESCRIPTION'),
	KEYWORDS: getEnv('KEYWORDS'),

	AUTHOR: getEnv('AUTHOR'),
	AUTHOR_IMAGE: getEnv('AUTHOR_IMAGE'),

	TWITTER_USERNAME: getEnv('TWITTER_USERNAME'),

	GOOGLE_PROFILE: getEnv('GOOGLE_PROFILE'),
	GOOGLE_SITE_VERIFICATION: getEnv('GOOGLE_SITE_VERIFICATION'),
	GOOGLE_APP_ID: getEnv('GOOGLE_APP_ID'),

	GOOGLE_ANALYTICS_UA: getEnv('GOOGLE_ANALYTICS_UA'),
	GOOGLE_ANALYTICS_URL: getEnv('GOOGLE_ANALYTICS_URL'),

	FACEBOOK_APP_ID: getEnv('FACEBOOK_APP_ID')
};

module.exports = transforms;
```

which allows for keeping application values in the environment, allowing development and production versions to use the identical code base.

## mini-css-extract-plugin

`extract-text-webpack-plugin` does not work with webpack 4. Use `mini-css-extract-plugin` instead.

webpack.config.js

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

...

const extractSCSSBundle = new MiniCssExtractPlugin({
	filename: '[name].[contenthash].css',
	chunkFilename: '[id].[contenthash].css'
});

...

config.plugins = [
...
	extractSCSSBundle,

];

config.module = {
	rules: [
...
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
...
	]
};

```


