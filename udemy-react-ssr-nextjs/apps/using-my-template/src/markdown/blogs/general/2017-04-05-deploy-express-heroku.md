---
meta-title: "Deploy Node Express App to Heroku using Travis Continuous Integration | John Vincent"
meta-description: "John Vincent's Deploy Node Express App to Heroku using Travis Continuous Integration"
meta-keywords: "Node, Express, Travis, Heroku"
title: "Deploy Node Express App to Heroku using Travis Continuous Integration"

subtitle: "Perform Integration Testing and Continuous Deployments to Heroku"
lead: "Configure Github, Travis and Heroku so that a change to a github repository triggers a Travis CI build which executes Mocha/Chai Unit Tests and if successful, deploys to Heroku"

category: [Node, Express, Travis, Heroku, Continuous Integration]
permalink: /general/deploy-react-heroku/
---

Configure Github, Travis and Heroku so that a change to a Github repository triggers a Travis CI build which executes Mocha/Chai Unit Tests and if successful, deploys to Heroku.

<!-- end -->

## Tasks

See [Thinkful course](https://courses.thinkful.com/node-001v5/assignment/1.5.3) for details.

## Final Result

[My Git repository](https://github.com/johnvincentio/node-shopping-list-integration-tests)

[Deployed to Heroku](https://vast-sands-97674.herokuapp.com)

## Development

```
cd MyDevelopment/github/thinkful
git clone https://github.com/Thinkful-Ed/node-shopping-list-integration-tests.git

cd node-shopping-list-integration-tests
```

created new repository on Github:

```
node-shopping-list-integration-tests
```

change to new remote:

```
git remote set-url origin https://github.com/johnvincentio/node-shopping-list-integration-tests
```

Push the master branch up to your new repository on GitHub:

```
git push -u origin master
```

Install dependencies:

```
npm install
```

To run the tests:

```
npm test
```

## Travis CI

For details, see [Continuous Integration with Travis CI](/general/travis-heroku-ci/)


