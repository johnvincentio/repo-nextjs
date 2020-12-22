---
meta-title: "Add Mongoose to blogging app | John Vincent"
meta-description: "Add Mongoose to blogging app"
meta-keywords: "Node, Express, Mongoose, Mongo, Mlab, Heroku"

title: "Add Mongoose to blogging app"
subtitle: ""
lead: "Setup a Mongo Database at mLab"

category: [Node, Express, Mongoose, Mongo, Mlab, Heroku]
permalink: /mongo/mongoose-blog-app/
---

Take the blogging app, implement Mongoose layer and deploy to mLab and Heroku.

<!-- end -->

From Thinkful course Node 2.2.3.

## Final Result

[My Git repository](https://github.com/johnvincentio/mongoose-challenge)

[Git Readme](https://github.com/johnvincentio/mongoose-challenge/blob/master/README.md)

[App at Heroku](https://quiet-lake-30066.herokuapp.com/)

[Test GET at Heroku](https://quiet-lake-30066.herokuapp.com/blog)

Test GET from curl

```
curl -H "Content-Type:application/json" "https://quiet-lake-30066.herokuapp.com/blog"
```

## Setup

* Local: `/Users/jv/Desktop/MyDevelopment/github/thinkful/mongoose-challenge`
* Created new Github repository:  `mongoose-challenge`

## Development

Copied blogging app from:

    /Users/jv/Desktop/MyDevelopment/github/thinkful/blogging-challenge

to:

    /Users/jv/Desktop/MyDevelopment/github/thinkful/mongoose-challenge

git push code to master

### Get Data

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful/mongoose-challenge
mkdir data
cd data

wget https://gist.githubusercontent.com/benjaminEwhite/b9ae4f5e4d3ecb9d311f113d68f0457c/raw/55d57b09748cbe6cc9db8554dda3ac968f55a9c7/seed-data.json
```

Each data item needs a created property. Thus, add to each record:

```
,"created":"2017-04-19T20:20:32.995Z"
```

### Start MongoDB

```
cd /Users/jv/Desktop/MyDevelopment/bitbucket/repo_shell_scripts/mac/mongodb
./start-database
```

### Import Data

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful/mongoose-challenge/data

mongoimport --db blogDB --collection blogs --drop --file seed-data.json
```

### Verify Data from MongoClient

```
mongo
show dbs

use blogDB

db.blogs.findOne()

finds one record.
```

### Verify Data from Studio3T

```
Select: localhost:27017
rc, refresh all

blogDB appears

Open intelliShell

use blogDB
db.blogs.findOne()

finds one record.
```

### Install Dependencies

Remove `package.json` and `node_modules`

To rebuild `package.json`

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful/mongoose-challenge

npm init
```

Install the following if needed:

```
npm install express --save
npm install morgan --save
npm install body-parser --save
npm install uuid --save
npm install mongoose --save

npm install chai --save-dev
npm install chai-http --save-dev
npm install mocha --save-dev
```

`package.json`

```
"main": "server.js",
"scripts": {
  "start": "node server.js",
  "test": "mocha ./test"
},
```

### Running the Tests

```
npm start

http://localhost:8080/blog

retrieves records.
```

#### Test Using Mocha

```
npm test
```

#### GET URL

* http://localhost:8080/blog

curl:

* `curl -H "Content-Type:application/json" "http://localhost:8080/posts"`

#### POST URL

curl:

* `curl -i -X POST -H "Content-Type:application/json" http://localhost:8080/posts -d '{"title": "some title", "content": "a bunch of amazing words", "author": {"firstName": "Sarah", "lastName": "Clarke"}}'`

#### DELETE URL

Delete blog using delete method:

* `curl -X DELETE "http://localhost:8080/posts/:id"`

#### PUT URL

Update with Curl PUT:

* `curl -i -X PUT -H "Content-Type: application/json" 'http://localhost:8080/posts/587e68dc901bb4b5fca4e02b' -d '{"id": "587e68dc901bb4b5fca4e02b","title": "total rubbish","content": "a bunch of rubbish","author": {  "firstName": "Jim","lastName": "Garbage"}}'`

## Coding the Challenge

`config.js`

```
/* jshint node: true */
/* jshint esnext: true */

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/blogDB';
exports.PORT = process.env.PORT || 8080;
```

`server.js`

```
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

.........

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function(req, res) {
    res.status(404).json({message: 'Not Found'});
});

.........

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}
```

`models.js`

```

/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        firstName: String,
        lastName: String
    },
    created: {type: Date, default: Date.now}
}, {collection: 'blogs'});

blogSchema.methods.getAll = function() {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.author.firstName + ' ' + this.author.lastName,
        created: this.created
    };
};

blogSchema.methods.getAuthor = function() {
    return {
        id: this._id,
        author: this.author.firstName + ' ' + this.author.lastName
    };
};

blogSchema.virtual('fullName').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`;});

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = {BlogModel};
```

`blogRouter.js`

```
/* jshint node: true */
/* jshint esnext: true */

'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogModel} = require('./models');

router.get('/', (req, res) => {
    BlogModel
        .find()
        .limit(10)
        .exec()
        .then(blogs => {
            res.json(blogs.map(blog => blog.getAll()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
});

router.get('/:id', (req, res) => {
    BlogModel
        .findById(req.params.id)
        .exec()
        .then(blog => res.json(blog.getAll()))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
});

router.get('/author', (req, res) => {
    BlogModel.findOne()
    .exec()
    .then(blog => {
        console.log(blog.fullName);     // virtual property getter
        res.json(blog.getAuthor());
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    BlogModel
        .create({
            title: req.body.title, content: req.body.content, author: req.body.author
        })
        .then(blog => res.status(201).json(blog.getAll()))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
});

router.put('/:id', jsonParser, (req, res) => {
    console.log("Put request; req.params.id "+req.params.id);
        if (! (req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message2 = (
            `Request path id (${req.params.id}) and request body id ${req.body.id}) must match`);
        console.error(message2);
        res.status(400).send(message2);
    }
    const requiredFields = ['id'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    // we only support a subset of fields being updateable.
    // if the user sent over any of the updatableFields, we update those values in document.
    const toUpdate = {};
    const updateableFields = ['title', 'content', 'author'];
    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    // {new: true} will return the updated version of the record.
    console.log(`Updating blog item \`${req.params.id}\``);
    BlogModel.findByIdAndUpdate(req.params.id, {$set: toUpdate}, {new: true})
        .exec()
        .then(item => res.status(201).json(item.getAll()))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
});

router.delete('/:id', (req, res) => {
    BlogModel
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(() => {
            console.log(`Deleting blog item \`${req.params.id}\``);
            res.status(204).end();
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
});

module.exports = router;
```

`test-blog.js`

```
/* jshint node: true */
/* jshint esnext: true */

/* global describe, it, before, after */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

/* jshint -W098 */
const should = chai.should();

chai.use(chaiHttp);

describe('Blogs', function() {

    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it('should list blogs on GET', function() {
        // for Mocha tests, when we're dealing with asynchronous operations,
        // we must either return a Promise object or else call a `done` callback
        // at the end of the test. The `chai.request(server).get...` call is asynchronous
        // and returns a Promise, so we just return it.
        return chai.request(app)
            .get('/blog')
            .then(function(res) {
                res.should.have.status(200);
/* jshint -W030 */
                res.should.be.json;
                res.body.should.be.a('array');
                // because we create 3 items on app load
                res.body.length.should.be.at.least(1);
                const expectedKeys = ['id', 'title', 'content', 'author', 'created'];
                res.body.forEach(function(item) {
                    item.should.be.a('object');
                    item.should.include.keys(expectedKeys);
                });
            });
    });

    it('should get the first blog on a GET by id', function() {
        return chai.request(app)
            .get('/blog')
            .then(function(res) {
                res.should.have.status(200);
                const firstItem = {
                    id: res.body[0].id,
                    title: res.body[0].title,
                    content: res.body[0].content,
                    author: res.body[0].author,
                    created: res.body[0].created
                };
                return chai.request(app)
                    .get('/blog/'+firstItem.id)
                    .then(function(res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.include.keys('id', 'title', 'content', 'author', 'created');

                        res.body.id.should.equal(firstItem.id);
                        res.body.title.should.equal(firstItem.title);
                        res.body.content.should.equal(firstItem.content);
                        res.body.author.should.equal(firstItem.author);
                        res.body.created.should.equal(firstItem.created);
                });
            });
    });

    it('should add a blog on POST', function() {
        const newItem = {
            title: 'title-99', content: 'content-99', author: {firstName: 'Donald', lastName: 'Duck'}
        };
        return chai.request(app)
            .post('/blog')
            .send(newItem)
            .then(function(res) {
                res.should.have.status(201);
            /* jshint -W030 */
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('id', 'title', 'content', 'author', 'created');
                res.body.id.should.not.be.null;
                res.body.title.should.equal(newItem.title);
                res.body.content.should.equal(newItem.content);
                res.body.author.should.equal(newItem.author.firstName + ' ' + newItem.author.lastName);
        });
    });

    it('should update a blog on PUT', function() {
        const updateItem = {
            title: 'title-99',
            content: 'content-99',
            author: {firstName: 'first', lastName: 'last'}
        };
        return chai.request(app)
            .get('/blog')
            .then(function(res) {
                res.should.have.status(200);
                updateItem.id = res.body[0].id;
                updateItem.created = res.body[0].created;
                return chai.request(app)
                    .put('/blog/' + updateItem.id)
                    .send(updateItem);
            })
            .then(function(res) {
                res.should.have.status(201);
            /* jshint -W030 */
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('id', 'title', 'content', 'author', 'created');
                res.body.id.should.not.be.null;
                res.body.id.should.equal(updateItem.id);
                res.body.title.should.equal(updateItem.title);
                res.body.content.should.equal(updateItem.content);
                res.body.author.should.equal(updateItem.author.firstName + ' ' + updateItem.author.lastName);
                res.body.created.should.equal(updateItem.created);
            });
    });

    it('should delete the first blog on DELETE', function() {
        return chai.request(app)
            .get('/blog')
            .then(function(res) {
                res.should.have.status(200);
                return chai.request(app)
                    .delete('/blog/'+res.body[0].id);
            })
            .then(function(res) {
                res.should.have.status(204);
            });
    });
});
```

### Test all still working

```
npm start

http://localhost:8080/blog

retrieves records.
```

```
npm test
```

## Mongo, Mongoose, mLab, and Heroku

At [mLab](https://mlab.com/home), create new database: <b>blogs-app</b>

Ensure use version 3.2

```
mongo ds111441.mlab.com:11441/blogs-app -u <dbuser> -p <dbpassword>

mongodb://<dbuser>:<dbpassword>@ds111441.mlab.com:11441/blogs-app
```

Create user: <b>`jvtest`</b>

### Import data

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful/mongoose-challenge/data
mongoimport --db blogs-app --collection blogs --drop --file seed-data.json --host ds111441.mlab.com --port 11441 -u jvtest -p <password>
```

### Connect

```
mongo ds111441.mlab.com:11441/blogs-app -u jvtest -p <password>
use blogs-app
db.blogs.find()
```


### Connect using Studio3T

* Start Studio3T
* New Connection

```
Server
Name: ds111441.mlab.com
Type: Direct Connection
Server: ds111441.mlab.com
Port: 11441

Authentication, Standard
User name: jvtest
DB: blogs-app

Server
Test Connection

OK>

Connect

will find blogs-app etc
```

Select Connection (left menu), right click, IntelliShell

```
use blogs-app
db.blogs.findOne()
```

## Heroku App

Create Heroku App:

```
cd /Users/jv/Desktop/MyDevelopment/github/thinkful/mongoose-challenge

heroku create

quiet-lake-30066
https://quiet-lake-30066.herokuapp.com/ | https://git.heroku.com/quiet-lake-30066.git
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
select: quiet-lake-30066

Settings, Reveal Config Vars

Key: DATABASE_URL
Value:
mongodb://jvtest:<password>@ds111441.mlab.com:11441/blogs-app
```

Open App, adding /blog (to test)

```
https://quiet-lake-30066.herokuapp.com/blog
```

should retrieve some blogs data
