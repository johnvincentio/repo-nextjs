---
meta-title: "Deploy React App to Heroku using Travis Continuous Integration | John Vincent"
meta-description: "John Vincent's Deploy React App to Heroku using Travis Continuous Integration"
meta-keywords: "React, Travis, Heroku"

title: "Deploy React App to Heroku using Travis Continuous Integration"
subtitle: ""
lead: ""

category: [React, Heroku, Travis]
permalink: /react/deploy-react-heroku/
---

Deploy, as an example, the React hot-cold-enzyme application to Heroku using Travis Continuous Integration.

<!-- end -->

Heroku is not a server and so a React app will need a server to serve up the static resources.

Nginx is a good choice which is what I use for production environments. See [TaskMuncher Deployment](https://www.johnvincent.io/taskmuncher/overview/) for a detailed explanation.

When using Heroku, I prefer to deploy a React app with a Node Express server mostly it is very simple to build, deploy and troubleshoot.

## Final Result

[My Git repository](https://github.com/johnvincentio/hot-cold-enzyme)

[Heroku git](https://git.heroku.com/johnvincentio-hot-cold-enzyme.git)

[App at Heroku](https://hot-cold-enzyme.herokuapp.com/)

# Development

Local: `/Users/jv/Desktop/MyDevelopment/github/thinkful/hot-cold-enzyme`

To build the app at Heroku it is necessary to provide `package.json` in the root of the project.

Notice that Heroku requires these scripts to be able to install, test and run the application.

`package.json`

```
"scripts": {
	"start": "cd server && node server.js",
	"test": "cd client && npm install && npm run prod && npm test && cd ../server && npm install && LOG_LEVEL=info mocha ./test --exit",
	"heroku-postbuild": "cd server && npm install && cd ../client && npm install --only=dev && npm install && npm run prod"
},
```

These scripts will instruct Travis/Heroku how to build the app.

## Client App

`client/package.json`

```
"scripts": {
	"test-help": "jest --help",
	"test": "jest",
	"start": "webpack-dev-server --hot --inline",
	"help": "webpack --help",
	"build": "webpack -p",
	"prod": "NODE_ENV=production npm run build",
	"eslint_versions": "npm info eslint-config-airbnb@latest peerDependencies"
},
```

### Start the DevServer

```
cd client
npm start
```

Test App at `http://localhost:8021`

#### Make a production build

```
npm run prod
```

makes react app files in `client/dist`

Run the app from `client/dist`

### Test Using Enzyme and Jest

```
cd client
npm test
```

## Server App

`server/package.json`

```
"scripts": {
"nodemon": "nodemon server.js",
"start": "node server.js",
"test": "LOG_LEVEL=info mocha ./test --exit",
"esdoc": "./node_modules/.bin/esdoc -c ./esdoc.json"
},
```

### Start the server

```
cd server
npm start
```

or, in development

```
npm run nodemon
```

Test the app using Node Express server with static resources being served from `client/dist`

### Review Server

`server/config/routes.js`

Serve `index.html` as `/`

```
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
```
	
`server/config/middleware.express.js`

Handle CORS

```
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	if (req.method === 'OPTIONS') {
		logger.debug('Request method = "OPTIONS"');
		res.end();
	} else {
		next();
	}
});
```

Handle static content

```
app.use(express.static(path.resolve(__dirname, '../../client/dist/')));
```

## Travis CI

For details, see [Continuous Integration with Travis CI](/general/travis-heroku-ci/)

Use

* Github project: hot-cold-enzyme
* Heroku project: hot-cold-enzyme


## Test Heroku App

To run the app on Heroku:

```
https://hot-cold-enzyme.herokuapp.com/
```








