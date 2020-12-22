---

meta-title: "Webpack Transform Html | John Vincent"
meta-description: "Transforming Html with Webpack"
meta-keywords: "React, Webpack"

title: "Transforming Html with Webpack"
subtitle: "Templating Html for easy re-use"
lead: "How to Transform Html with Webpack"

category: [React, Webpack]
permalink: /react/webpack-transform-html/
---

Html often contains data that should be injected from the environment.

The following describes a solution.

<!-- end -->

# General

[Webpack](https://webpack.js.org/)

[CopyWebpackPlugin](https://www.npmjs.com/package/copy-webpack-plugin)

[React/Redux/Node/Express Ecosystem](/react/react-redux-node-express-ecosystem/)

Specifically, I needed this for React applications. The `index.html` file is static and needs to be for SEO but is basically the same for all applications except the application specific data.

Also, in practice, the data for the `index.html` file will become known as the application development progresses. 

Further, this data is also often different for Development and Production environments. Multiple versions of Html files is trouble waiting to happen, so let's resolve this.


## Requirements

* Html as a template
* Data in template can be replaced
* Replacement data should be stored in the environment
* Transformed Html should be copied to destination.

## Template

This mechanism can be used for any file. For this example, I only use `index.ejs`, which will be transformed to `index.html`

`templates/index.ejs`

```
<!DOCTYPE html>
<html>

<head>
	<title>{{data.TITLE}}</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="{{ data.DESCRIPTION }}">
	<meta name="keywords" content="{{ data.KEYWORDS }}">

	<meta name="google-site-verification" content="{{ data.GOOGLE_SITE_VERIFICATION }}" />

	<meta name="author" content="{{ data.AUTHOR }}">
	<link rel="author" href="{{ data.GOOGLE_PROFILE }}" />

	<meta property="fb:app_id" content="{{ data.FACEBOOK_APP_ID }}">

	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="{{ data.TITLE }}" />
	<meta property="og:description" content="{{ data.DESCRIPTION}}" />

	<meta property="og:url" content="{{ data.HOME_URL }}">
	<meta property="og:image" content="{{ data.HOME_URL }}/{{ data.AUTHOR_IMAGE }}">
	<meta property="og:image:alt" content="{{ data.AUTHOR }}">
	<meta property="og:image:width" content="449" />
	<meta property="og:image:height" content="449" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{{ data.TITLE }}" />
	<meta name="twitter:description" content="{{ data.DESCRIPTION }}" />
	<meta name="twitter:site" content="{{ data.TWITTER_USERNAME }}" />
	<meta name="twitter:image" content="{{ data.HOME_URL }}/{{ data.AUTHOR_IMAGE }}" />
	<meta name="twitter:creator " content="{{ data.TWITTER_USERNAME }}" />

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2196f3">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="theme-color" content="#ffffff">

	<!-- Google authentication -->
	<script src="https://apis.google.com/js/platform.js?onload=onLoadCallback" async defer></script>
	<script>
		var gapiPromise = (function () {
			return new Promise(function (resolve, reject) {
				window.onLoadCallback = function () {
					resolve();
				};
			});
		}());
		window.app = window.app || {};
		window.app.gapiPromise = gapiPromise;
	</script>

	<!-- Google Analytics -->
	<script>
		(function (i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date(); a = s.createElement(o),
				m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '{{ data.GOOGLE_ANALYTICS_URL }}', 'ga');

		ga('create', '{{ data.GOOGLE_ANALYTICS_UA }}', 'auto');
		ga('send', 'pageview');
	</script>
	<!-- End Google Analytics -->

	<!-- Fonts -->
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

	<!-- Css -->
	<link rel="stylesheet" href="./main.bundle.css">
</head>

<body>
	<div id="root"></div>
	<script src="./bundle.js"></script>
</body>

</html>
```

Notice that substitution variables are prefixed with 'data'

### Environment

Data is placed in `.env`


## Webpack Configuration

Snippet of `webpack.config.js`

```
...

const CopyWebpackPlugin = require('copy-webpack-plugin');

const transformTemplate = require('./transformTemplate');

const transforms = require('./transforms');

...

plugins: [
	// transform template to index.html with env variables
	new CopyWebpackPlugin(
		[
			{
				from: './templates/index.hbs',
				to: './index.html',
				transform(content, pathname) {
					return transformTemplate(content, pathname, transforms);
				}
			}
		],
		{ debug: 'info' }
	),
...	

```

The key here is to use the transform function of CopyWebpackPlugin

The content is transformed by `transformTemplate`

`transformTemplate.js`

```
//

/* eslint-disable import/no-extraneous-dependencies */

const _ = require('underscore');

function transformTemplate(content, path2, data) {
	const layout = content.toString('utf8'); // convert Buffer to string

	// prefer handlebars substitution
	_.templateSettings = {
		interpolate: /\{\{(.+?)\}\}/g
	};

	// prefer to use a prefix
	const compiled = _.template(layout, { variable: 'data' });
	const str = compiled(data); // apply the variables
	return Buffer.from(str); // convert string to Buffer
}

module.exports = transformTemplate;
```

which requires transforms as a parameter.

`transforms.js`

```
require('dotenv').config();	// read .env

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

This technique allows for the transformation of any number of files.






