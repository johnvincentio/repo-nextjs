---
meta-title: "Add Integration testing to Blogging App | John Vincent"
meta-description: "Add Integration testing to Blogging App"
meta-keywords: "Mongoose, Integration Testing, Travis, Heroku, Mongo"

title: "Add Integration testing to Blogging App"
subtitle: ""
lead: "Continuous Integration with Travis"

category: [Mongoose, Integration Testing, Travis, Heroku, Mongo]
permalink: /mongo/mongoose-blog-app-tests-ci/
---

Add Continuous Integration to the Blogging App. Deploy to Heroku using Mongo database at mLab.

<!-- end -->

From Thinkful course Node 2.3.4.

[Faker documentation](https://www.npmjs.com/package/Faker)

## Final Result

[My Git repository](https://github.com/johnvincentio/blog-challenge-tests-ci)

[Git Readme](https://github.com/johnvincentio/blog-challenge-tests-ci/blob/master/README.md)

[Deployed to Heroku at](https://johnvincentio-blog-app.herokuapp.com/)

[Test GET at Heroku](https://johnvincentio-blog-app.herokuapp.com/blog)

## Getting Started

Create Github repository: <b>`blog-challenge-tests-ci`</b>

```
cd MyDevelopment/github/thinkful
create-repo blog-challenge-tests-ci
```

Copy source files from:

```
/Users/jv/Desktop/MyDevelopment/github/thinkful/mongoose-challenge-with-tests

to:
/Users/jv/Desktop/MyDevelopment/github/thinkful/blog-challenge-tests-ci
```

Install dependencies:

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful/blog-challenge-tests-ci
rm -rf node_modules
npm install
```

To run the tests:
```
npm test
```

Commit to repository

## Configure Travis CI

`.travis.yml`

```
language: node_js
node_js: node
services:
- mongodb
```

Git commit but do not push

```
git add .
git commit -m "travis"
```

Add Travis CI Service in Github

```
https://github.com/johnvincentio/blog-challenge-tests-ci

Settings, Integration & Services
Add service, Travis CI
Add Service (green button at bottom)
```

Configure Travis

```
Travis Dashboard
https://travis-ci.org/

click icon (top-right)

Sync Account (top-right)

Check:
johnvincentio/blog-challenge-tests-ci
```

Git commit to remote

```
git push
```

Verify Building

```
Travis Dashboard
https://travis-ci.org/

Select:
johnvincentio/blog-challenge-tests-ci
```

## Deploy to Heroku

Login to Travis CI

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful/blog-challenge-tests-ci
travis login --auto-password
```

To deploy to Heroku:

```
travis setup heroku
    "return" to the questions.

git diff (see differences)
    note deploy block added to .travis.yml
```

Create app on Heroku

```
heroku create johnvincentio-blog-app
```

Notice

```
johnvincentio-blog-app
https://johnvincentio-blog-app.herokuapp.com/
https://git.heroku.com/johnvincentio-blog-app.git
```

Push to Heroku:

```
git push heroku master
```

Start up a dyno:

```
heroku ps:scale web=1
```

Edit `.travis.yml`

```
deploy:
    app: johnvincentio-blog-app
```

Git commit changes to master

## Mongo, Mongoose, mLab, and Heroku

At [mLab](https://mlab.com/home), create new database: <b>`blog-challenge-tests-ci`</b>

```
mongo ds021289.mlab.com:21289/blog-challenge-tests-ci -u <dbuser> -p <dbpassword>

mongodb://<dbuser>:<dbpassword>@ds021289.mlab.com:21289/blog-challenge-tests-ci
```

Create user: <b>`jvtest`</b>

### Import data:

```
cd MyDevelopment/github/thinkful/blog-challenge-tests-ci/data

mongoimport --db blog-challenge-tests-ci --collection blogs --drop --file seed-data.json --host ds021289.mlab.com --port 21289  -u jvtest -p <password>
```

Note, local import

```
mongoimport --db blogDB --collection blogs --drop --file seed-data.json
```

### Connect:

```
mongo ds021289.mlab.com:21289/blog-challenge-tests-ci -u jvtest -p <password>
use blog-challenge-tests-ci
db.blogs.find()
```

### Connect using Studio3T

* Start Studio3T
* New Connection

```
Server
Name: ds021289.mlab.com
Type: Direct Connection
Server: ds021289.mlab.com
Port: 21289

Authentication, Basic
User name: jvtest
DB: blog-challenge-tests-ci

Server
Test Connection

OK>

Connect

will find blog-challenge-tests-ci etc
```

Select Connection (left menu), right click, IntelliShell

```
use blog-challenge-tests-ci
db.blogs.findOne()
```

### Configure Heroku

From the [Heroku dashboard](https://dashboard.heroku.com/apps)

```
select: johnvincentio-blog-app

Settings, Reveal Config Vars

Key: DATABASE_URL

Value: mongodb://jvtest:<dbpassword>@ds021289.mlab.com:21289/blog-challenge-tests-ci
```

### Test Heroku App

```
Open App, adding /blog (to test)

https://blog-challenge-tests-ci.herokuapp.com/blog

should retrieve some blogs data
```
