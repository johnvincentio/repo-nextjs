---
meta-title: "Integrating Mongoose into an Express app | John Vincent"
meta-description: "Integrating Mongoose into an Express app"
meta-keywords: "Mongo, Mlab, Heroku, Studio3T"

title: "Integrating Mongoose into an Express app"
subtitle: ""
lead: "Setup a Mongo Database at mLab"

category: [Mongo, Mlab, Heroku, Studio3T]
permalink: /mongo/integrate-mongoose-into-express-app/
---

Understanding the fundamentals of working with Mongoose in an Express app. 

<!-- end -->

From Thinkful course Node 2.2.1 and 2.2.2.

[Mongo Documentation](https://docs.mongodb.com/getting-started/shell/)

[Mongoose Documentation](http://mongoosejs.com/docs/index.html)

## Clone

Cloned to:

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful
git clone https://github.com/Thinkful-Ed/node-restaurants-app-mongoose

cd node-restaurants-app-mongoose
rm -rf .git
```

Created Github repository:

```
node-restaurants-app-mongoose
```

## Download Data

For details, see [Mongo Shell Basics](/mongo/mongo-shell-basics/)

Save file as:

```
/Users/jv/Desktop/MyDevelopment/github/thinkful
/node-restaurants-app-mongoose/data/primer-dataset.json
```

## Import Data

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful
/node-restaurants-app-mongoose/data

mongoimport --db restaurants-app --collection restaurants --drop --file primer-dataset.json
```

## Install and Test

```
npm install
npm start
```

Test from Postman

```
localhost:8080/restaurants

localhost:8080/restaurants?cuisine=Italian&borough=Manhattan
```

## Node Environment Variables

```
PORT=5000 node server.js
```
or

```
export PORT=5000
node server.js
```

## Mongo, Mongoose, mLab, and Heroku

At [mLab](https://mlab.com/home), create new database: `node-restaurants-app`

```
To connect using the mongo shell:
mongo ds155080.mlab.com:55080/node-restaurants-app -u <dbuser> -p <dbpassword>

mongodb://<dbuser>:<dbpassword>@ds155080.mlab.com:55080/node-restaurants-app
```

Create user: `jvtest`

### Import data

```
cd thinkful/node-restaurants-app-mongoose/data

mongoimport --db node-restaurants-app --collection restaurants --drop --file primer-dataset.json --host ds155080.mlab.com --port 55080  -u jvtest -p <password>
```

### Connect

```
mongo ds155080.mlab.com:55080/node-restaurants-app -u jvtest -p <dbpassword>
use node-restaurants-app
db.restaurants.find()
```

### Connect using Studio3T

* Start Studio3T
* New Connection

```
Server
Name: ds155080.mlab.com
Type: Direct Connection
Server: ds155080.mlab.com
Port: 55080

Authentication: Basic
User name: jvtest
DB: node-restaurants-app

Server
Test Connection

OK>

Connect

will find node-restaurants-app etc
```

Select Connection (left menu), right click, IntelliShell

```
use node-restaurants-app
db.restaurants.findOne()
```

### Heroku App

Create Heroku App:

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful/node-restaurants-app-mongoose

heroku create

thawing-temple-30030
https://thawing-temple-30030.herokuapp.com/ | https://git.heroku.com/thawing-temple-30030.git
```

Push to Heroku:

```
git push heroku master
```

Start up a dyno:

```
heroku ps:scale web=1
```

### Configure Heroku

From the [Heroku dashboard](https://dashboard.heroku.com/apps)

```
select: thawing-temple-30030

Settings, Reveal Config Vars

Key: DATABASE_URL
Value:
mongodb://jvtest:<password>@ds155080.mlab.com:55080/node-restaurants-app
```

Open App, adding /restaurants (to test):

```
https://thawing-temple-30030.herokuapp.com/restaurants
```

should retrieve some restaurants data
