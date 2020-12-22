---
meta-title: "Tests and CI for Blogging App | John Vincent"
meta-description: "John Vincent's Tests and CI for Blogging App"
meta-keywords: "Continuous Integration, Travis, Heroku, Mocha, Chai"

title: "Tests and CI for Blogging App"
subtitle: "Mocha / Chai Unit Testing"
lead: "Add Mocha and Chai unit tests to blogging ExpressJS web services."

category: [Continuous Integration, Travis, Heroku, Mocha, Chai]
permalink: /node/blogging-app-ci/
---

Configure Github, Travis and Heroku so that a change to a Github repository triggers a Travis CI build which executes Mocha/Chai Unit Tests and if successful, deploys to Heroku.

<!-- end -->

## Final Result

[My Git repository](https://github.com/johnvincentio/blogging-challenge)

[Git Readme](https://github.com/johnvincentio/blogging-challenge/blob/master/README.md)

[App at Heroku](https://blooming-river-17701.herokuapp.com/)

[Test GET at Heroku](https://blooming-river-17701.herokuapp.com/blog)

Test GET from curl

```
curl -H "Content-Type:application/json" "https://enigmatic-citadel-18351.herokuapp.com/blog"
```

[Balsamiq Mock Ups](https://github.com/johnvincentio/blogging-challenge/blob/master/mockup.bmpr)

## Tasks

For the [Blogging Application](https://courses.thinkful.com/node-001v5/project/1.5.4), these are the requirements for this challenge:

* add integration tests for all 4 of the API endpoints.
* configure continuous integration so that TravisCI runs your tests each time you push changes to GitHub.
* the app deploys to Heroku any time pushes and merges to master happen and the tests pass.

[Thinkful solution git repository](https://github.com/Thinkful-Ed/blog-app-challenge-starter-files/tree/feature/test-solution)

## Setup

* Local: `/Users/jv/Desktop/MyDevelopment/github/thinkful/blogging-challenge`
* Created new Github repository:  `blogging-challenge`
* Cloned repository

# Development

Copied blogging app from

`/Users/jv/Desktop/MyDevelopment/github/thinkful/nodejs-1/1.4.7-challenge-blog-api`

to

`/Users/jv/Desktop/MyDevelopment/github/thinkful/blogging-challenge`

git push code to master

## Client App

Added client app to test the application.
[Test app here...](http://localhost:8080/)

Added to `server.js`

```
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
```

## Setup

Express is already installed globally. This creates problems with Devtool. Thus, first uninstall and install local:

```
npm uninstall -g express

npm install express --save
```

Install:

```
npm install morgan --save
npm install body-parser --save
npm install uuid --save
```

Install Mocha & Chai:

```
npm install chai --save-dev
npm install chai-http --save-dev
npm install mocha --save-dev
```

Add test to package.json:

```
"test": "mocha ./test"
```

## `server.js`

Remove:

```
app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
```

Add:

```
function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
            .on('error', err => {
                reject(err);
            });
    });
}

let server;

function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        }).on('error', err => {
            reject(err);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                reject(err);
                return; // so we don't also call `resolve()`
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = {
    app, runServer, closeServer
};
```

## `test-blog.js`

Mocha tests go in a test directory.

```
mkdir test
touch test-blog.js
```

Create blog tests file `test-blog.js`

```
/* jshint node: true */
/* jshint esnext: true */

/*global describe, it, before, after */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);
```

## Test

```
npm start
```

Test using the Testing URLs, ensure all is still well.

## Test Using Mocha

```
npm test
```

which shows no tests but all is passing.

## Mocha Testing in the real world

I found:

1. that any mistake in the `test-*.js` files would be flagged by Mocha but wouldn't tell me much of anything.
2. Developing `test-*.js` files is extremely difficult to build in an engineering manner as I do not know the objects I am using.

Thus, using Devtool:

```
devtool ./node_modules/mocha/bin/_mocha ./test
```

However, I have no ability to set debug points before the app runs.

Thus, use debugger;

Start as close to the problem as possible (`test-*.js`) and work into the code to be tested. It takes a little patience, but it is very effective.

### Final `test-blog.js`

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
                const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
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
                    publishDate: res.body[0].publishDate
                };
                return chai.request(app)
                    .get('/blog/'+firstItem.id)
                    .then(function(res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');

                        res.body.id.should.equal(firstItem.id);
                        res.body.title.should.equal(firstItem.title);
                        res.body.content.should.equal(firstItem.content);
                        res.body.author.should.equal(firstItem.author);
                        res.body.publishDate.should.equal(firstItem.publishDate);
                });
            });
    });

    it('should add a blog on POST', function() {
        const newItem = {
            title: 'title-99', content: 'content-99', author: 'author-99'
        };
        return chai.request(app)
            .post('/blog')
            .send(newItem)
            .then(function(res) {
                res.should.have.status(201);
            /* jshint -W030 */
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
                res.body.id.should.not.be.null;
                res.body.title.should.equal(newItem.title);
                res.body.content.should.equal(newItem.content);
                res.body.author.should.equal(newItem.author);
        });
    });

    it('should update a blog on PUT', function() {
        const updateItem = {
            title: 'title-99',
            content: 'content-99',
            author: 'author-99'
        };
        return chai.request(app)
            .get('/blog')
            .then(function(res) {
                res.should.have.status(200);
                updateItem.id = res.body[0].id;
                updateItem.publishDate = res.body[0].publishDate;
                return chai.request(app)
                    .put('/blog/' + updateItem.id)
                    .send(updateItem);
            })
            .then(function(res) {
                res.should.have.status(200);
            /* jshint -W030 */
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('id', 'title', 'content', 'author', 'publishDate');
                res.body.id.should.not.be.null;
                res.body.id.should.equal(updateItem.id);
                res.body.title.should.equal(updateItem.title);
                res.body.content.should.equal(updateItem.content);
                res.body.author.should.equal(updateItem.author);
                res.body.publishDate.should.equal(updateItem.publishDate);

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

## Travis CI

From Github

    * Select blogging-challenge project
    * Settings, Integrations & services (left menu)
    * Add a Service (mid-right)
        * Select Travis CI from dropdown
        * Add service(green button at bottom)
    * From Travis CI, click on <username>(top right)
        * Lists github projects
        * Activate blogging-challenge
    * From github, blogging-challenge
        *  Settings, Integrations & services
            * Travis CI, Edit
                * Notice Travis CI entry in Webhooks

`.travis.yml`

```
language: node_js
node_js: node
```

Git push `.travis.yml` to master

From Travis CI:

* Select User-name, Accounts (top-right)
* Sync Account (top-right)
* Turn on blogging-challenge
* Select blogging-challenge
* Travis builds the project, see Job log
* When complete, Restart build appears (mid-right)


## Set up continuous deployment

Configure Travis to work with Heroku.

* Push changes to master on GitHub, or merge a pull request into master, our tests automatically run.
    * If our tests pass, TravisCI will deploy to Heroku. If our tests do not pass, it will not deploy.


If not already installed, install Travis CI command line interface
```
sudo gem install travis
```

Setup Travis to Deploy to Heroku
Travis login requires my Github login.

```
cd {blogging-challenge directory}
travis login
and provide github username & password

or:
have already setup SSH for github, thus
travis login --auto-password
```

To deploy to Heroku:

    * travis setup heroku
        * "return" to the questions.
    * git diff (see differences)

Create app on Heroku

```
heroku create
```

Notice:

    * App name: blooming-river-17701
    * https://blooming-river-17701.herokuapp.com/
    * https://git.heroku.com/blooming-river-17701.git

Edit `.travis.yml`

```
deploy:
    app: blooming-river-17701
```

Git commit changes to master

## Test Heroku App

To run the app on Heroku:

```
https://blooming-river-17701.herokuapp.com/
```

### Test CI is working

Change any file, git commit to master and verify Travis CI rebuilds the project.

### Other

```
git remote -v
```

shows Github and Heroku repositories.




