---
meta-title: "React/Redux Node/Express Ecosystem | John Vincent"
meta-description: "React/Redux Node/Express Ecosystem"
meta-keywords: "React, Redux, Node, Express"

title: "React/Redux Node/Express Ecosystem"
subtitle: "Basic techniques for building the ecosystem"
lead: ""

category: [React, Redux, Node, Express]
permalink: /react/react-redux-node-express-ecosystem/
---

The React/Redux Node/Express Ecosystem is extremely difficult to understand and so everyone has built one. 

<!-- end -->

The [Facebook create react app](/react/basic-react/) is the closest I have seen to being a standard but even this I found lacking. For example, I could not change the port, and the whole ecosystem is so full of magic that I found it to be impossible to do anything or to change anything.

Thus I set out to build an ecosystem from scratch. It turned out the React/Redux Node/Express Ecosystem is extremely difficult to build. The rewards of persisting are an understanding of how the ecosystem works and the ability to make useful changes to that ecosystem.

I quickly found that I needed a build system to build the build system. To do this I reached back to an old technique; Makefiles.

A benefit of this approach is that a breaking change to the current ecosystem can be researched and fixed very quickly using these tools.

## My Ecosystem

* React
* Redux
* Node
* Express
* Visual Studio Code
* ESLint
* Airbnb
* Babel
* Webpack
* Sass
* Mocha (Express)
* Jest (React)

### Visual Studio Code

For details, see [Visual Studio Code](/visual-studio-code/)

### Unix Make Script

`/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/make-webpack`

```
#!/bin/sh
#
# script to execute a Makefile to create a webpack project
#
echo "Script to execute a Makefile to create a webpack project"
echo ""
if [ "$#" -lt 2 ]; then
    echo "Usage: make-webpack target port"
    exit 1
fi
TARGET=$1
PORT=$2
#
SCRIPTS="/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/unix-scripts"
echo "Creating target: $TARGET to use Port: $PORT"
make -f $SCRIPTS/webpack/Makefile port=$PORT $TARGET
```

Notice the port, this is the client port.

### Make Script Usage

Targets:

* react
* express

To create React app

```
cd client
make-webpack react {port}
```

To create Node/Express app

```
cd server
make-webpack express {port]
```

The systems created are starter systems, the philosophy being that is easier to delete code than it is to add it.

### Makefile

```

MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))

include $(MAKEFILE_DIR)/babel.mk $(MAKEFILE_DIR)/react.mk

FOO = $PATH

PORT = $(port)

define ESLINTRC
{
  "extends": "airbnb",
  "env": {
    "browser": true
	},
	"globals": {
	},
	"rules": {
		"indent": [2, "tab"],
		"no-tabs": 0,
		"react/jsx-indent": ["off", 2],
		"react/jsx-indent-props": ["off", 2]
	},
	"plugins": [
		"react",
		"jsx-a11y",
		"import"
  ]
}
endef
export ESLINTRC

#
# Targets:
#
# react
# express
# react-express
#

always: init npm_init README gitignore eslint

react: always webpack babel webpack_dev_server react_config html scss react-jest

express: always express-config

react-express: react express-config

#

init:
	@echo "Initialization"
	@echo "makefile_dir $(MAKEFILE_DIR)"
	@echo "Path: $$PATH"

npm_init:
	npm init -y
	sed -i '' $$'/"test":/d' package.json
	sed -i '' $$'/scripts/a\\\n\\\t"USELESS": "nothing"\\\n' package.json

README:
	touch README.md

gitignore:
	touch .gitignore
	echo "node_modules" > .gitignore
	echo "dist/bundle.js" >> .gitignore
	echo ".env" >> .gitignore

simplest_source:
	@echo "Create source code"
	mkdir -p src
	echo "console.log('Hello World!');" > src/main.js

webpack_dev_server:
	@echo "Handle webpack_dev_server"
	npm install webpack-dev-server --save-dev
	sed -i '' $$'/scripts/a\\\n\\\t"start": "webpack-dev-server --hot --inline",\\\n' package.json

webpack:
	@echo "Handle webpack"
	cat $(MAKEFILE_DIR)/webpack.config.js | sed 's/8080/$(PORT)/'> webpack.config.js

	npm install webpack --save-dev

	echo "(webpack) Update package.json"
	sed -i '' $$'/scripts/a\\\n\\\t"prod": "NODE_ENV=production npm run build",\\\n' package.json
	sed -i '' $$'/scripts/a\\\n\\\t"build": "webpack",\\\n' package.json
	sed -i '' $$'/scripts/a\\\n\\\t"help": "webpack --help",\\\n' package.json

eslint_versions:
	@echo "List eslint version dependencies"
	npm info eslint-config-airbnb@latest peerDependencies

eslint:
	@echo "Handle eslint"
	npm i eslint@4.9.0 eslint-plugin-import@2.7.0 --save-dev
	npm i eslint-plugin-jsx-a11y@6.0.2 eslint-plugin-react@7.4.0 --save-dev

	npm i eslint-loader --save-dev
	npm i eslint-config-airbnb --save-dev

	@echo "$$ESLINTRC" > .eslintrc.json

	echo "(eslint) Update package.json"
	sed -i '' $$'/scripts/a\\\n\\\t"eslint_versions": "npm info eslint-config-airbnb@latest peerDependencies",\\\n' package.json

scss:
	@echo "Handle scss"
	npm i css-loader node-sass sass-loader style-loader extract-text-webpack-plugin --save-dev

html:
	@echo "Handle Html"
	npm i copy-webpack-plugin --save-dev

express-config:
	@echo "Handle Express"
	npm install express --save
	npm install morgan winston --save
	npm install body-parser cookie-parser  --save
	npm install serve-favicon --save
	npm install dotenv --save
	npm install uuid --save
	npm install mongoose --save
	npm install joi --save

	npm install express-handlebars --save
	npm install express-jwt jsonwebtoken --save

	npm install chai --save-dev
	npm install chai-http --save-dev
	npm install mocha --save-dev
	npm install faker --save-dev
	npm install esdoc --save-dev

	echo "(express) Update package.json"
	sed -i '' $$'/scripts/a\\\n\\\t"start": "node server.js",\\\n' package.json
	sed -i '' $$'/scripts/a\\\n\\\t"nodemon": "nodemon server.js",\\\n' package.json
	sed -i '' $$'/scripts/a\\\n\\\t"test": "LOG_LEVEL=info mocha ./test --exit",\\\n' package.json

	echo "(express) Update .esdoc.json"
	@echo '{"source": "./api", "destination": "./esdoc"}' > .esdoc.json

	echo "(express) Update .travis.yml"
	@echo 'language: node_js' > .travis.yml
	@echo 'node_js: node' >> .travis.yml
	@echo 'services:' >> .travis.yml
	@echo '- mongodb' >> .travis.yml

	echo "(express) Update .env"
	@echo 'DATABASE_URL=mongodb://localhost/CHANGE_DB' > .env

	@echo "Create Express"
	mkdir -p api config scripts
	mkdir -p views/layouts views/pages views/partials
	mkdir -p test
	mkdir -p public/assets/css public/assets/images public/assets/js public/assets/scss

	@echo '<html><head></head><body>say something</body></html>' > public/assets/test.html

simple: always webpack babel webpack_dev_server simple_config html scss

simple_config:
	@echo "Create simple source code"
	mkdir -p src
	cp -r $(MAKEFILE_DIR)/simple/src/* src
	mkdir -p dist
	cp -r $(MAKEFILE_DIR)/simple/index.html .
```

