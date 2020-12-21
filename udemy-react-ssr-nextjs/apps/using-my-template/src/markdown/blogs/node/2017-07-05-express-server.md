---
meta-title: "Basic Express Server | John Vincent"
meta-description: "John Vincent's discussion on Basic Express Server"
meta-keywords: "Express Server"

title: "Basic Express Server"
subtitle: "Creating a Basic Express Server"
lead: ""

category: [Express, Node]
permalink: /node/express-server/
---

For when a basic HTTP or Express server is needed.

<!-- end -->

# Setup

```
cd nodejs/repo-nodejs/basic-express-server
mkdir src
```

```
npm init
npm i express -save
```

Update `package.json`

```
{
  "name": "basic-express-server",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
		"start": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.3"
  }
}
```

If have `nodemon` installed, use

```
"start": "nodemon server.js"
```


Create `server.js`

```
const express = require('express');
const app = express();

const host = '127.0.0.1';
const port = '9000';

app.use ('/', express.static('src'));

app.listen (port, host, function() {
	console.log ('Server running on http://' + host + ':' + port);
});
```

`src/index.tml`

```
<html>
	<head>
		<title>Simple index.html</title>
	</head>
	<body>
		<h1>Simple H1</h1>
		<p>Simple P</p>
	</body>
</html>
```

Run the server

```
npm start
```

and

```
localhost:9000/
```
