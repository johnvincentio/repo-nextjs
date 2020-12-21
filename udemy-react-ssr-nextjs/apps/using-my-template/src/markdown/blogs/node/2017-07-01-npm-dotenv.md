---
meta-title: "Node Environment | John Vincent"
meta-description: "John Vincent's discussion on Node Environment"
meta-keywords: "Node, Env, Express"

title: "Node Environment"
subtitle: "Configuring Node Environment"
lead: "There are many ways of doing this. Let's discuss."

category: [Node, Env, Express]
permalink: /node/node-env/
---

Consider:

* Code is checked into a remote repository. It cannot contain any information that should be private, for example

<!-- end -->

	* keys, hashes, database info, users, passwords, email configuration etc.

* Applications frequently have variables that are unique and configurable for each environment. 


# Node Environment

Node uses `process.env`

For example, environment variable john would be

```
process.env.john
```

## Global

Node supports global variables. Be careful if using multiple instances.

To make a variable global, just precede the variable name with a global. or GLOBAL.

For example

```
global.DATABASE_URL = 'mydb';

global.logger = new logger(customConfig);
```

## Dotenv

[Dotenv](https://www.npmjs.com/package/dotenv) is a Npm package.

```
npm install dotenv --save
```

Place at start of `config.js`

```
require('dotenv').config();
```

This package loads variables from `root/.env` and makes them accessible as

```
process.env.john
```

Thus, create file `root/.env` and save variables

```
env_var=value
```

Do not add `.env` file to a repository, add the following to .gitignore

```
.env
```

## Configuration

Configuration data needs to be set at the start of the app, thus `server.js` for example

```
const {PORT, DATABASE_URL} = require('./config/config');
```

`config.js`, for example

```
require('dotenv').config();

exports.DEVELOPMENT = process.env.DEV;

exports.AUTHENTICATION_KEY = process.env.KEY;

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/mydb';
exports.TEST_DATABASE_URL = (process.env.TEST_DATABASE_URL || 'mongodb://localhost/mydb-test');

exports.PORT = process.env.PORT || 8080;                  
```

### Environment Variables for a Service

Environment variables that pertain to a service, rather than an application, I prefer to store in the Unix environment by setting them in the profile. An example is the email service.

### Unique to Application

These environment variables I prefer to configure in `config.js`

```
exports.COOKIE_NAME = 'app-cookie-name';
```

### Unique to Environment

These environment variables I prefer to configure in `.env` with an override if appropriate.

`.env`

```
DEV=true
```

`config.js`

```
exports.DEVELOPMENT = process.env.DEV;
exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/mydb';
```

### package.json

Environment variables can be configured prior to running an application. For example

```
"scripts": {
"start": "nodemon server.js",
"test": "MY_KEY=value mocha --recursive ./test"
}
```

## Heroku

Heroku loads `.env` files into the environment prior to running the application.

Note that this does not apply to mocha unit tests. You must load environment variables required by mocha tests as shown above.
