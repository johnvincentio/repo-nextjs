---
meta-title: "Basic React Redux App | John Vincent"
meta-description: "Basic React Redux App"
meta-keywords: "React, Redux, Node, Express"

title: "Basic React Redux App"
subtitle: "React/Redux Node/Express App"
lead: ""

category: [React, Redux, Node, Express]
permalink: /react/basic-react-redux-app/
---

Build the hot cold application using React/Redux and Node/Express

<!-- end -->

## Final Result

[My Git repository](https://github.com/johnvincentio/hot-cold)

[Git Readme](https://github.com/johnvincentio/hot-cold/blob/master/README.md)

[Heroku git](https://git.heroku.com/johnvincentio-hot-cold.git)

[App at Heroku](https://johnvincentio-hot-cold.herokuapp.com/)

# Development

Local: `/Users/jv/Desktop/MyDevelopment/github/thinkful/hot-cold`

## Client App

cd client

Start the `DevServer`

```
npm start

http://localhost:8025
```

Make a production build

```
npm run build

makes app files in client/dist
```

The port is set in `webpack.config.js`

```
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		// inline: true,
		port: 8025,
		proxy: {
			'/api/**': { target: 'http://localhost:3001', changeOrigin: true, secure: false },
		},
	},
```

Notice the build directory

```
contentBase: path.join(__dirname, 'dist'),
```


Files are created there with with this code in `webpack.config.js`

```
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js',
	},
```

### Proxy

Client app is making asynchronous calls to the node/express application.

For example, `client/src/actions/fetchTopScore.actions.js`

```
export const fetchScore = () => (dispatch) => {
	const url = '/api/score/get';
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
			return response;
		})
		.then(response => response.json())
		.then(data => dispatch(fetchScoreSuccess(data.score)))
		.catch(error => dispatch(fetchScoreError(error)));
};
```

Notice the URL

```
const url = '/api/score/get';
```

which will make a call to the react `devServer` which is running on port 8025, which will proxy the request to the node/express app running on port 3001

`webpack.config.js`

```
port: 8025,
proxy: {
	'/api/**': { target: 'http://localhost:3001', changeOrigin: true, secure: false },
},
```

Thus, all requests to http://host:8025/api/* are proxied to /http://localhost:3001/api/*

## Server App

cd server

```
npm start

listening on port 3001
```

`.env`

```
PORT=3001
LOG_LEVEL=debug
# LOG_ENV=dev
# LOG_ENV=heroku
# LOG_ENV=prod
```

`server/config/config.js`

```
exports.PORT = process.env.PORT || 3001;
```

Intentionally not using 3000 in case anything in the client defaults to 3000.

### Middleware

`server/config/middleware.js`

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

Need to handle a [CORS preflight](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

Notice that method = "OPTIONS" is handled.

```
app.use(express.static(path.resolve(__dirname, '../../client/dist/')));
```

This allows the production built React application to be accessible as /

### Test Using Mocha

```
npm test
```

Note that for Mocha "mocha": "^4.0.1", it is now necessary to add --exit, for example:

```
"test": "LOG_LEVEL=info mocha ./test --exit",
```

## Heroku

To build the app at Heroku it is necessary to provide package.json in the root of the project.

package.json

```
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "cd server && node server.js",
	"test": "cd server && npm install && LOG_LEVEL=info mocha ./test --exit",
	"heroku-postbuild": "cd server && npm install && cd ../client && npm install --only=dev && npm install && npm run prod"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Notice that Heroku requires these scripts to be able to install, test and run the application.

## Travis CI

For details, see [Travis Continuous Integration](/general/travis-heroku-ci/)

## GET URLs

```
curl -H "Content-Type:application/json" "http://localhost:3001/api/score/get" 

curl -H "Content-Type:application/json" "http://localhost:8025/api/score/get" 
```

## POST URLs

```
curl -i -X POST -H "Content-Type:application/json" http://localhost:3001/api/score/send -d '{"score": 51}'
```



