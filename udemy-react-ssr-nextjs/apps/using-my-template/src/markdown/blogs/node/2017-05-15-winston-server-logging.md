---
meta-title: "Server Logging with Winston Handlebars | John Vincent"
meta-description: "John Vincent's discussion on Server Logging with Winston"
meta-keywords: "Server Logging with Winston"

title: "Server Logging with Winston"
subtitle: "A Practical Guide to using Winston"
lead: "Winston Logging for an Express App"

category: [Winston, Logging]
permalink: /node/winston-server-logging/
---

Logging has many challenges. It is very important to be able to get the right logging messages for any given situation. 

<!-- end -->

# NPM Winston

[Winston at npm](https://www.npmjs.com/package/winston)

```
npm install winston --save
```

## Goals

The following are the goals

* Ensure all log messages are handled.
* Development environment where all messages are saved to console and log file.
* Heroku environment where info, warn and error messages  are saved to console.
* Production environment (Digital Ocean) where info, warn and error messages are saved to log file.

## Configuration

Thus, the following information needs to be outside of the application

* Log level
* Environment
* Logging file

I have chosen the following

* Log Level = `LOG_LEVEL`
	* Development environment; `debug`
	* Heroku environment; `info`
	* Production environment; `info`

* Environment = `LOG_ENV`
	* Development environment; `dev`
	* Heroku environment; `heroku`
	* Production environment; `production`

* Logging file = `LOG_FILE`
	* Development environment; log file must be outside of workspace else it interferes with Nodemon.
	* Production environment; with other log files.

Note that `LOG_LEVEL` is independent. This is to allow for the setting of higher debug levels in a production environment. This may be required if in pursuit of a production problem.

### Configuration Data

I have chosen to store in `.env` file. For example

```
LOG_LEVEL=debug
LOG_ENV=dev
# LOG_ENV=heroku
# LOG_ENV=prod
LOG_FILE=/Users/{logs}/tmp/logfile.txt
```

### Loading Configuration Data

Start with `server.js`

```
const express = require('express');
const mongoose = require('mongoose');

const {PORT, DATABASE_URL} = require('./config/config');

const {logger} = require('./config/logger');

...

require('./config/middleware.express')(app);
logger.info('Application middleware is configured');

require('./config/routes')(app);
logger.info('Application routes have been loaded');

module.exports = {app, runServer, closeServer};
logger.info('Application is exported');
```

To load configuration data, `config.js`

```
require('dotenv').config();

exports.LOG_ENV = process.env.LOG_ENV || 'prod';

exports.LOG_LEVEL = process.env.LOG_LEVEL || 'info';

exports.LOG_FILE = process.env.LOG_FILE || 'logfile.txt';
```

## Logger

As I needed many different instances of a logger, I rolled my own

```
const winston = require('winston');

const {LOG_LEVEL, LOG_ENV, LOG_FILE} = require('./config');

const consoleOptions = {
    level: LOG_LEVEL,
    handleExceptions: true,
    // json: true,
    colorize: true
};
const fileOptions = {
    level: LOG_LEVEL,
    filename: LOG_FILE,
    handleExceptions: true,
    // json: true,
    colorize: true
};

const logger = (function() {
    if (LOG_ENV === 'production') {
        return new(winston.Logger)({
            transports: [
                new (winston.transports.File)(fileOptions)
            ]
        });
    }
    else if (LOG_ENV === 'heroku') {
        return new(winston.Logger)({
            transports: [
                new(winston.transports.Console)(consoleOptions)
            ]
        });
    }
    return new(winston.Logger)({        // dev
        transports: [
            new(winston.transports.Console)(consoleOptions),
            new (winston.transports.File)(fileOptions)
        ]
    });
}());

logger.stream = {
    write: (message, encoding) => {
        logger.debug(message);
    }
};

module.exports = {
    logger
};
```

Thus, when the server starts, the correct logger is configured.

## Usage

Add to list of requires

```
@requires logger
```

Get a reference

```
const {logger} = require('./config/logger');
```

### Convention

I have chosen the following

* `logger.info`
	* when something happens, examples
		* Server starts or stops
		* Email sent
		* Record added/updated/deleted
		* Event
		* Useful running message

* `logger.debug`
	* traces only
		* careful to ensure no `pid`

* `logger.error`
	* error events of any kind
		* ensure full details

* `logger.warn`
	* not an error but may be important, for example
		* record should have been found but was not.
		* could not find a URL that should have existed.
		* problems reading from a URL, for example, RSS feed.

## Morgan

For an Express app, I also use [Morgan](https://www.npmjs.com/package/morgan) to log HTTP requests.

I wish to stream Morgan logging messages to Winston.

As shown above, `server.js`

```
...

require('./config/middleware.express')(app);
logger.info('Application middleware is configured');

...

```

Morgan is middleware and so is loaded by `middleware.express.js`. Only the essentials are shown

```
const morgan = require('morgan');
const {logger} = require('./logger');
app.use(morgan('common', {stream: logger.stream}));
```

Thus Morgan messages will use `logger.stream`

```
logger.stream = {
    write: (message, encoding) => {
        logger.debug(message);
    }
};
```

which uses Winston logging to stream Morgan logging at level 'debug'.

## Browser Logs

A simple trick to turn off `console.log` messages in the browser

`globals.js`

```
var hasConsole = false;
if (!hasConsole) {
  console.log = function() {};
}
```

`globals.js` is the first thing invoked.
