---
meta-title: "Webpack Bundle Analyzer | John Vincent"
meta-description: "John Vincent's discussion on Webpack Bundle Analyzer"
meta-keywords: "Webpack, Bundle Analyzer"

title: "Webpack Bundle Analyzer"
subtitle: "Using Webpack Bundle Analyzer"
lead: ""

category: [Webpack, React, Code splitting]
permalink: /react/webpack-bundle-analyzer/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# Webpack Bundle Analyzer

[Webpack Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

### Install

```
npm i --save-dev webpack-bundle-analyzer
```

### Usage

Add to package.json scripts

```
"statistics": "webpack --mode development --profile --json > statistics.json && webpack-bundle-analyzer statistics.json dist"

"production-statistics": "rm -rf dist && NODE_ENV=production webpack --mode production --profile --json > production-statistics.json && webpack-bundle-analyzer production-statistics.json dist",
```

which creates files `statistics.json` for development mode and `production-statistics.json` for production mode. These files are used to create the analysis in a separate browser window.

These files can be very large. Thus add them to .gitignore


## Webpack Visualizer

Open in a browser

```
https://chrisbateman.github.io/webpack-visualizer/
```

Drag and drop the statistics json file and a graph will be produced showing usage by module.

## Webpack Analyzer

Open in a browser

```
https://webpack.github.io/analyse/
```

Load the statistics json file and the analysis is performed.

