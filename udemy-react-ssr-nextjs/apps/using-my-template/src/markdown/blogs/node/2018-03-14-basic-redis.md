---
meta-title: "Basic Redis | John Vincent"
meta-description: "John Vincent's discussion on Basic Redis"
meta-keywords: "Node, Redis"

title: "Basic Redis"
subtitle: ""
lead: ""

category: [Node, Redis]
permalink: /node/basic-redis/
---

This article describes how to install, configure and utilitize Redis on macOS

<!-- end -->

# Redis

[Redis](https://redis.io/)

[Redis Commands](https://redis.io/commands)

My Workspace `/Users/jv/Desktop/MyDevelopment/github/nodejs/repo-nodejs/redis`

## Installation

Install into my tools folder

```
cd /Users/jv/Desktop/OtherTools
```

```
wget http://download.redis.io/releases/redis-5.0.4.tar.gz
tar xzf redis-5.0.4.tar.gz
cd redis-5.0.4
make
```

Server is

```
/Users/jv/Desktop/OtherTools/redis-5.0.4/src/redis-server
```

## Configuration

Add to `.bash_profile`

```
#
#  add Redis
#
export REDIS_HOME=/Users/jv/Desktop/OtherTools/redis-5.0.4/src
# echo "REDIS_HOME Home: $REDIS_HOME"
start-redis() { echo "Start Redis"; cd /Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/redis; ./start-database; }
echo ""
echo "start-redis will start the redis database"
echo ""
```

Create scripts in `/Users/jv/Desktop/MyDevelopment/github/repo_shell_scripts/mac/redis`

`redis.conf` which I copied from `https://raw.githubusercontent.com/antirez/redis/4.0/redis.conf`

Note this writes to `dump.rdb`

`start-database`

```
#!/bin/sh
#
# script to start redis server
#
# Start Redis
#
CURRENT_DIR="`pwd`"
REDIS_DATA=${CURRENT_DIR}/dump.rdb
REDIS_CONFIG_FILE=${CURRENT_DIR}/redis.conf
echo "Redis Data: $REDIS_DATA"
echo "Redis Config File: $REDIS_CONFIG_FILE"
#
echo Starting redis
$REDIS_HOME/redis-server $REDIS_CONFIG_FILE
#
```

`start-console`

```
#!/bin/sh
#
# script to start redis command line
#
# Start Redis CLI
#
echo Starting Redis command line
$REDIS_HOME/redis-cli
#
```

## Start Redis Server

```
start-redis
```

## Redis CLI

Basic Test

```
redis 127.0.0.1:6379> ping
PONG
redis 127.0.0.1:6379> set mykey hello
OK
redis 127.0.0.1:6379> get mykey
"hello"
```

### Show all keys

```
127.0.0.1:6379> keys *

1) "youtube:chelsea"
2) "youtube:chelsea1"
```

### Delete Keys

Delete all keys from all Redis databases

```
redis-cli FLUSHALL
```

Delete all keys of the currently selected Redis database

```
redis-cli FLUSHDB
```

## Node Application

This application is a rather contrived attempt to usefully use redis.

It queries Youtube with a search term and stores the result in redis. Future queries using the same search term will return the result from redis.

### HTTP referrers

Node does not send the referer to Youtube, thus this needs to be sent in the header.

Also, Google YouTube API requires the referer to have been added to the list of HTTP referrers.

[Google API Manager](https://console.developers.google.com/)

* Select the Project
* From Credentials, select the api key
* Add to HTTP referrers `localhost:8080`

### Packages

```
npm install --save express axios redis response-time dotenv
```

Add to `package.json`

```
"scripts": {
	"nodemon": "nodemon server.js",
```

### Server code

`server.js`

```
const express = require('express');

const axios = require('axios');
const redis = require('redis');
const responseTime = require('response-time');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const env = {
	YOUTUBE_APIS_URL: process.env.YOUTUBE_APIS_URL,
	YOUTUBE_PLAY_VIDEO_URL: process.env.YOUTUBE_PLAY_VIDEO_URL,
	YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
	YOUTUBE_REFERER: `${process.env.HOME_URL}:${PORT}`
};

const instance = axios.create({
	baseURL: env.YOUTUBE_APIS_URL,
	params: {
		part: 'snippet',
		maxResults: 5,
		key: env.YOUTUBE_API_KEY
	},
	headers: { Referer: env.YOUTUBE_REFERER }
});

const client = redis.createClient();

client.on('connect', () => {
	console.log('Redis client connected');
});

client.on('error', err => {
	console.log(`Error ${err}`);
});

const app = express();

app.use(responseTime());

app.get('/api/search', (req, res) => {
	const query = req.query.query.toLowerCase().trim();
	if (!query || query.length < 1) {
		return res.status(400).json({ message: 'Incorrect field length: query' });
	}

	const redisKey = `youtube:${query}`;

	return client.get(redisKey, (err, data) => {
		if (data) {
			const resultJSON = JSON.parse(data);
			return res.status(200).json(resultJSON);
		}
		return instance
			.get('/search', {
				params: { q: query }
			})
			.then(response => {
				client.set(redisKey, JSON.stringify({ items: response.data.items }));
				return res.status(200).json({ items: response.data.items });
			})
			.catch(error => {
				console.log('Error ', error);
				return res.status(500).json({ message: 'Internal Server error' });
			});
	});
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
```

### Npm response-time

Create a middleware that adds a X-Response-Time header to responses.

Notice

```
headers: { Referer: env.YOUTUBE_REFERER }
```