### `babel.mk`

```
define BABELRC_4
{
  "presets": [
		"env", "react"
	]
}
endef
export BABELRC_4

babel:
	@echo "Handle babel"
	touch .babelrc

	@echo "$$BABELRC_4" > .babelrc

	npm install babel-core babel-loader --save-dev

	npm install babel-preset-env babel-preset-react --save-dev

```

### `react.mk`

```
MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))

react_config:
	@echo "Create source code"
	mkdir -p src
	cp -r $(MAKEFILE_DIR)/react/src/* src
	mkdir -p test
	cp -r $(MAKEFILE_DIR)/react/test/* test
	mkdir -p dist
	cp -r $(MAKEFILE_DIR)/react/index.html .

	@echo "Handle npm react"
	npm install react react-dom react-router-dom --save
	npm i prop-types --save

	@echo "Handle npm redux"
	npm i react-redux redux redux-thunk --save

	@echo "Handle npm isomorphic-fetch"
	npm i isomorphic-fetch --save

react-mocha:
	echo "(mocha) Update package.json"
	sed -i '' $$'/scripts/a\\\n\\\t"test": "mocha --recursive --compilers js:babel-register test/**/*.js",\\\n' package.json

	@echo "Handle Mocha/Chai Unit tests"
	npm i mocha chai chai-http react-test-renderer --save-dev

react-jest:
	echo "(jest) Update package.json"
	sed -i '' $$'/scripts/a\\\n\\\t"test": "jest",\\\n' package.json
	sed -i '' $$'/scripts/a\\\n\\\t"test-help": "jest --help",\\\n' package.json

	@echo "Handle Jest"
	npm i jest react-test-renderer --save-dev

	@echo "Handle Test files"
	mv test/test-image.js test/image.test.js
```

`webpack.config.js`

```

const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_FOLDER = path.resolve(__dirname, './src');
const DIST_FOLDER = path.resolve(APP_FOLDER, './dist');
const DIST_FOLDER_STYLE = path.resolve(DIST_FOLDER, './css');

const config = {
  entry: ['./src/index.js', './src/scss/index.scss'],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },

	devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    inline: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
			},
			{
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { // regular css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader/url!file-loader',
          use: ['css-loader'],
          publicPath: DIST_FOLDER_STYLE,
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
    ],
	},
	resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: '[name].bundle.css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      { from: 'index.html', to: '.' },
    ],
    { debug: 'info' }),
  ],
};

module.exports = config;
```




