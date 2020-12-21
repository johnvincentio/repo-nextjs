---
meta-title: "Integration testing in a Mongoose world | John Vincent"
meta-description: "Integration testing in a Mongoose world"
meta-keywords: "Mongoose, Integration Testing, Travis, Heroku, Mongo"

title: "Integration testing in a Mongoose world"
subtitle: ""
lead: "Integration Testing with Fake Data"

category: [Mongoose, Integration Testing, Travis, Heroku, Mongo]
permalink: /mongo/mongoose-integration-testing/
---

Take the restaurants app and implement Integration Tests using a faked database. Setup continuous integration with Travis and deploy to Heroku.

<!-- end -->

From Thinkful course Node 2.3.1.

## Final Result

[My Git repository](https://github.com/johnvincentio/node-restaurants-app-mongoose-ci)

[Deployed to Heroku](https://calm-harbor-24855.herokuapp.com/)

[Test GET at Heroku](https://calm-harbor-24855.herokuapp.com/restaurants)

## Getting Started

#### Clone repository

```
cd MyDevelopment/github-clones

git clone https://github.com/Thinkful-Ed/node-restaurants-app-mongoose node-restaurants-app-mongoose-ci

cd node-restaurants-app-mongoose-ci

git checkout -b feature/with-tests origin/feature/with-tests
git fetch
```

Create Github repository <b>`node-restaurants-app-mongoose-ci`</b>

#### Copy source files from:

    MyDevelopment/github-clones/node-restaurants-app-mongoose-ci

to:

    MyDevelopment/github/thinkful/node-restaurants-app-mongoose-ci

#### Commit to repository

```
cd MyDevelopment/github/thinkful
create-repo node-restaurants-app-mongoose-ci
```

#### Install dependencies

```
npm install
```

#### To run the tests

```
npm test
```

## Construct and Test with Fake Data

Use package Faker

```
const faker = require('faker');
```

Add mongo database for testing in `config.js`

```
exports.TEST_DATABASE_URL = (
    process.env.TEST_DATABASE_URL ||
    'mongodb://localhost/test-restaurants-app');
```

Reference the database

```
const {TEST_DATABASE_URL} = require('../config');
```

Create the fake data

```
function seedRestaurantData() {
  console.info('seeding restaurant data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateRestaurantData());
  }
  // this will return a promise
  return Restaurant.insertMany(seedData);
}

// used to generate data to put in db
function generateBoroughName() {
  const boroughs = [
    'Manhattan', 'Queens', 'Brooklyn', 'Bronx', 'Staten Island'];
  return boroughs[Math.floor(Math.random() * boroughs.length)];
}

// used to generate data to put in db
function generateCuisineType() {
  const cuisines = ['Italian', 'Thai', 'Colombian'];
  return cuisines[Math.floor(Math.random() * cuisines.length)];
}

// used to generate data to put in db
function generateGrade() {
  const grades = ['A', 'B', 'C', 'D', 'F'];
  const grade = grades[Math.floor(Math.random() * grades.length)];
  return {
    date: faker.date.past(),
    grade: grade
  }
}

// generate an object represnting a restaurant.
// can be used to generate seed data for db
// or request.body data
function generateRestaurantData() {
  return {
    name: faker.company.companyName(),
    borough: generateBoroughName(),
    cuisine: generateCuisineType(),
    address: {
      building: faker.address.streetAddress(),
      street: faker.address.streetName(),
      zipcode: faker.address.zipCode()
    },
    grades: [generateGrade(), generateGrade(), generateGrade()]
  }
}
```

Tear down the Database after each test

```
function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}
```

For each test:

```
describe('Restaurants API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedRestaurantData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedRestaurantData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  })
```

## Configure Travis CI

edit `.travis.yml`

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
https://github.com/johnvincentio/node-restaurants-app-mongoose-ci
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
johnvincentio/node-restaurants-app-mongoose-ci
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
johnvincentio/node-restaurants-app-mongoose-ci
```

## Deploy to Heroku

Login to Travis CI

```
cd MyDevelopment/github/thinkful/node-restaurants-app-mongoose-ci

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
heroku create
```

Notice:

```
calm-harbor-24855
https://calm-harbor-24855.herokuapp.com/
https://git.heroku.com/calm-harbor-24855.git
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
    app: calm-harbor-24855
```

Git commit changes to master

## Mongo, Mongoose, mLab, and Heroku

At [mLab](https://mlab.com/home), create new database: `node-restaurants-app-mongoose-ci`

```
mongo ds151018.mlab.com:51018/node-restaurants-app-mongoose-ci -u <dbuser> -p <dbpassword>

mongodb://<dbuser>:<dbpassword>@ds151018.mlab.com:51018/node-restaurants-app-mongoose-ci
```

Create user: <b>`jvtest`</b>

### Import data

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful/node-restaurants-app-mongoose-ci/data

mongoimport --db node-restaurants-app-mongoose-ci --collection restaurants --drop --file primer-dataset.json --host ds151018.mlab.com --port 51018  -u jvtest -p <password>
```

### Connect

```
mongo ds151018.mlab.com:51018/node-restaurants-app-mongoose-ci -u jvtest -p <password>
use node-restaurants-app-mongoose-ci
db.restaurants.find()
```

### Connect using Studio3T

* Start Studio3T
* New Connection

```
Server
Name: ds151018.mlab.com
Type: Direct Connection
Server: ds151018.mlab.com
Port: 51018

Authentication, Standard
User name: jvtest
DB: node-restaurants-app-mongoose-ci

Server
Test Connection

OK>

Connect

will find node-restaurants-app-mongoose-ci etc
```

Select Connection (left menu), right click, IntelliShell

```
use node-restaurants-app-mongoose-ci
db.restaurants.findOne()
```

### Configure Heroku

From the [Heroku dashboard](https://dashboard.heroku.com/apps)

```
select: calm-harbor-24855

Settings, Reveal Config Vars

Key: DATABASE_URL

Value:
mongodb://jvtest:<password>@ds151018.mlab.com:51018/node-restaurants-app-mongoose-ci
```

### Test Heroku App

Open App, adding /restaurants (to test)

```
https://calm-harbor-24855.herokuapp.com/restaurants
```

should retrieve some restaurants data

### End


