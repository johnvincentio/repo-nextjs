---
meta-title: "Update TaskMuncher to be a Progressive Web App | John Vincent"
meta-description: "John Vincent's Update TaskMuncher to be a Progressive Web App"
meta-keywords: "Taskmuncher, React, Webpack, PWA"

title: "Update TaskMuncher to be a Progressive Web App"
subtitle: ""
lead: ""

category: [Taskmuncher, React, Webpack, Pwa]
permalink: /taskmuncher/update-taskmuncher-v4/
---

Let's discuss updating TaskMuncher to be a Progressive Web App

<!-- end -->

# TaskMuncher v4

For extensive discussions regarding TaskMuncher, please see [TaskMuncher Overview](/taskmuncher/overview/)

My efforts have built on [How to Make Your Existing React App Progressive in 10 Minutes](https://scotch.io/tutorials/how-to-make-your-existing-react-app-progressive-in-10-minutes)

Somewhat useful is [Progressive Web Apps with React.js](https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c)

Lighthouse Scores after the work is complete

```
www.taskmuncher.com

93: Performance
100: Accessibility
100: Best Practices
100: SEO
```

Progressive Web App passes all checks.

<b>TaskMuncher is a Progressive Web App</b>

## TaskMuncher V2 Lighthouse Scores

Previously for TaskMuncher V2, Lighthouse scores were

```
www.taskmuncher.com

93: Performance
62: Progressive Web App
100: Accessibility
100: Best Practices
100: SEO
```

Current scores are

```
www.taskmuncher.com

93: Performance
100: Accessibility
100: Best Practices
100: SEO
none: Progressive Web App
```

The tool has clearly changed so let's investigate.

## Running Lighthouse in Development

Add to `scripts` section of `package.json`

```
"serve": "serve -l 8065 dist",
"serve-help": "serve --help",
```

where 8065 is the port on which I wish to serve the content.

The reason for this is to ensure the same port is used for development mode and for production mode testing in a development environment.

To run Lighthouse on Development version

```
npm run production
npm run serve
```

thus to run, use Incognito mode

```
http://localhost:8065
```

To allow Lighthouse to work in Incognito mode, see [Website Validation Reference](/website/website-validation/)

## Lighthouse Score

Let's get a starting score for Progressive Web App from Lighthouse. 

The only score of any interest for this exercise is Progressive Web App which is indeed none.

The list of improvements

```
1. Current page does not respond with a 200 when offline

2. start_url does not respond with a 200 when offline

3. Does not register a service worker that controls page and start_url

4. Does not provide fallback content when JavaScript is not available
```

## Add NoScript tag

Add to `template/index.hbs`

```
<noscript>Your browser does not support JavaScript!</noscript>
```

This fixes #4

## Service Worker

The other entries can all be solved with a service worker and manifest file.

A service worker is a script your browser runs in the background that PWAs use for offline experience and periodic sync. To run our app in an offline environment, we need to cache its static assets and find a solution to check the network status and updates periodically.

What do we have to do to integrate a service worker in our React app?

* create a service worker
* Register service worker within the app

TaskMuncher is using webpack to bundle our assets, and we all know it is an amazing tool. In few lines of code and thanks to loaders and plugins, we can create chunks, hash them, extract CSS, images, fonts and so on. This, though, may lead to some difficulties as the service worker usually requires the list of static assets and good practices like hashing the bundles make them hard to be easily tracked.

`webpack-manifest-plugin` is the solution to our problem as it comes in handy to create a JSON file with the listed assets webpack created at bundle time. Besides, the file is conveniently created in the `/dist` folder of our app along with the static assets.

### Add webpack-manifest-plugin

```
npm i webpack-manifest-plugin --save-dev
```

Edit `webpack.config.js` and add

```
const WebpackManifestPlugin = require('webpack-manifest-plugin');
```

and refactor plugins to 

```
const plugins = [

...

];
```

This allows for production plugins to extend development plugins.

```
if (PRODUCTION_MODE) {
	config.plugins = [
		...plugins,
		new WebpackManifestPlugin({
			fileName: 'asset-manifest.json' // manifest of static assets
		})
	];
}

if (!PRODUCTION_MODE) {
	config.plugins = [...plugins];
}
```

```
npm run production
npm run serve
```

New file `dist/asset-manifest.json` is created which lists all the static assets.

### Add sw-precache-webpack-plugin

```
npm i sw-precache-webpack-plugin --save-dev
```

Edit `webpack.config.js` and add

```
const SWPreCacheWebpackPlugin = require('sw-precache-webpack-plugin');
```

Add to plugins

```
if (PRODUCTION_MODE) {
	config.plugins = [
		...plugins,
		new WebpackManifestPlugin({
			fileName: 'asset-manifest.json' // manifest of static assets
		}),
		new SWPreCacheWebpackPlugin({
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			filename: 'service-worker.js',
			logger(message) {
				if (message.indexOf('Total precache size is') === 0) {
					return;
				}
				console.log(message);
			},
			minify: true,
			navigateFallback: '/index.html',
			staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
		})
	];
}

if (!PRODUCTION_MODE) {
	config.plugins = [...plugins];
}
```

### Test

```
npm run production
npm run serve
```

Run Chrome DevTools

* Application
* Service Workers

should show no service workers.

## Create a Service Worker

Will need a service worker, so may as well start with one that works.

### Use create-react-app

[Create React App](https://facebook.github.io/create-react-app/)

```
npx create-react-app my-app

cd my-app
yarn start
```

which opens a chrome browser tab at `http://localhost:3000/`

Notice 'index.js'

```
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
```

Notice `serviceWorker.js`. Copy this to TaskMuncher project at `src/serviceWorker.js`

## TaskMuncher Service Worker

TaskMuncher already uses `HOME_URL`, thus

`serviceWorker.js`, change `PUBLIC_URL` to `HOME_URL`

`index.jsx`

```
import { register } from './serviceWorker';
```

After `ReactDOM.render` add

```
register();
```

`webpack.config.js`

```
new webpack.EnvironmentPlugin(['HOME_URL', 'NODE_ENV', 'GOOGLE_APP_ID']),
```

### Test

```
npm run production
npm run serve
```

From browser, url is `HOME_URL`

See DevTools Console

```
Content is cached for offline use.
This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA
```

Chrome DevTools

* Application
* Service Workers

shows a service worker.

Chrome DevTools

* Application
* Cache
	* Cache Storage

shows string beginning with `sw-precache-v3-sw-precache-webpack-plugin-` which as contains the files that been cached.

## Development

Must verify the service worker does not operate in development mode.

In development mode, `webpack.config.js` does not load the service worker plugins.

### Let's verify

Chrome DevTools

* Application
* Service Workers
	* Stop

* Application
* Clear Storage
	* Ensure all flags are checked
	* Clear site data

```
npm start
```

Run the app `http://localhost:8065` 

Chrome DevTools

* Application
* Service Workers
	* Shows no service workers

## Production

Deploy to production and verify.

```
www.taskmuncher.com
```

### Chrome DevTools

Console - shows files being retrieved for caching by the service worker.

Application, Service Workers - shows 

```
www.taskmuncher.com

Source: service-worker.js

Status: Activated and is running

Clients: https://www.taskmuncher.com
```

Application, Cache, Cache Storage - shjows files that are cached.

### Run Lighthouse on Production

```
www.taskmuncher.com

80: Performance
100: Accessibility
100: Best Practices
100: SEO
```

Progressive Web App passes all checks.

Chrome Incognito, generate Lighthouse report.

```
www.taskmuncher.com

93: Performance
100: Accessibility
100: Best Practices
100: SEO
```

Progressive Web App passes all checks.


## Testing Service Worker Update in Production

Having made some code changes to the application, the application deployed to production is different from the production system that existed when the service worker populated its cache.

Refresh page. The service worker gets the updated files.

```
service-worker.js:1 Fetch finished loading: GET "https://www.taskmuncher.com/2.4105faa029aaa23fe0c6.bundle.js?_sw-precache=4003fb10c86202834757ec3cd5b1f250".

service-worker.js:1 Fetch finished loading: GET "https://www.taskmuncher.com/index.html?_sw-precache=b91d883824d2c803f24fd35629463f3b".

service-worker.js:1 Fetch finished loading: GET "https://www.taskmuncher.com/main.39313438a74c46ef2264.bundle.js?_sw-precache=0acbeb5cbe1d40d4ef9437105bb36085".

service-worker.js:1 Fetch finished loading: GET "https://www.taskmuncher.com/manifest.dbacb6eeb3714995f023.bundle.js?_sw-precache=553a87f2eff93c7a51f714e32ba65b9e".

service-worker.js:1 Fetch finished loading: GET "https://www.taskmuncher.com/3.9227b9aadbc36850ac16.bundle.js?_sw-precache=3fc5c4d3bb6e0b465743acea26787ae9".

main.dcfb6f1288fa376f3843.bundle.js?_sw-precache=2dbdf510f3ccb3516714ca1f140f827d:1

New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA.
```

Network tab shows a number of files were retrieved by the service worker.

Application content is still the old content.

Refresh again and the new content appears.

# Complete