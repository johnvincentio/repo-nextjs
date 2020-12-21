---

meta-title: "Install Node 8.10 on MacOS | John Vincent"
meta-description: "Install Node 8.10 on MacOS"
meta-keywords: "Node, Npm"

title: "Install Node 8.10 on MacOS"
subtitle: ""
lead: ""

category: [Node, Npm]
permalink: /node/install-node/
---

This article describes how to install Node 8.10 on macOS

<!-- end -->

# Node

From [Node](https://www.nodejs.org)

downloaded `node-v8.10.0.pkg` and installed in the usual way.

# Upgrade App

```
rm ./package-lock.json
rm -r ./node_modules
npm cache clear --force
```

and then

```
npm i
npm start
```

which works fine.


## Problems Found

```
npm start
```

yields

```
ERROR in ./src/scss/index.scss
Module build failed: ModuleBuildError: Module build failed: Error: Missing binding /Users/jv/Desktop/MyDevelopment/github/repo-material-ui/node_modules/node-sass/vendor/darwin-x64-57/binding.node
Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 8.x

Found bindings for the following environments:
  - OS X 64-bit with Node.js 6.x

This usually happens because your environment has changed since running `npm install`.
```

Tried

```
rm -rf node_modules
npm i
```

which yielded

```
registry Unexpected warning for https://registry.npmjs.org/: Miscellaneous Warning EINTEGRITY:
```
