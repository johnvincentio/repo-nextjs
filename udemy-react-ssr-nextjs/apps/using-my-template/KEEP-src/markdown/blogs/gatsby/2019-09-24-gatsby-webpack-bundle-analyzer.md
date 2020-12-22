---
meta-title: "Gatsby Webpack Bundle Analyzer| John Vincent"
meta-description: "John Vincent's discussion on Gatsby Webpack Bundle Analyzer"
meta-keywords: "Gatsby, Webpack, Bundle Analyzer"

title: "Gatsby Webpack Bundle Analyzer"
subtitle: "Using Webpack Bundle Analyzer"
lead: ""

category: [Gatsby, Webpack]
permalink: /gatsby/webpack-bundle-analyzer/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Gatsby Webpack Bundle Analyzer

[gatsby-plugin-webpack-bundle-analyser-v2](https://www.gatsbyjs.org/packages/gatsby-plugin-webpack-bundle-analyser-v2/)

[Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

[Plugin options](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin)

## Install

```
npm i --save-dev gatsby-plugin-webpack-bundle-analyser-v2
```

Using the plugin `gatsby-plugin-webpack-bundle-analyser-v2`, add to `gatsby-config.js`

```
{
	resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
	options: {
		analyzerMode: `server`,
		analyzerPort: `8888`,
	},
},
```

Run the production build

```
npm run build
```

View the report

```
http://127.0.0.1:8888/
```

## Other Options

```
analyzerHost: "http://myhost.com",
devMode: true,
disable: true
```

as plugin:

* is disabled in `dev mode` by default
* should be disabled with `disable: true` for real production.
